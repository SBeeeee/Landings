import { Business } from '@/services/business.service';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface SalonTemplateProps {
  business: Business;
}

export default function SalonTemplate({ business }: SalonTemplateProps) {
  const {
    businessName,
    tagline,
    description,
    services = [],
    contact,
    operatingHours,
  } = business;

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
  const halfHours = Math.ceil(hourEntries.length / 2);

  const marqueeItems = [
    businessName,
    'Expert Stylists',
    'Book Today',
    'Award Winning',
    'Premium Products',
    'Personal Service',
  ];

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
        .salon-serif { font-family: 'Cormorant Garamond', serif; }
        .salon-gold { color: #C9A84C; }
        .salon-gold-border { border-color: rgba(201,168,76,0.4); }
        .salon-marquee { animation: salonMarquee 40s linear infinite; display: flex; white-space: nowrap; width: max-content; }
        @keyframes salonMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .salon-service-card:hover { border-color: rgba(201,168,76,0.4) !important; background: rgba(201,168,76,0.03) !important; }
        .salon-btn-ghost { transition: all 0.3s; }
        .salon-btn-ghost:hover { background: #C9A84C !important; color: #0A0A0A !important; }
        .salon-btn-solid:hover { background: #E8C97A !important; }
        .salon-contact-card:hover { border-color: rgba(201,168,76,0.4) !important; }
        .salon-social-btn:hover { border-color: #C9A84C !important; color: #C9A84C !important; }
      `}</style>

      {/* NAV */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 lg:py-5"
        style={{
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '0.5px solid rgba(201,168,76,0.25)',
        }}
      >
        <div>
          <h1
            className="salon-serif salon-gold text-2xl font-light tracking-[0.15em] uppercase"
          >
            {businessName}
          </h1>
          {tagline && (
            <p className="text-[0.62rem] tracking-[0.35em] uppercase text-[#D4C9B2] mt-0.5">
              {tagline}
            </p>
          )}
        </div>
        <div className="flex gap-3 items-center">
          {contact?.phone && (
            <button
              onClick={() => handleContactClick('phone')}
              className="salon-btn-ghost text-[#C9A84C] text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2 bg-transparent"
              style={{ border: '0.5px solid rgba(201,168,76,0.5)' }}
            >
              Call Us
            </button>
          )}
          {contact?.whatsapp && (
            <button
              onClick={() => handleContactClick('whatsapp')}
              className="salon-btn-solid bg-[#C9A84C] text-[#0A0A0A] text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2 font-medium"
              style={{ border: '0.5px solid #C9A84C' }}
            >
              WhatsApp
            </button>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[88vh] flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-16 lg:py-24 overflow-hidden">
        {/* Decorative lines */}
        <svg
          className="absolute right-0 top-0 w-[45%] h-full pointer-events-none opacity-50"
          viewBox="0 0 500 700"
          preserveAspectRatio="xMaxYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <line x1="80" y1="0" x2="420" y2="700" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
          <line x1="160" y1="0" x2="500" y2="700" stroke="#C9A84C" strokeWidth="0.5" opacity="0.2" />
          <line x1="0" y1="100" x2="500" y2="350" stroke="#C9A84C" strokeWidth="0.5" opacity="0.15" />
          <circle cx="380" cy="200" r="130" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.2" />
          <circle cx="380" cy="200" r="85" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.15" />
          <circle cx="380" cy="200" r="40" fill="rgba(201,168,76,0.04)" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
        </svg>

        <div
          className="text-[0.62rem] tracking-[0.5em] uppercase text-[#C9A84C] mb-7 flex items-center gap-4"
        >
          <span style={{ display: 'block', width: 40, height: '0.5px', background: '#C9A84C' }} />
          Est. — Award-Winning Studio
        </div>

        <h2
          className="salon-serif font-light leading-[1.05] text-[#F5F0E8] mb-3 max-w-full md:max-w-[80%] lg:max-w-[65%]"
          style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}
        >
          Where Beauty<br />Becomes{' '}
          <em className="text-[#C9A84C] italic">Art</em>
        </h2>

        {description && (
          <p className="text-[0.72rem] tracking-[0.25em] uppercase text-[#D4C9B2] mt-5 mb-10 max-w-[40ch] leading-[2]">
            {description}
          </p>
        )}

        <div className="flex gap-5 flex-wrap">
          {contact?.phone && (
            <button
              onClick={() => handleContactClick('phone')}
              className="salon-btn-solid bg-[#C9A84C] text-[#0A0A0A] text-[0.7rem] tracking-[0.2em] uppercase px-8 py-3.5 font-medium"
              style={{ border: '0.5px solid #C9A84C' }}
            >
              Book Appointment
            </button>
          )}
          {contact?.whatsapp && (
            <button
              onClick={() => handleContactClick('whatsapp')}
              className="salon-btn-ghost text-[#C9A84C] text-[0.7rem] tracking-[0.2em] uppercase px-8 py-3.5 bg-transparent"
              style={{ border: '0.5px solid rgba(201,168,76,0.5)' }}
            >
              Chat on WhatsApp
            </button>
          )}
        </div>

        {/* Aside stats */}
        <div className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 items-end opacity-20 lg:opacity-100">
          <div className="text-right">
            <div className="salon-serif salon-gold font-light" style={{ fontSize: '3rem', lineHeight: 1 }}>500+</div>
            <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#D4C9B2] mt-1">Happy Clients</div>
          </div>
          <div style={{ width: '0.5px', height: 60, background: 'rgba(201,168,76,0.3)', marginLeft: 'auto' }} />
          <div className="text-right">
            <div className="salon-serif salon-gold font-light" style={{ fontSize: '3rem', lineHeight: 1 }}>6+</div>
            <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#D4C9B2] mt-1">Years Excellence</div>
          </div>
          <div style={{ width: '0.5px', height: 60, background: 'rgba(201,168,76,0.3)', marginLeft: 'auto' }} />
          <div className="text-right">
            <div className="salon-serif salon-gold font-light" style={{ fontSize: '3rem', lineHeight: 1 }}>12</div>
            <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#D4C9B2] mt-1">Expert Stylists</div>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-4 sm:left-8 lg:left-12 text-[0.6rem] tracking-[0.35em] uppercase text-[#D4C9B2] flex items-center gap-3"
        >
          Scroll to explore
          <span style={{ display: 'block', width: 50, height: '0.5px', background: 'currentColor' }} />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div
        className="overflow-hidden py-3.5"
        style={{
          borderTop: '0.5px solid rgba(201,168,76,0.2)',
          borderBottom: '0.5px solid rgba(201,168,76,0.2)',
          background: '#141414',
        }}
      >
        <div className="salon-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-[0.62rem] tracking-[0.4em] uppercase text-[#D4C9B2] px-10">
                {item}
              </span>
              <span className="text-[#C9A84C] text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      {services.length > 0 && (
        <section className="px-4 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div
            className="text-[0.6rem] tracking-[0.5em] uppercase text-[#C9A84C] mb-14 flex items-center gap-4"
          >
            Our Services
            <span
              style={{ flex: 1, height: '0.5px', background: 'rgba(201,168,76,0.25)' }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="salon-service-card p-10 transition-all duration-300 cursor-default"
                style={{ border: '0.5px solid rgba(201,168,76,0.12)' }}
              >
                <div
                  className="salon-serif font-light mb-4"
                  style={{ fontSize: '3.5rem', color: 'rgba(201,168,76,0.12)', lineHeight: 1 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="salon-serif text-[1.35rem] text-[#F5F0E8] mb-2">
                  {service.name}
                </h3>
                {service.description && (
                  <p className="text-[0.68rem] tracking-[0.06em] leading-[1.9] text-[#D4C9B2]">
                    {service.description}
                  </p>
                )}
                {(service.price || service.duration) && (
                  <div
                    className="flex justify-between items-center mt-6 pt-6"
                    style={{ borderTop: '0.5px solid rgba(201,168,76,0.15)' }}
                  >
                    {service.price && (
                      <span className="salon-serif text-[1.1rem] text-[#C9A84C]">
                        {service.price}
                      </span>
                    )}
                    {service.duration && (
                      <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#D4C9B2]">
                        {service.duration}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HOURS */}
      {hourEntries.length > 0 && (
        <div className="px-4 sm:px-8 lg:px-12 py-16 lg:py-20" style={{ background: '#141414' }}>
          <div className="max-w-4xl mx-auto">
            <div
              className="text-[0.6rem] tracking-[0.5em] uppercase text-[#C9A84C] mb-12 flex items-center gap-4"
            >
              Opening Hours
              <span style={{ flex: 1, height: '0.5px', background: 'rgba(201,168,76,0.25)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[hourEntries.slice(0, halfHours), hourEntries.slice(halfHours)].map(
                (col, ci) => (
                  <div key={ci}>
                    {col.map(([day, hours]) => (
                      <div
                        key={day}
                        className="flex justify-between items-baseline py-3.5"
                        style={{ borderBottom: '0.5px solid rgba(201,168,76,0.1)' }}
                      >
                        <span className="text-[0.68rem] tracking-[0.2em] uppercase text-[#D4C9B2]">
                          {day}
                        </span>
                        {hours?.toLowerCase() === 'closed' ? (
                          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.2)]">
                            Closed
                          </span>
                        ) : (
                          <span className="salon-serif text-[0.95rem] text-[#C9A84C]">
                            {hours}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT */}
      <section className="px-4 sm:px-8 lg:px-12 py-16 lg:py-24 text-center">
        <p className="text-[0.68rem] tracking-[0.3em] uppercase text-[#D4C9B2] mb-3">
          We'd love to hear from you
        </p>
        <h2
          className="salon-serif font-light text-[#F5F0E8] mb-16"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          Book Your <em className="text-[#C9A84C]">Experience</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
          {contact?.phone && (
            <div
              className="salon-contact-card p-8 text-center transition-all duration-300"
              style={{ border: '0.5px solid rgba(201,168,76,0.15)' }}
            >
              <div className="text-2xl mb-4 text-[#C9A84C]">📞</div>
              <div className="text-[0.58rem] tracking-[0.35em] uppercase text-[#D4C9B2] mb-2">Call Us</div>
              <div className="salon-serif text-[0.9rem] text-[#F5F0E8] mb-4">{contact.phone}</div>
              <button
                onClick={() => handleContactClick('phone')}
                className="salon-btn-ghost text-[#C9A84C] text-[0.6rem] tracking-[0.2em] uppercase px-4 py-1.5 bg-transparent"
                style={{ border: '0.5px solid rgba(201,168,76,0.4)' }}
              >
                Call Now
              </button>
            </div>
          )}
          {contact?.email && (
            <div
              className="salon-contact-card p-8 text-center transition-all duration-300"
              style={{ border: '0.5px solid rgba(201,168,76,0.15)' }}
            >
              <div className="text-2xl mb-4 text-[#C9A84C]">✉</div>
              <div className="text-[0.58rem] tracking-[0.35em] uppercase text-[#D4C9B2] mb-2">Email Us</div>
              <div className="salon-serif text-[0.9rem] text-[#F5F0E8] mb-4">{contact.email}</div>
              <button
                onClick={() => handleContactClick('email')}
                className="salon-btn-ghost text-[#C9A84C] text-[0.6rem] tracking-[0.2em] uppercase px-4 py-1.5 bg-transparent"
                style={{ border: '0.5px solid rgba(201,168,76,0.4)' }}
              >
                Send Email
              </button>
            </div>
          )}
          {contact?.address && (
            <div
              className="salon-contact-card p-8 text-center transition-all duration-300"
              style={{ border: '0.5px solid rgba(201,168,76,0.15)' }}
            >
              <div className="text-2xl mb-4 text-[#C9A84C]">◉</div>
              <div className="text-[0.58rem] tracking-[0.35em] uppercase text-[#D4C9B2] mb-2">Visit Us</div>
              <div className="salon-serif text-[0.9rem] text-[#F5F0E8] mb-4">{contact.address}</div>
              <button
                onClick={() =>
                  contact.address &&
                  window.open(
                    `https://maps.google.com/?q=${encodeURIComponent(contact.address)}`,
                    '_blank'
                  )
                }
                className="salon-btn-ghost text-[#C9A84C] text-[0.6rem] tracking-[0.2em] uppercase px-4 py-1.5 bg-transparent"
                style={{ border: '0.5px solid rgba(201,168,76,0.4)' }}
              >
                Get Directions
              </button>
            </div>
          )}
        </div>

        {/* Social links */}
        {contact?.socialLinks && (
          <div className="flex justify-center gap-3 flex-wrap">
            {contact.socialLinks.instagram && (
              <button
                onClick={() => handleSocialClick('instagram')}
                className="salon-social-btn text-[#D4C9B2] text-[0.6rem] tracking-[0.25em] uppercase px-6 py-2.5 bg-transparent transition-all duration-300"
                style={{ border: '0.5px solid rgba(201,168,76,0.3)' }}
              >
                ◈ Instagram
              </button>
            )}
            {contact.socialLinks.facebook && (
              <button
                onClick={() => handleSocialClick('facebook')}
                className="salon-social-btn text-[#D4C9B2] text-[0.6rem] tracking-[0.25em] uppercase px-6 py-2.5 bg-transparent transition-all duration-300"
                style={{ border: '0.5px solid rgba(201,168,76,0.3)' }}
              >
                ◈ Facebook
              </button>
            )}
            {contact.socialLinks.linkedin && (
              <button
                onClick={() => handleSocialClick('linkedin')}
                className="salon-social-btn text-[#D4C9B2] text-[0.6rem] tracking-[0.25em] uppercase px-6 py-2.5 bg-transparent transition-all duration-300"
                style={{ border: '0.5px solid rgba(201,168,76,0.3)' }}
              >
                ◈ LinkedIn
              </button>
            )}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer
        className="flex items-center justify-between flex-wrap gap-4 px-4 sm:px-8 lg:px-12 py-8 lg:py-10"
        style={{ borderTop: '0.5px solid rgba(201,168,76,0.2)', background: '#0A0A0A' }}
      >
        <div>
          <div className="salon-serif salon-gold text-xl font-light tracking-[0.1em]">
            {businessName}
          </div>
          {tagline && (
            <div className="text-[0.6rem] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {tagline}
            </div>
          )}
        </div>
        <div className="text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © 2024 {businessName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}