import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="topbar" aria-label="Primary">
      <Link className="brand-script" href="/">
        One Whole Year of You
      </Link>
      <nav aria-label="Site navigation">
        <Link href="/">Home</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/wishes">Wishes</Link>
      </nav>
    </header>
  );
}
