import './Logo.css'

export function Logo({ height = 26, className = '' }) {
  return (
    <span className={`logo ${className}`} style={{ '--logo-h': `${height}px` }}>
      <svg className="logo__hex" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path
          d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinejoin="miter"
        />
        <text x="50" y="50" className="logo__c" textAnchor="middle" dominantBaseline="central">
          c
        </text>
      </svg>
      <span className="logo__word">olp</span>
    </span>
  )
}
