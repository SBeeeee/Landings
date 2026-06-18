import { Business } from '@/services/business.service';
import { useState } from 'react';

interface MakeupTemplateProps {
  business: Business;
}

export default function MakeupTemplate({ business }: MakeupTemplateProps) {
  const {
    businessName,
    tagline,
    description,
    services = [],
    contact,
    operatingHours,
    gallery = [],
  } = business;

  const [galleryIndex, setGalleryIndex] = useState(0);

  const nextImage = () => {
    if (gallery.length > 0) setGalleryIndex((prev) => (prev + 1) % gallery.length);
  };
  const prevImage = () => {
    if (gallery.length > 0) setGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleContactClick = (type: 'phone' | 'whatsapp' | 'email') => {
    switch (type) {
      case 'phone':
        if (contact?.phone) window.open(`tel:${contact.phone}`);
        break;
      case 'whatsapp':
        if (contact?.whatsapp)
          window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`);
        break;
      case 'email':
        if (contact?.email) window.open(`mailto:${contact.email}`);
        break;
    }
  };

  const handleSocialClick = (platform: 'instagram' | 'facebook' | 'linkedin') => {
    const url = contact?.socialLinks?.[platform];
    if (url) window.open(url, '_blank');
  };

  const hourEntries = operatingHours
    ? Object.entries(operatingHours).filter(([, v]) => v)
    : [];

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen bg-[#FDF8F4] text-[#3D2C2A]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        .mu-display { font-family: 'Playfair Display', serif; }
        .mu-texture { background-image: radial-gradient(circle, rgba(194,135,107,0.06) 1px, transparent 1px); background-size: 24px 24px; }
        .mu-gallery-btn { transition: all 0.3s ease; }
        .mu-gallery-btn:hover { background: rgba(194,135,107,0.15); }
      `}</style>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 bg-[#FDF8F4]/90 backdrop-blur-md border-b border-[#E8D5C8]">
        <div>
          <h1 className="mu-display text-2xl font-semibold tracking-tight text-[#5C3A32]">
            {businessName}
          </h1>
          {tagline && (
            <p className="text-[0.7rem] tracking-[0.25em] uppercase text-[#B0897A] mt-0.5 font-medium">
              {tagline}
            </p>
          )}
        </div>
        <div className="flex gap-3 items-center">
          {contact?.whatsapp && (
            <button
              onClick={() => handleContactClick('whatsapp')}
              className="bg-[#5C3A32] text-white text-xs tracking-widest uppercase px-5 py-2.5 rounded-full font-medium hover:bg-[#4A2E28] transition-colors"
            >
              Book Now
            </button>
          )}
        </div>
      </header>

      {/* ── HERO: Split layout ── */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        {/* Left: Text */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-20 order-2 lg:order-1 mu-texture">
          <span className="text-[0.6rem] tracking-[0.5em] uppercase text-[#B0897A] mb-6 font-medium">
            Makeup Studio
          </span>
          <h2
            className="mu-display font-bold leading-[1.08] text-[#5C3A32] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}
          >
            Bringing out the{' '}
            <span className="italic text-[#C2876B]">real</span> you
          </h2>
          {description && (
            <p className="text-sm leading-relaxed text-[#7A5C55] mb-8 max-w-[42ch] font-light">
              {description}
            </p>
          )}
          <div className="flex gap-4 flex-wrap">
            {contact?.phone && (
              <button
                onClick={() => handleContactClick('phone')}
                className="bg-[#5C3A32] text-white text-xs tracking-widest uppercase px-7 py-3 rounded-full font-medium hover:bg-[#4A2E28] transition-colors"
              >
                Call to Book
              </button>
            )}
            {contact?.whatsapp && (
              <button
                onClick={() => handleContactClick('whatsapp')}
                className="text-[#5C3A32] text-xs tracking-widest uppercase px-7 py-3 rounded-full font-medium border border-[#C2876B]/40 hover:bg-[#C2876B]/10 transition-colors"
              >
                WhatsApp
              </button>
            )}
          </div>
        </div>

        {/* Right: Image / Gallery Slider */}
        <div className="relative order-1 lg:order-2 h-[50vh] lg:h-auto bg-[#EFE3DA] overflow-hidden">
          {gallery.length > 0 ? (
            <>
              <img
                src={gallery[galleryIndex].url}
                alt={`Look ${galleryIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="mu-gallery-btn absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-[#5C3A32] shadow-sm"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="mu-gallery-btn absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-[#5C3A32] shadow-sm"
                  >
                    →
                  </button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === galleryIndex ? 'bg-[#5C3A32] w-5' : 'bg-[#5C3A32]/30'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F0E4DA]">
              <p className="mu-display text-5xl italic text-[#C2876B]/20">before & after</p>
            </div>
          )}
        </div>
      </section>

      {/* ── SERVICES: Horizontal scroll cards ── */}
      {services.length > 0 && (
        <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[0.6rem] tracking-[0.5em] uppercase text-[#B0897A] font-medium">What We Do</span>
              <h3 className="mu-display text-4xl lg:text-5xl font-bold text-[#5C3A32] mt-2">Services</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 border border-[#E8D5C8] hover:shadow-lg hover:shadow-[#C2876B]/5 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="mu-display text-5xl italic text-[#C2876B]/20 font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="mu-display text-xl font-semibold text-[#5C3A32] mt-3 mb-2">
                  {service.name}
                </h4>
                {service.description && (
                  <p className="text-sm leading-relaxed text-[#7A5C55] font-light">
                    {service.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#E8D5C8]">
                  {service.price && (
                    <span className="mu-display text-lg font-semibold text-[#C2876B]">
                      {service.price}
                    </span>
                  )}
                  {service.duration && (
                    <span className="text-xs tracking-widest uppercase text-[#B0897A] font-medium">
                      {service.duration}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── GALLERY SHOWCASE ── */}
      {gallery.length > 0 && (
        <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-28 bg-[#F5EDE6]">
          <div className="mb-12">
            <span className="text-[0.6rem] tracking-[0.5em] uppercase text-[#B0897A] font-medium">Our Work</span>
            <h3 className="mu-display text-4xl lg:text-5xl font-bold text-[#5C3A32] mt-2">The Gallery</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl group ${
                  i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={img.url}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CONTACT + HOURS split ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        {/* Left: Contact */}
        <div className="bg-[#5C3A32] text-[#FDF8F4] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20">
          <span className="text-[0.6rem] tracking-[0.5em] uppercase text-[#C2876B] mb-6 font-medium">
            Get In Touch
          </span>
          <h3 className="mu-display text-4xl lg:text-5xl font-bold mb-10">
            Let&apos;s talk about <span className="italic text-[#C2876B]">your look</span>
          </h3>

          <div className="space-y-8">
            {contact?.phone && (
              <button
                onClick={() => handleContactClick('phone')}
                className="flex items-center gap-4 text-left group w-full"
              >
                <div className="w-11 h-11 rounded-full bg-[#C2876B]/20 flex items-center justify-center text-lg group-hover:bg-[#C2876B]/30 transition-colors flex-shrink-0">
                  📞
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C2876B]">Phone</p>
                  <p className="text-sm font-medium">{contact.phone}</p>
                </div>
              </button>
            )}

            {contact?.email && (
              <button
                onClick={() => handleContactClick('email')}
                className="flex items-center gap-4 text-left group w-full"
              >
                <div className="w-11 h-11 rounded-full bg-[#C2876B]/20 flex items-center justify-center text-lg group-hover:bg-[#C2876B]/30 transition-colors flex-shrink-0">
                  ✉
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C2876B]">Email</p>
                  <p className="text-sm font-medium">{contact.email}</p>
                </div>
              </button>
            )}

            {contact?.address && (
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#C2876B]/20 flex items-center justify-center text-lg flex-shrink-0">
                  ◉
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C2876B]">Studio</p>
                  <p className="text-sm font-medium leading-relaxed">{contact.address}</p>
                  {contact?.googleMapsLink && (
                    <button
                      onClick={() => window.open(contact.googleMapsLink, '_blank')}
                      className="text-xs text-[#C2876B] mt-2 underline underline-offset-4 decoration-[#C2876B]/30 hover:decoration-[#C2876B] transition-colors"
                    >
                      Get Directions →
                    </button>
                  )}
                </div>
              </div>
            )}

            {contact?.whatsapp && (
              <button
                onClick={() => handleContactClick('whatsapp')}
                className="flex items-center gap-4 text-left group w-full"
              >
                <div className="w-11 h-11 rounded-full bg-[#C2876B]/20 flex items-center justify-center text-lg group-hover:bg-[#C2876B]/30 transition-colors flex-shrink-0">
                  💬
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C2876B]">WhatsApp</p>
                  <p className="text-sm font-medium">{contact.whatsapp}</p>
                </div>
              </button>
            )}
          </div>

          {/* Social */}
          {contact?.socialLinks && (Object.values(contact.socialLinks).some(Boolean)) && (
            <div className="flex gap-4 mt-10 pt-8 border-t border-[#C2876B]/20">
              {contact.socialLinks.instagram && (
                <button
                  onClick={() => handleSocialClick('instagram')}
                  className="text-xs tracking-widest uppercase text-[#C2876B] hover:text-white transition-colors"
                >
                  Instagram
                </button>
              )}
              {contact.socialLinks.facebook && (
                <button
                  onClick={() => handleSocialClick('facebook')}
                  className="text-xs tracking-widest uppercase text-[#C2876B] hover:text-white transition-colors"
                >
                  Facebook
                </button>
              )}
              {contact.socialLinks.linkedin && (
                <button
                  onClick={() => handleSocialClick('linkedin')}
                  className="text-xs tracking-widest uppercase text-[#C2876B] hover:text-white transition-colors"
                >
                  LinkedIn
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: Hours */}
        <div className="bg-[#F5EDE6] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20">
          <span className="text-[0.6rem] tracking-[0.5em] uppercase text-[#B0897A] mb-6 font-medium">
            When to visit
          </span>
          <h3 className="mu-display text-4xl lg:text-5xl font-bold text-[#5C3A32] mb-10">
            Opening <span className="italic text-[#C2876B]">Hours</span>
          </h3>

          {hourEntries.length > 0 ? (
            <div className="space-y-0">
              {hourEntries.map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between items-center py-4 border-b border-[#C2876B]/15"
                >
                  <span className="text-sm capitalize text-[#7A5C55] font-medium">{day}</span>
                  {hours?.toLowerCase() === 'closed' ? (
                    <span className="text-sm italic text-[#B0897A]/50">Closed</span>
                  ) : (
                    <span className="mu-display text-base text-[#5C3A32] font-semibold">{hours}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#B0897A] italic">By appointment only</p>
          )}

          {contact?.phone && (
            <button
              onClick={() => handleContactClick('phone')}
              className="mt-10 bg-[#5C3A32] text-white text-xs tracking-widest uppercase px-7 py-3 rounded-full font-medium hover:bg-[#4A2E28] transition-colors self-start"
            >
              Schedule Now
            </button>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#FDF8F4] border-t border-[#E8D5C8] px-6 sm:px-10 lg:px-16 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="mu-display text-lg font-semibold text-[#5C3A32]">{businessName}</p>
            {tagline && (
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#B0897A] mt-0.5">{tagline}</p>
            )}
          </div>
          <p className="text-xs text-[#B0897A]">
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
