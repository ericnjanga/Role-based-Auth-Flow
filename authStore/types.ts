export type User = {
  id: string;
  name: string;
  role: "clerk" | "supervisor" | "admin";
};
export type AuthError = {
  code: string;
  message: string;
};
export type Status = "unknown" | "authenticated" | "unauthenticated";
export type State = {
  // Core session state ...
  status: Status;
  user: User | null;

  /**
   * [accessToken] -> "what proves you’re logged in right now (used on API requests)."
   * MORE DETAILS:
   * -------------
   * Short-lived JWT used to authorize API requests.
   * The access token authorizes API calls and is intentionally short-lived
   * to reduce security risk. The UI and API layer both depend on it to
   * determine session validity. */
  accessToken: string | null;

  /**
   * [refreshToken] -> "Lets you get a new access token without forcing the user to login again (when access token is expired)."
   * MORE DETAILS:
   * -------------
   * A long-lived token used to obtain a new access token when it expires.
   * Because agents may assist citizens for extended periods, we implemented
   * refresh tokens to maintain session continuity without interrupting workflows.
   */
  refreshToken: string | null;

  /**
   * [accessTokenExpiresAt] -> "tells you when that access token stops being valid."
   * MORE DETAILS:
   * -------------
   * A timestamp (epoch ms) indicating when the access token becomes invalid.
   * Instead of waiting for the backend to reject a request, we track expiration
   * locally to refresh tokens preemptively and improve UX stability.
   */
  accessTokenExpiresAt: number | null;

  // UX + reliability state ...
  /**
   * [isHydrated] -> Indicates whether auth state has been restored from storage after app load.
   * ---- It means: “Have we finished restoring auth state from persistent storage at app startup?” ----
   * We gate protected route rendering until hydration completes to prevent
   * unauthorized UI flash and incorrect redirects during rehydration.
   * - Without this:
   * -- App loads -> Store initializes empty -> Protected route renders -> Redirects to login -> Then storage loads -> Flicker / incorrect redirect
   * (This property prevents that)
   */
  isHydrated: boolean; // true after session is restored from storage (or I've decided there is none)

  /**
   * [authLoading] -> Indicates an active auth-related operation (login, refresh, validate).
   * We isolate authentication loading state to avoid coupling it with
   * global UI loading, allowing precise control over UX feedback.
   * - Why it exists:
   * -- Disable login button during submission. Show spinner. Prevent duplicate login requests.
   */
  authLoading: boolean; // for active login/refresh flows

  /**
   * [error] -> Structured auth error object.
   * Authentication errors are modeled explicitly to support accessible
   * error messaging and session-expiry communication.
   */
  error: AuthError | null;

  /**
   * [lastAuthEvent] -> Tracks the most recent auth lifecycle event.
   * We track lifecycle events to decouple state changes from UI
   * messaging logic and improve observability.
   * (Great for: Debugging, analytics, accessibility)
   */
  lastAuthEvent: "login" | "logout" | "refresh" | "rehydrate" | null; // useful for UI messaging/telemetry/debugging (“session refreshed”, “logged out due to expiry”), and for announcing accessible messages.

  /**
   * To prevent concurrent refresh requests and race conditions, we implemented
   * a refresh lock mechanism ensuring only one refresh call executes at a time.
   */
  refreshInFlight: boolean; // prevents refresh storms (multiple refresh calls at once) when several requests fail simultaneously.
};

export type Actions = {
  login: (
    newUser: User,
    token: string,
    refresh: string,
    tokenExpiry: number
  ) => void;
  logout: () => void;
  setAuthLoading: (val: boolean) => void;
  setHydrated: (val: boolean) => void;

  // Refresh token flow
  beginRefresh: () => void;
  endRefresh: () => void;
  applyRefresh: (
    accessToken: string,
    refreshToken: string | null,
    expiresAt: number
  ) => void;
  setError: (err: AuthError | null) => void;
};
