import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <span className="text-sm font-bold text-white">Landings</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <a href="#how-it-works" className="hover:text-gray-300 transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-gray-300 transition-colors">Pricing</a>
            <Link href="/login" className="hover:text-gray-300 transition-colors">Log in</Link>
            <Link href="/register" className="hover:text-gray-300 transition-colors">Sign up</Link>
          </nav>

          {/* Copy */}
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Landings. Made in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
