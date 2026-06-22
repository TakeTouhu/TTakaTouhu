import Image from 'next/image';

// SVG mark — used on dark/light backgrounds
export function VTaMarkIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,2 40,2 55,78 14,78" fill="#1D55B5" />
      <polygon points="48,2 80,2 74,78 50,78" fill="#29B5E8" />
      <path d="M34 8 Q62 34 78 8" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Header logo — PNG with transparent background
export function LogoHeader() {
  return (
    <Image
      src="/logo.png"
      alt="VTaBridge"
      width={360}
      height={140}
      className="h-14 w-auto object-contain"
      priority
    />
  );
}

// Footer logo — SVG mark + white text (dark background)
export function LogoFooter() {
  return (
    <div className="flex items-center gap-2.5">
      <VTaMarkIcon className="h-8 w-auto" />
      <span className="font-black text-lg tracking-tight text-white">VTaBridge</span>
    </div>
  );
}

// Hero section — SVG mark + white text (used on blue/dark gradient)
export function LogoHeroLight() {
  return (
    <div className="flex items-center gap-3">
      <VTaMarkIcon className="h-12 w-auto" />
      <div>
        <div className="font-black text-3xl tracking-tight text-white leading-none">VTaBridge</div>
        <div className="text-blue-300 text-xs mt-0.5">世界の優秀なエンジニアと日本企業をつなぐ架け橋に。</div>
      </div>
    </div>
  );
}

export function BridgeIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return <VTaMarkIcon className={className} />;
}
