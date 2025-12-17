/**
 * Analytics utility for tracking Twick package usage.
 * Provides a safe wrapper around PostHog that respects opt-out preferences.
 * 
 * @example
 * ```typescript
 * // Disable analytics via environment variable
 * // VITE_TWICK_ANALYTICS_ENABLED=false
 * 
 * // Or via config
 * <TimelineProvider analytics={{ enabled: false }} />
 * ```
 */

import { PostHog } from "posthog-js";
import { getPackageVersion, getPackageName } from "./version";

/**
 * Configuration for analytics tracking
 */
export interface AnalyticsConfig {
  /** Whether analytics is enabled */
  enabled?: boolean;
  /** PostHog API key (optional, can use environment variable) */
  apiKey?: string;
  /** PostHog API host */
  apiHost?: string;
  /** Disable session recording */
  disableSessionRecording?: boolean;
}

/**
 * Check if analytics should be enabled
 */
export function isAnalyticsEnabled(config?: AnalyticsConfig): boolean {
  // Check environment variable first
  if (typeof window !== "undefined") {
    const envDisabled = 
      (window as any).__TWICK_ANALYTICS_DISABLED__ === true ||
      (import.meta as any).env?.VITE_TWICK_ANALYTICS_ENABLED === "false" ||
      (typeof process !== "undefined" && (process as any).env?.TWICK_ANALYTICS_ENABLED === "false");
    
    if (envDisabled) return false;
  }

  // Check config prop
  if (config?.enabled === false) return false;
  
  // return true by default
  return true;
}

/**
 * Get PostHog API key from config or environment
 */
export function getPostHogApiKey(config?: AnalyticsConfig): string | undefined {
  // Priority: config prop > environment variable > default
  return (
    config?.apiKey ||
    (typeof window !== "undefined" && (import.meta as any).env?.VITE_POSTHOG_API_KEY) ||
    (typeof process !== "undefined" && (process as any).env?.POSTHOG_API_KEY) ||
    "phc_v92Ybiir6eGbEOXmI60g7n0MhUZ1zSknfaf9a3wpAU0" // Default key
  );
}

/**
 * Get PostHog API host
 */
export function getPostHogApiHost(config?: AnalyticsConfig): string {
  return config?.apiHost || "https://us.i.posthog.com";
}

/**
 * Safely capture an event if analytics is enabled
 */
export function trackEvent(
  posthog: PostHog,
  eventName: string,
  properties?: Record<string, any>,
  config?: AnalyticsConfig
): void {
  if (!isAnalyticsEnabled(config)) {
    return;
  }

  try {
    // Get package version and name dynamically from package.json
    const packageVersion = getPackageVersion();
    const packageName = getPackageName();

    posthog.capture(eventName, {
      ...properties,
      packageName,
      packageVersion,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Silently fail to avoid breaking user's application
    if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
      console.warn("[Twick Analytics] Failed to track event:", error);
    }
  }
}

/**
 * Get PostHog options based on config
 */
export function getPostHogOptions(config?: AnalyticsConfig, onLoaded?: (posthog: PostHog) => void) {
  return {
    api_host: getPostHogApiHost(config),
    disable_session_recording: config?.disableSessionRecording ?? true,
    loaded: onLoaded,
  };
}
