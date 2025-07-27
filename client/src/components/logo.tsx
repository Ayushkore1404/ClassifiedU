interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Graduation cap base */}
        <path
          d="M20 8L8 14L20 20L32 14L20 8Z"
          fill="currentColor"
          className="text-white"
        />
        
        {/* Graduation cap top */}
        <path
          d="M32 14V22C32 24 26 26 20 26C14 26 8 24 8 22V14"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-white"
        />
        
        {/* Tassel */}
        <circle
          cx="28"
          cy="12"
          r="2"
          fill="currentColor"
          className="text-orange-300"
        />
        <path
          d="M28 14L30 18"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-orange-300"
        />
        
        {/* Books underneath */}
        <rect
          x="12"
          y="28"
          width="16"
          height="3"
          rx="1"
          fill="currentColor"
          className="text-white opacity-80"
        />
        <rect
          x="10"
          y="31"
          width="20"
          height="3"
          rx="1"
          fill="currentColor"
          className="text-white opacity-60"
        />
        <rect
          x="14"
          y="34"
          width="12"
          height="3"
          rx="1"
          fill="currentColor"
          className="text-white opacity-40"
        />
      </svg>
    </div>
  );
}

export function LogoIcon({ className = "", size = 24 }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified graduation cap */}
        <path
          d="M12 4L4 8L12 12L20 8L12 4Z"
          fill="currentColor"
        />
        <path
          d="M20 8V14C20 15 16 16 12 16C8 16 4 15 4 14V8"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Small book icon */}
        <rect
          x="8"
          y="18"
          width="8"
          height="2"
          rx="1"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}