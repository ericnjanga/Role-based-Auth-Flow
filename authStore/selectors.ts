import type { State } from "./types";

/**
 * True when the store has finished hydrating (being fully restaured) from persistent storage.
 */
export const selectIsHydrated = (state: State) => state.isHydrated;

/**
 * Returns true if an access token exists and has not expired.
 */
export const selectHasValidAccessToken = (state: State) => {
  const exp = state.accessTokenExpiresAt;
  const hasToken = !!state.accessToken;
  const validExp = typeof exp === "number" && exp > Date.now();
  return hasToken && validExp;
};

/**
 * Determines whether the user is authenticated (based on status and token validity).
 */
export const selectIsAuthenticated = (state: State) => {
  // The `status` can lie during boot/hydration, so token validity is more trustworthy.
  return state.status === "authenticated" && selectHasValidAccessToken(state);
};

/**
 * Returns true if a session refresh can be attempted.
 */
export const selectCanAttemptRefresh = (state: State) => {
  // A refresh is allowed only if a refresh token exists and no refresh is currently in flight (in process).
  return !!state.refreshToken && !state.refreshInFlight;
};
