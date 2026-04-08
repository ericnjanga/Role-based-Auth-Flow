"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/authStore/authstore";

function LoginPageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    login(
      { id: "1", name: "Eric", role: "admin" },
      "ACCESS_TOKEN",
      "REFRESH_TOKEN",
      Date.now() + 60 * 60 * 1000,
    );

    router.replace(next);
  };

  return (
    <main className="flex flex-1 flex-col justify-center gap-4">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="hidden sm:mt-8 sm:flex sm:justify-center">
            <div className="relative rounded-full py-1 text-sm/6 text-gray-100 p-3 border-2 border-gray-300">
              Just click on the button to log in as an admin user.
            </div>
          </div>

          <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  disabled={true}
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="#"
                    aria-disabled="true"
                    tabIndex={-1}
                    className="pointer-events-none opacity-50 font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  disabled={true}
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6">
            <Link className="text-sm underline underline-offset-4" href="/">
              Return to home page
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center">
          <p>Loading login…</p>
        </main>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
