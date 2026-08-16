import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyButton } from "@/components/website/copy-button";

function mockClipboard() {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
    writable: true,
  });
  return writeText;
}

describe("CopyButton", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("has an accessible name before copying", () => {
    mockClipboard();
    render(<CopyButton value="const a = 1;" />);
    expect(
      screen.getByRole("button", { name: /copy code/i }),
    ).toBeInTheDocument();
  });

  it("writes the value to the clipboard", async () => {
    // setup() installs its own clipboard stub, so ours must come after it.
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const writeText = mockClipboard();

    render(<CopyButton value="npx shadcn@latest add flip-card" />);
    await user.click(screen.getByRole("button"));

    expect(writeText).toHaveBeenCalledWith("npx shadcn@latest add flip-card");
  });

  it("announces the copied state, then resets", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    mockClipboard();

    render(<CopyButton value="x" />);
    await user.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /copied/i }),
      ).toBeInTheDocument(),
    );

    /*
     * The old snippet button used react-use's `useCopyToClipboard`, whose state
     * never reset: once copied it showed a tick forever. This pins the reset.
     */
    await vi.advanceTimersByTimeAsync(2100);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /copy code/i }),
      ).toBeInTheDocument(),
    );
  });

  it("does not throw when clipboard access is denied", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
      writable: true,
    });

    render(<CopyButton value="x" />);
    await expect(user.click(screen.getByRole("button"))).resolves.not.toThrow();
    // Still shows the un-copied label because the write failed.
    expect(
      screen.getByRole("button", { name: /copy code/i }),
    ).toBeInTheDocument();
  });
});
