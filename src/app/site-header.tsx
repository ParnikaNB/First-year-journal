"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/wishes", label: "Wishes" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="topbar" aria-label="Primary">
      <Link className="brand-script" href="/">
        One Whole Year of You
      </Link>
      <nav aria-label="Site navigation">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "nav-active" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
