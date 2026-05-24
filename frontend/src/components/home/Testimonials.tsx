const testimonials = [
  {
    quote:
      'I used to send customers to my Justdial page. Now I send them to my own link. It looks so much more professional.',
    name: 'Priya Sharma',
    role: 'Salon owner, Pune',
    avatar: 'PS',
    color: 'bg-pink-500',
  },
  {
    quote:
      'My students find my schedule, fees, and contact all in one place. I set it up in one evening and it just works.',
    name: 'Rahul Verma',
    role: 'Maths tutor, Delhi',
    avatar: 'RV',
    color: 'bg-blue-500',
  },
  {
    quote:
      'Paid ₹8000 for a website I couldn\'t update. This is free and I update it myself in two minutes.',
    name: 'Meena Iyer',
    role: 'Boutique owner, Chennai',
    avatar: 'MI',
    color: 'bg-violet-500',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
            Real businesses, real results
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            They made the switch
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-white/8 bg-white/3 p-7"
            >
              {/* Stars */}
              <div className="flex gap-1 text-amber-400 text-sm mb-4" aria-label="5 stars">
                {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
              </div>

              <blockquote className="flex-1 text-sm leading-relaxed text-gray-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
