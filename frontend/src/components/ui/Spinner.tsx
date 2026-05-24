type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  /** Centres itself in a full-screen overlay */
  fullscreen?: boolean;
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-7 w-7 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export default function Spinner({
  size = 'md',
  fullscreen = false,
  label,
}: SpinnerProps) {
  const spinner = (
    <span
      role="status"
      aria-label={label ?? 'Loading'}
      className={[
        'inline-block animate-spin rounded-full border-current border-t-transparent text-indigo-400',
        sizeClasses[size],
      ].join(' ')}
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-gray-950">
        {spinner}
        {label && <p className="text-sm text-gray-400">{label}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {spinner}
      {label && <p className="text-sm text-gray-400">{label}</p>}
    </div>
  );
}
