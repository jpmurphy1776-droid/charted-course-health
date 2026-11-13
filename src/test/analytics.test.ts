import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const MEASUREMENT_ID = "G-TEST123456";

function pushedEntries() {
  return (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>));
}

describe("Google Analytics tracking", () => {
  beforeEach(() => {
    delete window.dataLayer;
    delete window.gtag;
    document.head.querySelector("script[src*='googletagmanager']")?.remove();
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("loads gtag with the configured measurement id", async () => {
    vi.stubEnv("VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY", MEASUREMENT_ID);
    const { initGoogleAnalytics } = await import("@/lib/analytics");

    initGoogleAnalytics();

    const config = pushedEntries().find((entry) => entry[0] === "config");
    expect(config).toEqual(["config", MEASUREMENT_ID]);
    const script = document.head.querySelector<HTMLScriptElement>(
      "script[src*='googletagmanager.com/gtag/js']",
    );
    expect(script?.src).toContain(`id=${MEASUREMENT_ID}`);
  });

  it("sends custom events through gtag", async () => {
    vi.stubEnv("VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY", MEASUREMENT_ID);
    const { initGoogleAnalytics, trackEvent } = await import("@/lib/analytics");

    initGoogleAnalytics();
    trackEvent("consultation_started", { source: "hero" });

    const event = pushedEntries().find((entry) => entry[0] === "event" && entry[1] === "consultation_started");
    expect(event).toEqual(["event", "consultation_started", { source: "hero" }]);
  });

  it("stays silent when no measurement id is configured", async () => {
    const { initGoogleAnalytics, trackEvent } = await import("@/lib/analytics");

    initGoogleAnalytics();
    expect(() => trackEvent("consultation_started", { source: "hero" })).not.toThrow();

    expect(window.dataLayer).toBeUndefined();
    expect(
      document.head.querySelector("script[src*='googletagmanager']"),
    ).toBeNull();
  });
});
