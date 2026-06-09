import { SiteHeader } from "../site-header";

const journalCards = [
  {
    label: "Month 1",
    title: "Hello, world",
    text: "The very beginning of a beautiful first-year story.",
  },
  {
    label: "Month 6",
    title: "Halfway to one",
    text: "Giggles, new discoveries, and a personality blooming.",
  },
  {
    label: "Month 12",
    title: "One whole year",
    text: "A birthday chapter full of love, laughter, and firsts.",
  },
];

export default function JournalPage() {
  return (
    <main className="subpage-shell">
      <SiteHeader />
      <section className="subpage-hero">
        <p className="eyebrow">First-year journal</p>
        <h1>
          A little archive of
          <span>every sweet first</span>
        </h1>
        <p className="intro">
          This will become the home for milestones, memories, photos, and tiny
          stories from his first year.
        </p>
      </section>
      <section className="keepsake-grid" aria-label="Journal preview">
        {journalCards.map((card) => (
          <article className="keepsake-card" key={card.label}>
            <p className="eyebrow">{card.label}</p>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
