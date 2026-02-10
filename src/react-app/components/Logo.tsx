export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular background */}
      <circle cx="50" cy="50" r="45" fill="white" opacity="0.95"/>
      
      {/* Main leaf - left */}
      <path
        d="M50 30 Q35 35 30 50 Q35 65 50 70 L50 30 Z"
        fill="#22c55e"
        opacity="0.9"
      />
      
      {/* Main leaf - right */}
      <path
        d="M50 30 Q65 35 70 50 Q65 65 50 70 L50 30 Z"
        fill="#16a34a"
        opacity="0.9"
      />
      
      {/* Center stem */}
      <line x1="50" y1="30" x2="50" y2="70" stroke="#15803d" strokeWidth="2" strokeLinecap="round"/>
      
      {/* Left veins */}
      <path
        d="M50 40 Q42 43 38 48"
        stroke="#15803d"
        strokeWidth="1"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M50 50 Q42 52 38 56"
        stroke="#15803d"
        strokeWidth="1"
        opacity="0.3"
        strokeLinecap="round"
      />
      
      {/* Right veins */}
      <path
        d="M50 40 Q58 43 62 48"
        stroke="#15803d"
        strokeWidth="1"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M50 50 Q58 52 62 56"
        stroke="#15803d"
        strokeWidth="1"
        opacity="0.3"
        strokeLinecap="round"
      />
      
      {/* Subtle shadow/depth */}
      <circle cx="50" cy="50" r="45" stroke="#22c55e" strokeWidth="2" opacity="0.2"/>
    </svg>
  );
}
