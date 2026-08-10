/**
 * Line icons ported verbatim from maquette-accueil-la-gemmerie.html — the
 * owner-approved reference for the homepage redesign. Shapes are kept
 * exactly as authored there; only wired up as a reusable registry here.
 */
const paths: Record<string, React.ReactNode> = {
  pool: (
    <>
      <path
        d="M2 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0"
        strokeLinecap="round"
      />
      <path
        d="M2 12c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0"
        strokeLinecap="round"
      />
      <path d="M12 3c-2 2-2 4 0 6s2 4 0 6" strokeLinecap="round" />
    </>
  ),
  wifi: (
    <>
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
      <path
        d="M8.5 14.5a5 5 0 017 0M5 11a10 10 0 0114 0M2 7.5a14.5 14.5 0 0120 0"
        strokeLinecap="round"
      />
    </>
  ),
  kitchen: (
    <path
      d="M5 21h14M6 21V10M18 21V10M4 10h16M6 10c0-3 2.5-6 6-6s6 3 6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  linens: (
    <>
      <rect x="3" y="8" width="18" height="10" rx="1" />
      <path d="M3 12h18M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" strokeLinecap="round" />
    </>
  ),
  families: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
    </>
  ),
  home: (
    <>
      <path d="M5 21V10l7-6 7 6v11" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6" strokeLinejoin="round" />
    </>
  ),
  laundry: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="1" />
      <circle cx="12" cy="14" r="4" />
    </>
  ),
  cleaning: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" />
    </>
  ),
  tv: (
    <>
      <rect x="4" y="4" width="16" height="12" rx="1" />
      <path d="M8 20h8M12 16v4" strokeLinecap="round" />
    </>
  ),
  smokeDetector: (
    <>
      <rect x="4" y="10" width="16" height="9" rx="1" />
      <path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
    </>
  ),
  poolSafety: (
    <path
      d="M4 12h16M4 12a8 8 0 0116 0M4 12a8 8 0 0016 0"
      strokeLinecap="round"
    />
  ),
  garden: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M8 9h8M8 15h5" strokeLinecap="round" />
    </>
  ),
  surf: (
    <>
      <path
        d="M12 2c2.8 3 4 6.5 4 10.5 0 4.5-1.8 8.5-4 9.5-2.2-1-4-5-4-9.5C8 8.5 9.2 5 12 2z"
        strokeLinejoin="round"
      />
      <path d="M12 5v15" strokeLinecap="round" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 17l3.5-9h3L15 13l3 4M9.5 8h3.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  treetop: (
    <path
      d="M12 2l4 6h-2.5l3.5 5.5H14l3.5 5.5H6.5L10 13.5H7.5L11 7.5H8.5zM12 19v2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  waterpark: (
    <path
      d="M12 2c3.2 4.2 5.5 7.6 5.5 10.8a5.5 5.5 0 01-11 0C6.5 9.6 8.8 6.2 12 2z"
      strokeLinejoin="round"
    />
  ),
  nature: (
    <>
      <path
        d="M12 21C7 21 4 17 4 11c0-3 1.5-6 4-8 3 2 8 5 8 11 0 4-2 7-4 7z"
        strokeLinejoin="round"
      />
      <path d="M12 21V9" strokeLinecap="round" />
    </>
  ),
  canoe: (
    <>
      <path
        d="M2 14c3 4 7 5 10 5s7-1 10-5c-3 1.3-7 2-10 2s-7-.7-10-2z"
        strokeLinejoin="round"
      />
      <path d="M6 8l12-6M6 8l2 1.5M18 2l-2 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  zoo: (
    <g fill="currentColor" stroke="none">
      <circle cx="12" cy="15" r="3.2" />
      <circle cx="7" cy="10" r="1.6" />
      <circle cx="17" cy="10" r="1.6" />
      <circle cx="9.5" cy="6.5" r="1.4" />
      <circle cx="14.5" cy="6.5" r="1.4" />
    </g>
  ),
};

export type IconName = keyof typeof paths;

export function LineIcon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
