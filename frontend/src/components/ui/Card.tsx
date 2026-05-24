interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds indigo highlight border + glow — use for featured/active cards */
  highlighted?: boolean;
  /** Makes the card a clickable element */
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  highlighted = false,
  onClick,
}: CardProps) {
  const base = [
    'rounded-2xl border p-6',
    highlighted
      ? 'border-indigo-500/50 bg-indigo-600/10 shadow-xl shadow-indigo-600/10'
      : 'border-white/8 bg-white/3',
    onClick
      ? 'cursor-pointer transition-all duration-200 hover:border-indigo-500/40 hover:bg-white/5'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (onClick) {
    return (
      <div role="button" tabIndex={0} onClick={onClick} onKeyDown={(e) => e.key === 'Enter' && onClick()} className={base}>
        {children}
      </div>
    );
  }

  return <div className={base}>{children}</div>;
}
