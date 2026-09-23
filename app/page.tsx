import Link from "next/link";
import styles from "./page.module.css";

/**
 * Deterministic pseudo-random so the server render and the client hydration
 * agree on where every star and spoke lands.
 */
function random(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const CENTER = 400;

const spokes = Array.from({ length: 96 }, (_, i) => {
  const angle = (i / 96) * Math.PI * 2;
  const inner = 232;
  const outer = inner + 14 + random(i + 1) * 58;
  return {
    x1: CENTER + Math.cos(angle) * inner,
    y1: CENTER + Math.sin(angle) * inner,
    x2: CENTER + Math.cos(angle) * outer,
    y2: CENTER + Math.sin(angle) * outer,
    opacity: 0.15 + random(i + 100) * 0.55,
  };
});

const stars = Array.from({ length: 140 }, (_, i) => ({
  cx: random(i + 7) * 800,
  cy: random(i + 313) * 800,
  r: 0.4 + random(i + 977) * 1.5,
  opacity: 0.2 + random(i + 1861) * 0.7,
}));

export default function Home() {
  return (
    <main className={styles.page}>
      <svg
        className={styles.art}
        viewBox="0 0 800 800"
        role="img"
        aria-label="A glowing orb of light surrounded by rotating rings and a field of stars"
      >
        <defs>
          <radialGradient id="core" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fffbe8" />
            <stop offset="35%" stopColor="#ffb457" />
            <stop offset="70%" stopColor="#f2506e" />
            <stop offset="100%" stopColor="#7a1f8f" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="haze" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#4cc9f0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4cc9f0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4cc9f0" />
            <stop offset="50%" stopColor="#b5179e" />
            <stop offset="100%" stopColor="#ffd166" />
          </linearGradient>
          <filter id="soften">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <radialGradient id="scrim" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#05060e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#05060e" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className={styles.stars}>
          {stars.map((star, i) => (
            <circle key={i} {...star} fill="#eaf2ff" />
          ))}
        </g>

        <circle cx={CENTER} cy={CENTER} r="300" fill="url(#haze)" filter="url(#soften)" />
        <circle className={styles.pulse} cx={CENTER} cy={CENTER} r="210" fill="url(#core)" />
        <circle cx={CENTER} cy={CENTER} r="245" fill="url(#scrim)" />

        <g className={styles.spokes}>
          {spokes.map((spoke, i) => (
            <line key={i} {...spoke} stroke="url(#ring)" strokeWidth="2" strokeLinecap="round" />
          ))}
        </g>

        <circle
          className={styles.ringSlow}
          cx={CENTER}
          cy={CENTER}
          r="330"
          fill="none"
          stroke="url(#ring)"
          strokeWidth="1.5"
          strokeDasharray="2 14"
        />
        <circle
          className={styles.ringFast}
          cx={CENTER}
          cy={CENTER}
          r="365"
          fill="none"
          stroke="url(#ring)"
          strokeWidth="3"
          strokeDasharray="60 260"
          strokeLinecap="round"
        />
      </svg>

      <section className={styles.content}>
        <p className={styles.eyebrow}>Humor Project · Assignment 1</p>
        <h1 className={styles.title}>Hello, world.</h1>
        <Link href="/jokes" className={styles.cta}>
          See the jokes →
        </Link>
      </section>
    </main>
  );
}
