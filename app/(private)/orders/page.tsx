import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="mx-auto flex max-w-5xl items-center justify-between gap-6">
      <h1 className="text-3xl font-semibold">Orders</h1>
      <p className="text-zinc-600 dark:text-zinc-300">
        This page also uses the shared root layout styling automatically.
      </p>

      <p>
        <Link className="underline underline-offset-4" href="/">
          Home
        </Link>
      </p>
    </main>
  );
}
