export default function FlameIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 42" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flameOuter" x1="15" y1="0" x2="15" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD166" />
          <stop offset="1" stopColor="#FF6B00" />
        </linearGradient>
        <linearGradient id="flameInner" x1="15" y1="10" x2="15" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF4D6" />
          <stop offset="1" stopColor="#FFB020" />
        </linearGradient>
      </defs>
      <path
        d="M15 0C15 0 27 15 27 26C27 34.8366 21.6274 42 15 42C8.37258 42 3 34.8366 3 26C3 15 15 0 15 0Z"
        fill="url(#flameOuter)"
      />
      <path
        d="M15 12C15 12 20.5 21 20.5 27.5C20.5 32.7467 18.0376 37 15 37C11.9624 37 9.5 32.7467 9.5 27.5C9.5 21 15 12 15 12Z"
        fill="url(#flameInner)"
      />
    </svg>
  );
}
