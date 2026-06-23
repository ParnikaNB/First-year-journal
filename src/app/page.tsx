import { BirthdayHero, BirthdayTestControls } from "./countdown";
import { HomePreviews } from "./home-previews";
import { SiteHeader } from "./site-header";

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <BirthdayHero />
      <HomePreviews />
      <BirthdayTestControls />
    </main>
  );
}
