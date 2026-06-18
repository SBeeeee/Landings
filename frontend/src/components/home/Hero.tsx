import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
        Built for small businesses
      </div>

      {/* Headline */}
      <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
        Your business online{' '}
        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          in 5 minutes
        </span>
      </h1>

      {/* Sub-headline */}
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
        A clean, shareable page for your salon, gym, tutor, or makeup studio — no
        website builder, no developer, no hassle. Just fill in your details and
        share the link.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/dashboard/setup">
          <Button size="lg">
            Create your page — it&apos;s free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Button>
        </Link>
        <a href="#examples">
          <Button variant="ghost" size="lg">See examples</Button>
        </a>
      </div>

      {/* Social proof strip */}
      <p className="mt-8 text-sm text-gray-500">
        Trusted by{' '}
        <span className="font-semibold text-gray-300">2,400+</span> small
        businesses across India
      </p>

      {/* Mock browser preview */}
      <div className="relative mx-auto mt-16 w-full max-w-2xl">
        {/* Browser chrome */}
        <div className="rounded-2xl border border-white/8 bg-gray-900 shadow-2xl shadow-black/60">
          <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <div className="ml-3 flex-1 rounded-md bg-gray-800 px-3 py-1 text-xs text-gray-400">
              landings.in/priya-salon
            </div>
          </div>
          {/* Page preview */}
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500" />
              <div>
                <div className="h-4 w-32 rounded bg-white/15" />
                <div className="mt-2 h-3 w-20 rounded bg-white/8" />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl bg-white/5 p-3">
                  <div className="h-3 w-16 rounded bg-white/15" />
                  <div className="mt-2 h-2 w-10 rounded bg-white/8" />
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-white/5" />
              ))}
            </div>
          </div>
        </div>
        {/* Glow under card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-2xl"
        />
      </div>
    </section>
  );
}
