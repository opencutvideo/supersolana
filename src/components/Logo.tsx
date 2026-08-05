export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF3399"/>
          <stop offset="100%" stopColor="#00FF41"/>
        </linearGradient>
        <linearGradient id="logoGrad2" x1="48" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00FF41"/>
          <stop offset="100%" stopColor="#3B5FCC"/>
        </linearGradient>
      </defs>
      {/* Outer hex */}
      <path
        d="M24 2L44 13.5V34.5L24 46L4 34.5V13.5L24 2Z"
        fill="url(#logoGrad1)"
        opacity="0.12"
      />
      {/* S shape - SuperSolana */}
      <path
        d="M30 14H20C17.8 14 16 15.8 16 18C16 20.2 17.8 22 20 22H28C30.2 22 32 23.8 32 26C32 28.2 30.2 30 28 30H18"
        stroke="url(#logoGrad1)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Speed lines */}
      <path d="M15 36H26" stroke="url(#logoGrad2)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M18 40H28" stroke="url(#logoGrad2)" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}
