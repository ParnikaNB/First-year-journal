import { SiteHeader } from "../site-header";

export default function WishesPage() {
  return (
    <main className="subpage-shell">
      <SiteHeader />
      <section className="subpage-hero">
        <p className="eyebrow">Birthday wishes</p>
        <h1>
          Leave him a note
          <span>full of love</span>
        </h1>
        <p className="intro">
          This page will become a place for family and friends to leave birthday
          wishes, blessings, and sweet words for him to read someday.
        </p>
      </section>
      <section className="wish-form-preview" aria-label="Wish form preview">
        <label htmlFor="wish-name">Your name</label>
        <input id="wish-name" placeholder="Grandma, Auntie, Uncle..." />
        <label htmlFor="wish-message">Your wish</label>
        <textarea
          id="wish-message"
          placeholder="Write a birthday wish for his first year..."
        />
        <button type="button">Save Wish</button>
      </section>
    </main>
  );
}
