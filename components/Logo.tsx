export function BridgeIcon({ className = 'w-8 h-8', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base road */}
      <line x1="4" y1="68" x2="116" y2="68" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Left tower */}
      <line x1="28" y1="68" x2="28" y2="20" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Right tower */}
      <line x1="92" y1="68" x2="92" y2="20" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Left tower top dot */}
      <circle cx="28" cy="18" r="4" fill={color} />
      {/* Right tower top dot */}
      <circle cx="92" cy="18" r="4" fill={color} />
      {/* Cable arc */}
      <path d="M28 18 Q60 42 92 18" stroke={color} strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* Vertical suspenders */}
      <line x1="48" y1="31" x2="48" y2="68" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="60" y1="36" x2="60" y2="68" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="72" y1="31" x2="72" y2="68" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      {/* Left diagonal brace */}
      <line x1="4" y1="68" x2="28" y2="20" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      {/* Right diagonal brace */}
      <line x1="116" y1="68" x2="92" y2="20" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      {/* Bottom left pillar */}
      <line x1="28" y1="68" x2="28" y2="76" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Bottom right pillar */}
      <line x1="92" y1="68" x2="92" y2="76" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function LogoDark({ className = 'h-9' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
        <BridgeIcon className="w-7 h-7" color="white" />
      </div>
      <span className="font-bold text-xl tracking-tight text-gray-900">VTa<span className="text-blue-700">Bridge</span></span>
    </div>
  );
}

export function LogoLight({ className = 'h-9' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
        <BridgeIcon className="w-7 h-7" color="white" />
      </div>
      <span className="font-bold text-xl tracking-tight text-white">VTa<span className="text-blue-300">Bridge</span></span>
    </div>
  );
}
