"use client";

import Link from "next/link";

import { useBirthdayState } from "./countdown";

const journalPreview = [
  {
    label: "Month 1",
    title: "Hello, World",
    text: "The beginning of his story.",
    photo: "newborn",
  },
  {
    label: "Month 6",
    title: "Halfway to One",
    text: "A little world full of giggles, discoveries, and favorite routines.",
    photo: "six-months",
  },
  {
    label: "Month 12",
    title: "One Whole Year",
    text: "The first chapter, filled with love, laughter, and sweet little firsts.",
    photo: "birthday",
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
      <div className="preview-stop" id="journal-preview">
        <section className="preview-band">
          <div className="preview-copy">
            <p className="eyebrow">First-year journal</p>
            <h2>
              A year of
              <span> sweet firsts</span>
            </h2>
            <p>
              A little glimpse of the memories, milestones, and everyday magic
              that made Aaditya&apos;s first year so special.
            </p>
          </div>
          <div className="preview-card-row" aria-label="Journal preview">
            {journalPreview.map((item) => (
              <article className="preview-card" key={item.label}>
                <div
                  aria-label={`${item.label} highlight photo placeholder`}
                  className={`preview-photo preview-photo-${item.photo}`}
                  role="img"
                />
                <p className="preview-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
            <article className="preview-card journal-explore-card">
              <p>
                Browse the first year month by month, with memories, milestones,
                and little moments to look back on.
              </p>
              <Link className="primary-action preview-action journal-preview-action" href="/journal">
                View Journal →
              </Link>
            </article>
          </div>
        </section>
        {shouldRevealWishes && (
          <a className="section-scroll-cue" href="#wishes-preview">
            See birthday wishes
            <span aria-hidden="true" />
          </a>
        )}
        {!shouldRevealWishes && shouldShowWishForm && (
          <a className="section-scroll-cue" href="#leave-a-wish">
            Leave a wish
            <span aria-hidden="true" />
          </a>
        )}
      </div>
      {shouldRevealWishes && (
        <div className="preview-stop" id="wishes-preview">
          <section className="preview-band preview-band-wishes">
            <div className="preview-copy">
              <p className="eyebrow">Birthday wishes</p>
              <h2>
                Notes for the birthday boy
              </h2>
              <p>
                Read the sweet messages and blessings shared for his first
                birthday.
              </p>
            </div>
            <div className="wish-preview-row" aria-label="Wishes preview">
              {wishPreview.map((wish) => (
                <article className="wish-preview-card" key={wish.author}>
                  <span>“</span>
                  <p>{wish.text}</p>
                  <strong>{wish.author}</strong>
                </article>
              ))}
              <article className="wish-preview-card wishes-explore-card">
                <p>
                  View the wishes from family and friends, all saved in one
                  place.
                </p>
                <Link className="primary-action preview-action wishes-preview-action" href="/wishes">
                  View Wishes →
                </Link>
              </article>
            </div>
          </section>
          {shouldShowWishForm && (
            <a className="section-scroll-cue" href="#leave-a-wish">
              Leave a wish
              <span aria-hidden="true" />
            </a>
          )}
        </div>
      )}
      {shouldShowWishForm && <WishFormSection />}
    </>
  );
}

function WishFormSection() {
  return (
    <section className="home-wish-form-band" id="leave-a-wish">
      <div className="section-heading">
        <h2>Send him a birthday wish</h2>
        <p>
          Write a note, share a memory, or add a photo or video to be saved as
          part of his first birthday celebration.
        </p>
      </div>
      <form className="wish-form-preview" aria-label="Leave a birthday wish">
        <label htmlFor="home-wish-name">Your name *</label>
        <input
          id="home-wish-name"
          placeholder="Your name or family name"
        />
        <label htmlFor="home-wish-message">Your wish *</label>
        <textarea
          id="home-wish-message"
          placeholder="Write a birthday wish, blessing, or memory for Aaditya..."
        />
        <label htmlFor="home-wish-media">Add a photo or video</label>
        <p className="field-help">
          Optional — include a photo or short video with your wish.
        </p>
        <label className="upload-field" htmlFor="home-wish-media">
          <span>Click to upload or drag and drop</span>
          <small>JPG, PNG, MP4, MOV • Max size: 50MB</small>
          <input
            accept="image/*,video/*"
            id="home-wish-media"
            type="file"
          />
        </label>
        <button type="button">Send Wish</button>
      </form>
    </section>
  );
}
