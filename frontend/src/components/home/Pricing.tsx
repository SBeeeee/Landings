import Link from 'next/link';
import Button from '@/components/ui/Button';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Everything you need to get online.',
    features: [
      'Your own link (landings.in/you)',
      'Services & pricing section',
      'Contact & location',
      'Up to 6 photos',
      'WhatsApp button',
    ],
    cta: 'Get started free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹199',
    period: 'per month',
    description: 'For businesses that want to stand out.',
    features: [
      'Everything in Free',
      'Custom domain support',
      'Unlimited photos',
      'Analytics & visitor count',
      'Remove "Powered by Landings"',
      'Priority support',
    ],
    cta: 'Start free trial',
    href: '/register?plan=pro',
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
            Pricing
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Simple, honest pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Start free. Upgrade only when you need more.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                'relative flex flex-col rounded-2xl p-8',
                plan.highlight
                  ? 'border border-indigo-500/50 bg-indigo-600/10 shadow-xl shadow-indigo-600/10'
                  : 'border border-white/8 bg-white/3',
              ].join(' ')}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  Most popular
                </span>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-400">{plan.name}</p>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="mb-1.5 text-sm text-gray-500">/{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{plan.description}</p>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href={plan.href}>
                  <Button
                    variant={plan.highlight ? 'primary' : 'secondary'}
                    fullWidth
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
