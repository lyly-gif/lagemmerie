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
