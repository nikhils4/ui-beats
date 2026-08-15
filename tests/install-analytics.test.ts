import { describe, expect, it } from "vitest";
import {
  classifyClient,
  clientId,
  eventName,
  logLine,
  measurementRequest,
  parseRegistryPath,
} from "@/lib/install-analytics";

describe("registry path parsing", () => {
  it("reads a component name off an install URL", () => {
    expect(parseRegistryPath("/r/flip-card.json")).toEqual({
      kind: "component",
      name: "flip-card",
    });
  });

  it("keeps the two index documents out of the component counts", () => {
    // Counting these as components puts a phantom named "registry" at the top
    // of every ranking, which is exactly the number this is meant to produce.
    expect(parseRegistryPath("/r/registry.json")).toEqual({ kind: "index" });
    expect(parseRegistryPath("/r/components.json")).toEqual({
      kind: "catalogue",
    });
  });

  it("ignores anything that is not a registry item", () => {
    for (const path of [
      "/docs/card/flip-card",
      "/r/flip-card",
      "/r/nested/flip-card.json",
      "/r/../secrets.json",
      "/registry/flip-card.json",
    ]) {
      expect(parseRegistryPath(path), path).toBeNull();
    }
  });
});

describe("client classification", () => {
  it("separates the two adoption routes", () => {
    expect(classifyClient("shadcn/3.4.0 node/22.11.0")).toBe("cli");
    expect(classifyClient("uibeats-mcp/0.1.1")).toBe("agent");
    expect(classifyClient("claude-code/2.0")).toBe("agent");
  });

  it("files crawlers before browsers", () => {
    // Every one of these also sends a Mozilla prefix, so order matters: the
    // browser test would otherwise swallow them and inflate real traffic.
    expect(
      classifyClient(
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      ),
    ).toBe("crawler");
    expect(classifyClient("Mozilla/5.0 (Macintosh) Chrome/141.0")).toBe(
      "browser",
    );
  });

  it("does not guess when there is nothing to go on", () => {
    expect(classifyClient(null)).toBe("unknown");
    expect(classifyClient("")).toBe("unknown");
  });
});

describe("measurement protocol", () => {
  const event = {
    target: { kind: "component" as const, name: "flip-card" },
    client: "cli" as const,
    userAgent: "shadcn/3.4.0",
  };

  it("stays off unless both credentials are present", () => {
    expect(measurementRequest(event, {})).toBeNull();
    expect(measurementRequest(event, { measurementId: "G-1" })).toBeNull();
    expect(measurementRequest(event, { apiSecret: "s" })).toBeNull();
  });

  it("sends the component name and client bucket", () => {
    const request = measurementRequest(event, {
      measurementId: "G-1",
      apiSecret: "secret",
    });
    expect(request).not.toBeNull();
    const body = JSON.parse(request!.body);
    expect(body.events[0].name).toBe("registry_install");
    expect(body.events[0].params.component).toBe("flip-card");
    expect(body.events[0].params.client).toBe("cli");
    expect(body.client_id).toBeTruthy();
  });

  it("drops crawlers rather than paying to store them", () => {
    expect(
      measurementRequest(
        { ...event, client: "crawler" },
        { measurementId: "G-1", apiSecret: "secret" },
      ),
    ).toBeNull();
  });

  it("names the three documents differently", () => {
    expect(eventName({ kind: "component", name: "x" })).toBe(
      "registry_install",
    );
    expect(eventName({ kind: "index" })).toBe("registry_index_read");
    expect(eventName({ kind: "catalogue" })).toBe("registry_catalogue_read");
  });
});

describe("client id", () => {
  it("is stable for the same agent and carries no address", () => {
    expect(clientId("shadcn/3.4.0")).toBe(clientId("shadcn/3.4.0"));
    expect(clientId("shadcn/3.4.0")).not.toBe(clientId("curl/8.7.1"));
    expect(clientId("shadcn/3.4.0")).toMatch(/^[a-z0-9]+\.0$/);
  });
});

describe("log line", () => {
  it("is one parseable object per fetch", () => {
    const parsed = JSON.parse(
      logLine({
        target: { kind: "component", name: "flip-card" },
        client: "agent",
        userAgent: "claude-code/2.0",
      }),
    );
    expect(parsed).toMatchObject({
      msg: "registry_fetch",
      event: "registry_install",
      component: "flip-card",
      client: "agent",
    });
  });

  it("truncates a hostile user agent", () => {
    const parsed = JSON.parse(
      logLine({
        target: { kind: "index" },
        client: "unknown",
        userAgent: "x".repeat(5000),
      }),
    );
    expect(parsed.ua.length).toBe(200);
    expect(parsed.component).toBeNull();
  });
});
