import { create } from 'zustand';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
}

export interface AuthActions {
  setToken: (token: string) => void;
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  token: null,
  isAuthenticated: false,
  user: null,
  setToken: (token: string) => set({ token }),
  setUser: (user: AuthState['user']) => set({ user }),
  logout: () => set({ token: null, isAuthenticated: false, user: null }),
  setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
}));
