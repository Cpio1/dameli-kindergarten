// Minimal two-tone illustrations for the clubs. Stroke uses the ink color, fills use the palette.

const ink = "#352D45";

export function EnglishArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M8 14c0-4 3-7 7-7h26c4 0 7 3 7 7v14c0 4-3 7-7 7H24l-9 8v-8c-4 0-7-3-7-7z" fill="#FFFFFF" />
      <path d="M8 14c0-4 3-7 7-7h26c4 0 7 3 7 7v14c0 4-3 7-7 7H24l-9 8v-8c-4 0-7-3-7-7z" stroke={ink} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M17 27l4.5-12 4.5 12M18.6 23h5.8M30 15v12h4.2c2.3 0 3.8-1.4 3.8-3.4S36.5 21 34.2 21H30m0 0h3.7c2 0 3.3-1.3 3.3-3s-1.3-3-3.3-3H30" stroke={ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 40c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v6c0 3.3-2.7 6-6 6v5l-6-5c-3.3 0-6-2.7-6-6z" fill="#A78BCB" />
      <circle cx="44" cy="43" r="1.6" fill="#FFFFFF" />
      <circle cx="50" cy="43" r="1.6" fill="#FFFFFF" />
    </svg>
  );
}

export function DanceArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M10 44c8-18 22-8 26-20 3-9-4-15-10-11" stroke="#A78BCB" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 52c10-3 16-10 22-22 3-6 9-9 12-5" stroke="#B8D1B2" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 38c3-4 9-5 13-2 5 4 6 12 1 16-4 4-11 3-15-1-3-3-3-9 1-13z" fill="#FFFFFF" stroke={ink} strokeWidth="2.2" />
      <path d="M31 43c2-1 5-1 7 1" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M41 36l8-12M27 40l-10-9" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function MusicArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M24 44V14l26-6v30" stroke={ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 22l26-6" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="17" cy="45" rx="8" ry="6.5" fill="#A78BCB" stroke={ink} strokeWidth="2.2" />
      <ellipse cx="43" cy="39" rx="8" ry="6.5" fill="#B8D1B2" stroke={ink} strokeWidth="2.2" />
      <path d="M8 18c2-2 5-2 7 0M54 50c2 2 2 5 0 7" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function RoboticsArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path d="M32 8v8" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="32" cy="7" r="3" fill="#B8D1B2" stroke={ink} strokeWidth="2" />
      <rect x="14" y="16" width="36" height="28" rx="11" fill="#FFFFFF" stroke={ink} strokeWidth="2.2" />
      <circle cx="25" cy="29" r="4" fill="#A78BCB" />
      <circle cx="39" cy="29" r="4" fill="#A78BCB" />
      <path d="M27 37c3 2 7 2 10 0" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M14 30H9M55 30h-5" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="22" y="47" width="20" height="10" rx="4" fill="#B8D1B2" stroke={ink} strokeWidth="2.2" />
    </svg>
  );
}
