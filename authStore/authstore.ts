"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Actions, AuthError, State, User } from "./types";
import { getExpiryTimestamp, isValidExpiry } from "./helpers";

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      status: "unknown",
      user: null,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
      isHydrated: false,
      authLoading: false,
      error: null,
      lastAuthEvent: null,
      refreshInFlight: false,

      login: (
        newUser: User,
        token: string,
        refresh: string,
        expiryAtMs: number
      ) =>
        set({
          status: "authenticated",
          user: newUser,
          accessToken: token,
          refreshToken: refresh,
          accessTokenExpiresAt: isValidExpiry(expiryAtMs)
            ? expiryAtMs
            : getExpiryTimestamp(1),
          authLoading: false,
          error: null,
          lastAuthEvent: "login",
          refreshInFlight: false,
        }),

      logout: () =>
        set({
          status: "unauthenticated",
          user: null,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          authLoading: false,
          error: null,
          lastAuthEvent: "logout",
          refreshInFlight: false,
        }),

      setAuthLoading: (val: boolean) => set({ authLoading: val }),
      setHydrated: (val: boolean) => set({ isHydrated: val }),

      beginRefresh: () => set({ refreshInFlight: true }),
      endRefresh: () => set({ refreshInFlight: false }),
      applyRefresh: (
        newAccess: string,
        newRefresh: string | null,
        expiresAt: number
      ) =>
        set((state) => ({
          accessToken: newAccess,
          refreshToken: newRefresh ?? state.refreshToken,
          accessTokenExpiresAt: expiresAt,
          status: "authenticated",
          authLoading: false,
          error: null,
          lastAuthEvent: "refresh",
          refreshInFlight: false,
        })),
      setError: (err: AuthError | null) => set({ error: err }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        status: state.status,
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        accessTokenExpiresAt: state.accessTokenExpiresAt,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
