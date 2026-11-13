// Google Analytics (gtag.js) browser tracking.
//
// The Measurement ID arrives from the Google Analytics connector as a
// client-side env var. It is absent in a bare checkout, so every entry point
// here no-ops instead of throwing — the site must keep working without GA.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as
  | string
  | undefined;

let started = false;

export function initGoogleAnalytics() {
  if (typeof window === "undefined" || started || !measurementId) return;
  started = true;

  window.dataLayer = window.dataLayer || [];
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params -- gtag.js needs the Arguments object
    window.dataLayer!.push(arguments);
  }
  window.gtag = gtag;

  gtag("set", "developer_id.dZjgwMW", true);
  gtag("js", new Date());
  // gtag's own initial page view is the visitor's first page_view; later
  // client-side route changes are sent by trackPageView().
  gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "page_view", { page_path: path });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
