type BrandLogoProps = {
  light?: boolean
  compact?: boolean
}

export function BrandLogo({ light = false, compact = false }: BrandLogoProps) {
  return (
    <span className={`brand-logo ${light ? 'brand-logo--light' : ''}`} aria-label="Tropa Threads">
      <svg className="brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="61" height="61" rx="13.5" stroke="currentColor" strokeWidth="3" />
        <path d="M12 18h40v9H37v24H27V27H12V18Z" fill="currentColor" />
        <path d="M37 32h15L42 47h-5V32Z" fill="currentColor" />
      </svg>
      {!compact && <span className="brand-wordmark">TROPA<br />THREADS<span className="brand-dot">.</span></span>}
    </span>
  )
}
