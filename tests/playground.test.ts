import { describe, expect, it } from "vitest";
import {
  deriveControls,
  generateSnippet,
  initialValues,
  isDirty,
} from "@/lib/playground";
import type { ComponentProp } from "@/types/component-config.type";
import type { PlaygroundConfig } from "@/types/playground.type";

const config: PlaygroundConfig = { tag: "Demo" };

function prop(
  name: string,
  type: string,
  defaultValue = "-",
  description = "A prop.",
): ComponentProp {
  return { prop: name, type, defaultValue, description };
}

describe("deriveControls", () => {
  it("turns a string-literal union into a select", () => {
    const [control] = deriveControls(
      [prop("triggerMode", "'hover' | 'click'", "'hover'")],
      config,
    );
    expect(control).toMatchObject({
      kind: "select",
      options: ["hover", "click"],
      value: "hover",
    });
  });

  it("does not treat an open union as a select", () => {
    // `string | undefined` is not a closed set of choices, so a dropdown of
    // ["string", "undefined"] would be nonsense.
    expect(deriveControls([prop("label", "string | undefined")], config)).toEqual(
      [],
    );
  });

  it("maps booleans, numbers and strings to their controls", () => {
    const controls = deriveControls(
      [
        prop("once", "boolean", "true"),
        prop("delay", "number", "0.2"),
        prop("locale", "string", "'en-US'"),
      ],
      config,
    );
    expect(controls.map((control) => control.kind)).toEqual([
      "boolean",
      "number",
      "text",
    ]);
    expect(controls[1]).toMatchObject({ value: 0.2 });
    expect(controls[2]).toMatchObject({ value: "en-US" });
  });

  it("skips props no control can express", () => {
    const controls = deriveControls(
      [
        prop("containerRef", "RefObject<HTMLElement>"),
        prop("onDone", "() => void"),
        prop("frontContent", "{ title: string }"),
        prop("icon", "ReactNode"),
        prop("items", "string[]"),
        prop("children", "ReactNode"),
        prop("className", "string"),
      ],
      config,
    );
    expect(controls).toEqual([]);
  });

  describe("props with no documented default", () => {
    // A required prop has no default by definition, so a control derived from
    // the props table alone opened at 0 or "". That is what made Number Ticker
    // count to zero and the text components render nothing.
    const required = (name: string, type: string) =>
      prop(name, type, "-", "The thing. (required)");

    it("marks a required prop as required", () => {
      const [control] = deriveControls([required("value", "number")], config);
      expect(control).toMatchObject({ required: true });
    });

    it("does not mark an optional prop as required", () => {
      const [control] = deriveControls([prop("delay", "number", "0.2")], config);
      expect(control).toMatchObject({ required: false });
    });

    it("opens on the configured default", () => {
      const withDefaults = { ...config, defaults: { value: 12480 } };
      const [control] = deriveControls(
        [required("value", "number")],
        withDefaults,
      );
      expect(control).toMatchObject({ value: 12480 });
    });

    it("seeds strings and selects too", () => {
      const controls = deriveControls(
        [required("text", "string"), required("size", "'sm' | 'lg'")],
        { ...config, defaults: { text: "DECODING", size: "lg" } },
      );
      expect(controls[0]).toMatchObject({ kind: "text", value: "DECODING" });
      expect(controls[1]).toMatchObject({ kind: "select", value: "lg" });
    });

    it("falls back to zero or empty when nothing is configured", () => {
      const controls = deriveControls(
        [required("value", "number"), required("text", "string")],
        config,
      );
      expect(controls[0]).toMatchObject({ value: 0 });
      expect(controls[1]).toMatchObject({ value: "" });
    });

    it("always emits a required prop, even untouched", () => {
      const withDefaults = { ...config, defaults: { value: 12480 } };
      const controls = deriveControls(
        [required("value", "number"), prop("delay", "number", "0.2")],
        withDefaults,
      );
      // Untouched, so `delay` is correctly absent — but a snippet missing a
      // required prop would not compile.
      const snippet = generateSnippet(
        withDefaults,
        controls,
        initialValues(controls),
      );
      expect(snippet).toContain("value={12480}");
      expect(snippet).not.toContain("delay");
    });
  });

  it("honours an explicit exclude list", () => {
    const controls = deriveControls(
      [prop("value", "number", "100"), prop("from", "number", "0")],
      { ...config, exclude: ["from"] },
    );
    expect(controls.map((control) => control.prop)).toEqual(["value"]);
  });

  describe("number ranges", () => {
    it("scales a duration to seconds rather than 0-100", () => {
      const [control] = deriveControls([prop("duration", "number", "0.5")], config);
      expect(control).toMatchObject({ min: 0, max: 4, step: 0.05, unit: "s" });
    });

    it("bounds an opacity to 0-1", () => {
      const [control] = deriveControls([prop("opacity", "number", "0.6")], config);
      expect(control).toMatchObject({ min: 0, max: 1, step: 0.01 });
    });

    it("lets a rotation go negative", () => {
      const [control] = deriveControls([prop("rotate", "number", "12")], config);
      expect(control).toMatchObject({ min: -180, max: 180 });
    });

    it("always contains the documented default", () => {
      // A default outside the inferred window would sit pinned at one end of
      // the slider with no way back to it.
      const [control] = deriveControls([prop("duration", "number", "9")], config);
      expect(control).toMatchObject({ min: 0, max: 9, value: 9 });
    });

    it("takes an explicit override", () => {
      const [control] = deriveControls([prop("speed", "number", "40")], {
        ...config,
        ranges: { speed: { min: 10, max: 400, step: 10 } },
      });
      expect(control).toMatchObject({ min: 10, max: 400, step: 10 });
    });
  });

  describe("colour props", () => {
    it("gives a hex default a colour picker", () => {
      const [control] = deriveControls(
        [prop("pathColor", "string", "'#ffaa40'")],
        config,
      );
      expect(control).toMatchObject({ kind: "color", value: "#ffaa40" });
    });

    it("leaves a named colour as text", () => {
      // `<input type="color">` cannot represent "gray" and would snap it to
      // black the moment the panel rendered.
      const [control] = deriveControls(
        [prop("pathColor", "string", "'gray'")],
        config,
      );
      expect(control).toMatchObject({ kind: "text", value: "gray" });
    });
  });
});

