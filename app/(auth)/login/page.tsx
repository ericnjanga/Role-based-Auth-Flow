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
    <main>
      <h1>Login</h1>
      <button onClick={handleLogin}>Sign in</button>
      <hr />

      <p>
        <Link href="/">Return to home page</Link>
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main><p>Loading login…</p></main>}>
      <LoginPageContent />
    </Suspense>
  );
}
