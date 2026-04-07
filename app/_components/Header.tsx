import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Orders", href: "/orders" },
  { label: "Home", href: "/" },
];

export function Header() {
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
          <Link
            href="/login"
            className="text-sm font-semibold text-white/90 transition hover:text-white"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
