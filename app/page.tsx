import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 py-8 sm:items-start">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />

      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xl text-3xl font-semibold leading-10 tracking-tight sm:text-4xl">
          All pages now share the same layout styling from `app/layout.tsx`.
        </h1>
        <p className="max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300">
          The root layout now provides the common spacing, width, border, background,
          and typography shell for every route in the app.
        </p>
      </div>

      <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        <a
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:opacity-90 md:w-[170px]"
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={16}
            height={16}
          />
          Deploy Now
        </a>
        <a
          className="flex h-12 w-full items-center justify-center rounded-full border border-zinc-300 px-5 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 md:w-[170px]"
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </div>
    </main>
  );
}
