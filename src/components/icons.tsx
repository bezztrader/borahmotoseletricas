import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.21-3.6.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.45-5.04c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.92.99 6.71 2.79a9.43 9.43 0 0 1 2.78 6.71c0 5.24-4.26 9.5-9.48 9.5m8.08-17.58A11.35 11.35 0 0 0 12.05.58C5.75.58.62 5.7.62 12a11.4 11.4 0 0 0 1.53 5.71L.5 23.75l6.18-1.62a11.4 11.4 0 0 0 5.37 1.37h.01c6.3 0 11.43-5.13 11.43-11.43 0-3.05-1.19-5.92-3.35-8.08" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}


export function PhoneIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" {...props}>
      <path d="M5 3.5h3.2l1.6 4.4-2.2 1.4a11.5 11.5 0 0 0 7.1 7.1l1.4-2.2 4.4 1.6V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5Z" />
    </svg>
  );
}

/* Own line icons (1.6 stroke, round joins), built for this site. */
function Line({ children, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 2 5 13.2h5.6L9.5 22 19 9.8h-5.7z" />
    </svg>
  );
}

/** Fuel pump crossed out: no more gas station. */
export function NoPumpIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M7 27V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v20M5 27h16M10 11h6" />
      <path d="M19 14h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V12l-3-3" />
      <path d="M4 4l24 24" />
    </Line>
  );
}

/** A lane slipping between two blocked lanes: skip the traffic. */
export function LaneIcon(props: IconProps) {
  return (
    <Line {...props}>
      <rect x="3" y="18" width="8" height="10" rx="2" />
      <rect x="21" y="18" width="8" height="10" rx="2" />
      <path d="M16 28V8M12 12l4-4 4 4" />
      <path d="M16 3v1" />
    </Line>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M20.5 4.5a6 6 0 0 0-7.4 7.6L4.5 20.7a2.5 2.5 0 0 0 3.5 3.5l8.6-8.6a6 6 0 0 0 7.6-7.4l-3.7 3.7-3.4-.6-.6-3.4z" />
    </Line>
  );
}

export function PlugIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M11 3v6M21 3v6M7 9h18v5a9 9 0 0 1-18 0zM16 23v6" />
    </Line>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M6 16h20M19 9l7 7-7 7" />
    </Line>
  );
}
