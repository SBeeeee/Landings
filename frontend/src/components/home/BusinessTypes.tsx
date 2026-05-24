const businesses = [
  { emoji: '💇', label: 'Salon', color: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-500/20' },
  { emoji: '🏋️', label: 'Gym', color: 'from-orange-500/20 to-amber-500/10', border: 'border-orange-500/20' },
  { emoji: '📚', label: 'Tutor', color: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/20' },
  { emoji: '👗', label: 'Boutique', color: 'from-violet-500/20 to-purple-500/10', border: 'border-violet-500/20' },
  { emoji: '🍽️', label: 'Restaurant', color: 'from-yellow-500/20 to-orange-500/10', border: 'border-yellow-500/20' },
  { emoji: '💆', label: 'Spa', color: 'from-teal-500/20 to-emerald-500/10', border: 'border-teal-500/20' },
  { emoji: '📸', label: 'Photographer', color: 'from-indigo-500/20 to-blue-500/10', border: 'border-indigo-500/20' },
  { emoji: '🎨', label: 'Artist', color: 'from-fuchsia-500/20 to-pink-500/10', border: 'border-fuchsia-500/20' },
];

export default function BusinessTypes() {
  return (
    <section id="examples" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
            Made for every business
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Whatever you do, we&apos;ve got a template
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Each business type comes with pre-built sections that make sense for
            your industry.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {businesses.map((b) => (
            <div
              key={b.label}
              className={`group flex cursor-pointer flex-col items-center gap-3 rounded-2xl border bg-gradient-to-br p-6 transition-all duration-200 hover:scale-[1.03] hover:shadow-lg ${b.color} ${b.border}`}
            >
              <span className="text-4xl">{b.emoji}</span>
              <span className="text-sm font-semibold text-gray-200">
                {b.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t see yours?{' '}
          <a href="/register" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Start with a blank page →
          </a>
        </p>
      </div>
    </section>
  );
}