describe("generateSnippet", () => {
  const controls = deriveControls(
    [
      prop("flipDirection", "'horizontal' | 'vertical'", "'horizontal'"),
      prop("duration", "number", "0.5"),
      prop("once", "boolean", "true"),
      prop("label", "string", "'Hi'"),
    ],
    config,
  );
  const defaults = initialValues(controls);

  it("emits a self-closing tag when nothing has changed", () => {
    expect(generateSnippet(config, controls, defaults)).toBe("<Demo />");
  });

  it("emits only the props that differ from their default", () => {
    const snippet = generateSnippet(config, controls, {
      ...defaults,
      duration: 1.2,
    });
    expect(snippet).toBe("<Demo\n  duration={1.2}\n/>");
  });

  it("writes a true boolean as a bare attribute", () => {
    const snippet = generateSnippet(config, controls, {
      ...defaults,
      once: false,
    });
    expect(snippet).toBe("<Demo\n  once={false}\n/>");

    const inverted = deriveControls([prop("pauseOnHover", "boolean", "false")], config);
    expect(
      generateSnippet(config, inverted, { pauseOnHover: true }),
    ).toBe("<Demo\n  pauseOnHover\n/>");
  });

  it("keeps the fixed props the harness supplies", () => {
    const withFixed: PlaygroundConfig = {
      tag: "FlipCard",
      fixedSource: `  frontContent={{ title: "Discover" }}`,
    };
    expect(generateSnippet(withFixed, controls, defaults)).toBe(
      `<FlipCard\n  frontContent={{ title: "Discover" }}\n/>`,
    );
  });

  it("escapes a quote so the attribute cannot break out", () => {
    const snippet = generateSnippet(config, controls, {
      ...defaults,
      label: 'a "quoted" value',
    });
    expect(snippet).toContain(`label="a &quot;quoted&quot; value"`);
  });
});

describe("isDirty", () => {
  const controls = deriveControls([prop("duration", "number", "0.5")], config);

  it("is false at the documented defaults", () => {
    expect(isDirty(controls, initialValues(controls))).toBe(false);
  });

  it("is true once a control moves", () => {
    expect(isDirty(controls, { duration: 1 })).toBe(true);
  });
});
