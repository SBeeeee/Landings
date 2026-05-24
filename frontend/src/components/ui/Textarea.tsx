import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Textarea({
  label,
  error,
  hint,
  className = '',
  id,
  ...props
}: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <textarea
        id={inputId}
        {...props}
        className={[
          'w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500',
          'resize-y min-h-[100px] transition-colors duration-150 outline-none',
          'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500/60' : 'border-white/10',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
