export const GA_ID = "G-XXXXXXXXXX";

/**
 * Loads the GA4 script and initializes the dataLayer.
 * This should be called once at application startup.
 */
export function loadAnalytics() {
  if (typeof window === 'undefined') return;
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID, {
    send_page_view: false // We handle page views manually for the SPA
  });
  
  console.debug(`[Analytics] Engine initialized with ID: ${GA_ID}`);
}

/**
 * Tracks a custom event (e.g., tool execution).
 */
export function trackEvent(action: string, label?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_label: label,
    });
    console.debug(`[Analytics] Event: ${action} ${label ? `(${label})` : ''}`);
  }
}

/**
 * Tracks a page view for the hash-based SPA.
 */
export function trackPageView(path: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href
    });
    console.debug(`[Analytics] PageView: ${path}`);
  }
}
