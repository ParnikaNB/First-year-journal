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

const emptyTimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const testCountdownDuration = 5 * 60 * 1000;
const testBirthdayDuration = 5 * 60 * 1000;
const testStateListeners = new Set<() => void>();
let testWindow: { birthdayStart: number; birthdayEnd: number } | null = null;
let manualTestPhase: BirthdayPhase | null = null;

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
      timeLeft: emptyTimeLeft,
    };
  }

  if (now >= birthdayStart) {
    return {
      phase: "birthday",
      timeLeft: emptyTimeLeft,
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

function getCurrentBirthdayState() {
  if (manualTestPhase) {
    return {
      phase: manualTestPhase,
      timeLeft: emptyTimeLeft,
    };
  }

  const { birthdayStart, birthdayEnd } = getTestBirthdayWindow();

  return getBirthdayState(birthdayStart, birthdayEnd);
}

export function setTestBirthdayPhase(phase: BirthdayPhase) {
  if (phase === "before") {
    manualTestPhase = null;
    testWindow = null;
  } else {
    manualTestPhase = phase;
  }

  testStateListeners.forEach((listener) => listener());
}

export function useBirthdayState() {
  const [birthdayState, setBirthdayState] = useState<BirthdayState | null>(
    null,
  );

  useEffect(() => {
    // Temporary test window: every full page reload starts a fresh countdown
    // that ends in 5 minutes, then birthday mode stays active for 5 minutes.
    // Keep this until the full website is ready, then restore the production
    // PDT constants above.
    const updateCountdown = () => {
      setBirthdayState(getCurrentBirthdayState());
    };

    testStateListeners.add(updateCountdown);
    const initialTimer = window.setTimeout(updateCountdown, 0);
    const timer = window.setInterval(updateCountdown, 1000);

    return () => {
      testStateListeners.delete(updateCountdown);
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
            One whole year of little firsts, bright smiles, quiet cuddles, and
            so much love.
            <span>
              Today we&apos;re celebrating his first birthday with memories from
              his first year and wishes from the people who love him.
            </span>
          </p>
        </div>
        <ScrollCue />
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
            <span>his first year lives here</span>
          </h1>
          <p className="intro">
            His first birthday has passed, but this little collection of
            memories, milestones, and wishes is here to revisit, remember, and
            cherish.
          </p>
        </div>
        <ScrollCue />
      </section>
    );
  }

  return (
    <section className="hero hero-before" id="countdown">
      <div className="hero-copy">
        <p className="eyebrow">August 31, 2026</p>
        <h1>
          Aaditya Turns One
          <span>The big day is almost here</span>
        </h1>
        <p className="intro">
          Celebrate with us by looking back at the most precious moments from
          his first year and sending in your birthday wishes.
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
      <ScrollCue />
    </section>
  );
}

function ScrollCue() {
  return (
    <a className="scroll-cue" href="#journal-preview">
      Explore his first year
      <span aria-hidden="true" />
    </a>
  );
}

export function BirthdayTestControls() {
  const birthdayState = useBirthdayState();
  const phase = birthdayState?.phase ?? "before";

  return (
    <section className="test-controls" aria-label="Birthday state test controls">
      <p>Test birthday state</p>
      <div>
        <button type="button" onClick={() => setTestBirthdayPhase("before")}>
          Reset countdown
        </button>
        <button type="button" onClick={() => setTestBirthdayPhase("birthday")}>
          Birthday
        </button>
        <button type="button" onClick={() => setTestBirthdayPhase("after")}>
          After
        </button>
      </div>
      <span>Current: {phase}</span>
    </section>
  );
}
