"use client";

import Link from "next/link";

import { useBirthdayState } from "./countdown";

const journalPreview = [
  {
    label: "Month 1",
    title: "Hello, World",
    text: "The beginning of Aaditya's beautiful first-year story.",
  },
  {
    label: "Month 6",
    title: "Halfway to One",
    text: "So many giggles, tiny discoveries, and favorite little routines.",
  },
  {
    label: "Month 12",
    title: "One Whole Year",
    text: "A birthday chapter filled with love, laughter, and endless firsts.",
  },
];

const wishPreview = [
  {
    author: "Grandma",
    text: "Happy 1st Birthday, little one. May your days be full of wonder.",
  },
  {
    author: "Auntie Sarah",
    text: "You are our greatest adventure and our happiest blessing.",
  },
  {
    author: "Uncle Mike",
    text: "Watching you grow is a gift we will cherish forever.",
  },
];

export function HomePreviews() {
  const birthdayState = useBirthdayState();
  const phase = birthdayState?.phase ?? "before";
  const shouldRevealWishes = phase !== "before";
  const shouldShowWishForm = phase !== "after";

  return (
    <>
      <section className="preview-band" id="journal-preview">
        <div className="preview-copy">
          <p className="eyebrow">First-year journal</p>
          <h2>
            A year of
            <span> sweet firsts</span>
          </h2>
          <p>
            A small peek at the memories, milestones, and everyday magic that
            will live in Aaditya&apos;s journal.
          </p>
          <Link className="primary-action preview-action" href="/journal">
            View Journal
          </Link>
        </div>
        <div className="preview-card-row" aria-label="Journal preview">
          {journalPreview.map((item) => (
            <article className="preview-card" key={item.label}>
              <p className="preview-label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      {shouldRevealWishes && (
        <section className="preview-band preview-band-wishes" id="wishes-preview">
          <div className="preview-copy">
            <p className="eyebrow">Birthday wishes</p>
            <h2>
              Love in
              <span> every word</span>
            </h2>
            <p>
              A gentle place for family and friends to read the notes shared
              for Aaditya&apos;s special day.
            </p>
            <Link className="primary-action preview-action" href="/wishes">
              View Wishes
            </Link>
          </div>
          <div className="wish-preview-row" aria-label="Wishes preview">
            {wishPreview.map((wish) => (
              <article className="wish-preview-card" key={wish.author}>
                <span>“</span>
                <p>{wish.text}</p>
                <strong>{wish.author}</strong>
              </article>
            ))}
          </div>
        </section>
      )}
      {shouldShowWishForm && <WishFormSection />}
    </>
  );
}

function WishFormSection() {
  return (
    <section className="home-wish-form-band" id="leave-a-wish">
      <div className="section-heading">
        <h2>
          Send him a little love
        </h2>
        <p>
          Add a birthday note for Aaditya now, and it will become part of the
          love saved for his first birthday.
        </p>
      </div>
      <form className="wish-form-preview" aria-label="Leave a birthday wish">
        <label htmlFor="home-wish-name">Your name</label>
        <input id="home-wish-name" placeholder="Grandma, Auntie, Uncle..." />
        <label htmlFor="home-wish-message">Your wish</label>
        <textarea
          id="home-wish-message"
          placeholder="Write a birthday wish for his first year..."
        />
        <button type="button">Save Wish</button>
      </form>
    </section>
  );
}
