"use client";

import Link from "next/link";
import { useAuthStore } from "@/authStore/authstore";
import { selectIsAuthenticated } from "@/authStore/selectors";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Orders", href: "/orders" },
  { label: "Home", href: "/" },
];

export function Header() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="global-header z-50 border-b border-zinc-200 bg-zinc-900/95 px-6 py-4 text-white backdrop-blur dark:border-zinc-800">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-5xl items-center justify-between gap-6"
      >
        <div className="flex flex-1">
          <Link href="/" className="-m-1.5 p-1.5 font-semibold tracking-tight">
            <span className="sr-only">Role Based Auth Flow</span>
            <span className="text-lg">Role Based Auth Flow</span>
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/90 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-1 justify-end">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-white/90 transition hover:text-white"
            >
              <span className="flex flex-1 items-center gap-2">
                Log out
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-white/90 transition hover:text-white"
            >
              <span className="flex flex-1 items-center gap-2">
                Log in
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                  />
                </svg>
              </span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
