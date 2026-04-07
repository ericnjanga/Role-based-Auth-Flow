"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "./authstore";
import {
  selectIsAuthenticated,
  selectIsHydrated,
  selectHasValidAccessToken,
  selectCanAttemptRefresh,
} from "./selectors";

type Props = {
  children: React.ReactNode;
};

/**
 * Exchange a refresh token for a new access token (and optionally a new refresh token).
 *
 * Expected response shape:
 * {
 *   accessToken: string;
 *   refreshToken?: string;
 *   expiresAtMs: number;
 *   user: User;
 * }
 */
async function refreshAccessToken(_refreshToken: string) {
  // TODO: Implement backend call: POST /api/refresh { refreshToken }
  throw new Error("Not implemented");
}

/**
 * Route guard for protected pages.
 *
 * Determines whether the user's session is valid using auth store selectors:
 * - If authenticated → render children
 * - If session expired but refreshable → attempt token refresh
 * - Otherwise → redirect to login (with `next=` to return after login)
 */
export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  // Derived state (selectors keep rerenders minimal and logic centralized).
  const isHydrated = useAuthStore(selectIsHydrated);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const hasValidAccess = useAuthStore(selectHasValidAccessToken);
  const canAttemptRefresh = useAuthStore(selectCanAttemptRefresh);

  // Actions / raw state.
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const refreshInFlight = useAuthStore((state) => state.refreshInFlight);

  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);
  const setHydrated = useAuthStore((state) => state.setHydrated);
  const logout = useAuthStore((state) => state.logout);

  // Mark the auth store as hydrated once this guard mounts.
  // (In a real app, this often comes after reading persisted tokens from storage.)
  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  useEffect(() => {
    // Avoid redirects/refresh attempts until hydration completes.
    // Also, if already authenticated, do nothing.
    if (!isHydrated || isAuthenticated) return;

    /**
     * If possible, refresh the user session using the refresh token.
     * If refresh fails or is not possible, redirect to the login page.
     */
    const refreshSessionOrRedirect = async () => {
      const next = encodeURIComponent(pathname || "/");

      const canRefreshNow =
        !hasValidAccess &&
        Boolean(refreshToken) &&
        canAttemptRefresh &&
        !refreshInFlight;

      if (canRefreshNow) {
        try {
          setAuthLoading(true);

          // Note: In a real implementation, you'd likely set refreshInFlight=true in the store
          // before awaiting the request, then flip it back in finally.
          await refreshAccessToken(refreshToken!);

          // Typical shape:
          // login(
          //   refreshed.user,
          //   refreshed.accessToken,
          //   refreshed.refreshToken ?? refreshToken!,
          //   refreshed.expiresAtMs
          // );

          // For now, refresh isn't wired, so treat this as a failure path.
          throw new Error("Refresh not wired");
        } catch {
          // Any refresh/auth failure clears session state and forces re-authentication.
          logout();
          router.replace(`/login?next=${next}`);
        } finally {
          setAuthLoading(false);
        }

        return;
      }

      // No valid session or refresh path available → redirect to login.
      router.replace(`/login?next=${next}`);
    };

    refreshSessionOrRedirect();
  }, [
    isHydrated,
    isAuthenticated,
    hasValidAccess,
    canAttemptRefresh,
    refreshToken,
    refreshInFlight,
    pathname,
    router,
    setAuthLoading,
    logout,
  ]);

  // While the auth store is hydrating, avoid rendering protected UI.
  if (!isHydrated) return <div>Loading ...</div>;

  // Prevent a flash of protected content before redirect occurs.
  if (!isAuthenticated) return null;

  return <>{children}</>;
};
