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
      Date.now() + 60 * 60 * 1000
    );

    router.replace(next);
  };

  return (
    <main className="flex flex-1 flex-col justify-center gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Login</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Sign in to access protected routes in the demo app.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          onClick={handleLogin}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Sign in
        </button>
        <Link className="text-sm underline underline-offset-4" href="/">
          Return to home page
        </Link>
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
