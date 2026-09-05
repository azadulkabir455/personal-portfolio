export default function RocketIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 0C30 0 45 20 45 50C45 62 41 72 41 72H19C19 72 15 62 15 50C15 20 30 0 30 0Z"
        fill="#F7F7F7"
      />
      <path d="M19 60L6 82H19V60Z" fill="#00275C" />
      <path d="M41 60L54 82H41V60Z" fill="#00275C" />
      <path d="M19 72H41L37 88H23L19 72Z" fill="#D9E4F2" />
      <circle cx="30" cy="38" r="8" fill="#005CD6" />
      <circle cx="30" cy="38" r="8" stroke="#F7F7F7" strokeWidth="2" />
    </svg>
  );
}
