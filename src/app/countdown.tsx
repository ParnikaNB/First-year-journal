"use client";

import { useEffect, useMemo, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type BirthdayPhase = "before" | "birthday" | "after";

type BirthdayState = {
  phase: BirthdayPhase;
  timeLeft: TimeLeft;
};

// Production PDT / America/Los_Angeles birthday window.
// Restore these constants when the temporary test window below is no longer
// needed.
// const birthdayStart = Date.UTC(2026, 7, 31, 7);
// const birthdayEnd = Date.UTC(2026, 8, 1, 7);

const testCountdownDuration = 30 * 1000;
const testBirthdayDuration = 30 * 1000;
let testWindow: { birthdayStart: number; birthdayEnd: number } | null = null;

function getTimeLeft(difference: number): TimeLeft {
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function getBirthdayState(
  birthdayStart: number,
  birthdayEnd: number,
): BirthdayState {
  const now = Date.now();

  if (now >= birthdayEnd) {
    return {
      phase: "after",
      timeLeft: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    };
  }

  if (now >= birthdayStart) {
    return {
      phase: "birthday",
      timeLeft: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    };
  }

  return {
    phase: "before",
    timeLeft: getTimeLeft(birthdayStart - now),
  };
}

function getTestBirthdayWindow() {
  if (testWindow) {
    return testWindow;
  }

  const birthdayStart = Date.now() + testCountdownDuration;
  const birthdayEnd = birthdayStart + testBirthdayDuration;

  testWindow = {
    birthdayStart,
    birthdayEnd,
  };

  return testWindow;
}

export function useBirthdayState() {
  const [birthdayState, setBirthdayState] = useState<BirthdayState | null>(
    null,
  );

  useEffect(() => {
    // Temporary test window: every full page reload starts a fresh countdown
    // that ends in 2 minutes, then birthday mode stays active for 10 minutes.
    // Keep this until the full website is ready, then restore the production
    // PDT constants above.
    const { birthdayStart, birthdayEnd } = getTestBirthdayWindow();

    const updateCountdown = () => {
      setBirthdayState(getBirthdayState(birthdayStart, birthdayEnd));
    };

    const initialTimer = window.setTimeout(updateCountdown, 0);
    const timer = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  return birthdayState;
}

export function BirthdayHero() {
  const birthdayState = useBirthdayState();

  const countdownItems = useMemo(
    () => [
      ["Days", birthdayState?.timeLeft.days],
      ["Hours", birthdayState?.timeLeft.hours],
      ["Minutes", birthdayState?.timeLeft.minutes],
      ["Seconds", birthdayState?.timeLeft.seconds],
    ],
    [birthdayState],
  );

  const phase = birthdayState?.phase ?? "before";

  if (phase === "birthday") {
    return (
      <section className="hero hero-birthday" id="countdown">
        <div className="hero-copy">
          <p className="eyebrow">August 31, 2026</p>
          <h1>
            Happy Birthday
            <span>Aaditya</span>
          </h1>
          <p className="intro">
            One whole year of joy, wonder, firsts, and love worth celebrating.
            <span>
              Step into his first-year journal, leave him a wish, or read the
              love already shared for this special day.
            </span>
          </p>
        </div>
      </section>
    );
  }

  if (phase === "after") {
    return (
      <section className="hero hero-after" id="countdown">
        <div className="hero-copy">
          <p className="eyebrow">August 31, 2026</p>
          <h1>
            Our Baby Boy is One
            <span>the celebration continues</span>
          </h1>
          <p className="intro">
            His first birthday has passed, but the memories and wishes are here
            to revisit and cherish.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero hero-before" id="countdown">
      <div className="hero-copy">
        <p className="eyebrow">August 31, 2026</p>
        <h1>
          Aaditya&apos;s first birthday
          <span>one whole year of you</span>
        </h1>
        <p className="intro">
          A soft little home for Aaditya&apos;s sweetest first year, wrapped in
          watercolor blues, cloud-light details, and all the love around him.
        </p>
      </div>
      <div
        className="countdown-grid"
        aria-label="Countdown to Aaditya's birthday on August 31, 2026"
      >
        {countdownItems.map(([label, value]) => (
          <div className="countdown-card" key={label}>
            <span>
              {value === undefined ? "--" : String(value).padStart(2, "0")}
            </span>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
