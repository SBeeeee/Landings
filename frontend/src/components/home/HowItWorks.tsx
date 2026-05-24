const steps = [
  {
    number: '01',
    title: 'Sign up in seconds',
    description:
      'Create your free account with just your name and email. No credit card needed.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Pick your business type',
    description:
      'Choose from salon, gym, tutor, boutique, and more. We pre-fill the right sections for you.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Fill your details',
    description:
      'Add your services, prices, photos, and contact info. Takes less than 5 minutes.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Share your link',
    description:
      'Get yoursite.com/your-name. Put it on your visiting card, WhatsApp bio, or Instagram.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            From zero to online in minutes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            No tech skills needed. If you can fill a WhatsApp message, you can
            build your page.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/8 bg-white/3 p-6 transition-all duration-200 hover:border-indigo-500/40 hover:bg-white/5"
            >
              {/* Connector line (desktop) */}
              {idx < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute right-0 top-10 hidden h-px w-6 translate-x-full bg-gradient-to-r from-white/10 to-transparent lg:block"
                />
              )}

              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/15 text-indigo-400 ring-1 ring-indigo-500/20 transition-colors group-hover:bg-indigo-600/25">
                  {step.icon}
                </span>
                <span className="text-3xl font-black text-white/10">
                  {step.number}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
