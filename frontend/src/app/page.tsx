import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import BusinessTypes from '@/components/home/BusinessTypes';
import Testimonials from '@/components/home/Testimonials';
import Pricing from '@/components/home/Pricing';
import Footer from '@/components/home/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 antialiased">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <BusinessTypes />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
