import { Business } from '@/services/business.service';
import Image from 'next/image';

interface RestaurantTemplateProps {
  business: Business;
}

export default function RestaurantTemplate({ business }: RestaurantTemplateProps) {
  const {
    businessName,
    tagline,
    description,
    services = [],
    contact,
    operatingHours,
    gallery = [],
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

  const defaultGallery = [
    { url: '/restaurant1.svg' },
    { url: '/restaurant2.svg' },
    { url: '/restaurant3.svg' },
  ];
  const displayGallery = [
    ...gallery,
    ...defaultGallery.slice(gallery.length)
  ].slice(0, Math.max(gallery.length, 3));

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen bg-[#14110F] text-[#FDFBF7] selection:bg-[#E25E3E] selection:text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
        .resto-title { font-family: 'Cormorant Garamond', serif; }
        .resto-accent { color: #E25E3E; }
        .resto-bg-accent { background-color: #E25E3E; }
        
        .resto-btn-outline {
          border: 1px solid #E25E3E;
          color: #E25E3E;
          transition: all 0.3s ease;
        }
        .resto-btn-outline:hover {
          background-color: #E25E3E;
          color: #FDFBF7;
        }

        .resto-card {
          background: #1A1614;
          border: 1px solid rgba(253, 251, 247, 0.05);
          transition: transform 0.4s ease, border-color 0.4s ease;
        }
        .resto-card:hover {
          transform: translateY(-5px);
          border-color: rgba(226, 94, 62, 0.3);
        }
      `}</style>

      {/* NAV */}
      <header className="absolute top-0 w-full z-50 px-4 sm:px-8 lg:px-16 py-6 lg:py-8 flex items-center justify-between">
        <div className="resto-title text-2xl md:text-3xl font-semibold tracking-wide">
          {businessName}<span className="resto-accent">.</span>
        </div>
        <div className="flex gap-4 items-center">
          {contact?.phone && (
            <button
              onClick={() => handleContactClick('phone')}
              className="text-sm tracking-widest uppercase hover:text-[#E25E3E] transition-colors"
            >
              Reservation
            </button>
          )}
          {contact?.whatsapp && (
            <button
              onClick={() => handleContactClick('whatsapp')}
              className="resto-btn-outline px-5 py-2 text-xs tracking-widest uppercase rounded-full"
            >
              Order Now
            </button>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-16 pt-24 md:pt-32 pb-12">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E25E3E] rounded-full blur-[200px] opacity-[0.08] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {displayGallery && displayGallery.length > 0 && (
            <div className="order-2 md:order-1 relative flex justify-center items-center mt-12 md:mt-0">
              <div className="absolute inset-0 bg-gradient-radial from-[#E25E3E]/20 to-transparent blur-2xl"></div>
              <div className="relative z-10 w-full max-w-[280px] md:max-w-md bg-[#1A1614] rounded-full overflow-hidden shadow-[0_0_60px_rgba(226,94,62,0.3)] border-8 border-[#1A1614]">
                <img src={displayGallery[0].url} alt="Culinary Art" className={`w-full h-auto mx-auto object-cover aspect-square ${displayGallery[0].url.endsWith('.svg') ? 'p-8 bg-[#E25E3E]/5' : ''}`} />
              </div>
            </div>
          )}
          
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            {tagline && (
              <p className="text-[#E25E3E] tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-medium">
                — {tagline}
              </p>
            )}
            <h1 className="resto-title text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] mb-8">
              A Taste of <br />
              <span className="italic font-light text-[#E25E3E]">Perfection</span>
            </h1>
            {description && (
              <p className="text-gray-400 font-light leading-relaxed max-w-md text-lg mb-10">
                {description}
              </p>
            )}
            <div className="flex gap-6 items-center">
              {contact?.whatsapp && (
                <button
                  onClick={() => handleContactClick('whatsapp')}
                  className="resto-bg-accent text-[#FDFBF7] px-8 py-4 rounded-full tracking-widest uppercase text-sm hover:bg-[#d14f31] transition-colors shadow-lg shadow-[#E25E3E]/20"
                >
                  Book a Table
                </button>
              )}
              {contact?.address && (
                <button
                  onClick={() => contact.googleMapsLink && window.open(contact.googleMapsLink, '_blank')}
                  className="text-gray-300 hover:text-[#E25E3E] text-sm tracking-widest uppercase transition-colors underline decoration-white/20 underline-offset-8"
                >
                  Location
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ATMOSPHERE / SVG SHOWCASE */}
      <section className="py-16 lg:py-24 bg-[#1A1614]">
        {displayGallery && displayGallery.length > 1 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center px-4 sm:px-8 lg:px-16">
            <div className={`${displayGallery.length > 2 ? 'columns-2' : 'columns-1'} gap-6 lg:gap-8 space-y-6 lg:space-y-8 justify-center`}>
              {displayGallery.slice(1, 3).map((img, i) => (
                <div key={i} className={`w-full break-inside-avoid ${i % 2 === 0 && displayGallery.length > 2 ? 'mt-12' : ''}`}>
                  <img src={img.url} alt={`Atmosphere ${i + 1}`} className={`w-full h-auto object-cover rounded-2xl shadow-[0_15px_40px_rgba(226,94,62,0.12)] sepia-[.3] hover:sepia-0 transition-all duration-700 ${img.url.endsWith('.svg') ? 'object-contain p-6 bg-[#25201D]' : ''}`} />
                </div>
              ))}
            </div>
            
            <div>
              <div className="restaurant-decorative-line mb-6 opacity-30 w-24"></div>
              <h2 className="resto-title text-3xl md:text-5xl font-bold mb-6 text-[#FFF5E6]">
                An Ambiance Like <span className="italic text-[#E25E3E]">No Other</span>
              </h2>
              <p className="text-[#A49C96] text-lg leading-relaxed font-light">
                Experience dining in a setting that engages all the senses. From carefully curated lighting to acoustics designed for conversation, every detail has been thoughtfully considered to elevate your culinary journey.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* MENU / SERVICES */}
      {services.length > 0 && (
        <section className="py-20 lg:py-32 px-4 sm:px-8 lg:px-16 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-[#E25E3E] tracking-[0.3em] uppercase text-xs mb-4">— Discover</p>
              <h2 className="resto-title text-5xl md:text-6xl font-semibold">Our Menu</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {services.map((item, index) => (
                <div key={index} className="group cursor-default">
                  <div className="flex justify-between items-baseline mb-2 border-b border-white/10 pb-2 border-dashed group-hover:border-[#E25E3E]/50 transition-colors">
                    <h3 className="resto-title text-2xl font-semibold group-hover:text-[#E25E3E] transition-colors">{item.name}</h3>
                    {item.price && (
                      <span className="text-lg text-[#E25E3E] font-medium pl-4">{item.price}</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-gray-400 font-light text-sm leading-relaxed mt-3">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Additional Food/Dish Images */}
            {gallery && gallery.length > 3 && (
              <div className="mt-20 columns-2 md:columns-4 gap-4 space-y-4">
                {gallery.slice(3).map((img, i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl group border border-[#E25E3E]/10 break-inside-avoid">
                    <img src={img.url} alt={`Signature Dish ${i + 1}`} className={`w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-110 ${img.url.endsWith('.svg') ? 'object-contain p-6 bg-[#25201D]' : ''}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FOOTER & INFO */}
      <footer className="bg-[#1A1614] border-t border-[#E25E3E]/10 pt-16 lg:pt-24 pb-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="resto-title text-3xl font-semibold mb-6">{businessName}<span className="resto-accent">.</span></h2>
            {tagline && <p className="text-gray-400 font-light mb-6">{tagline}</p>}
            <div className="flex gap-4">
              {contact?.socialLinks?.instagram && (
                <button onClick={() => handleSocialClick('instagram')} className="text-gray-400 hover:text-[#E25E3E] transition-colors uppercase tracking-widest text-xs">IG</button>
              )}
              {contact?.socialLinks?.facebook && (
                <button onClick={() => handleSocialClick('facebook')} className="text-gray-400 hover:text-[#E25E3E] transition-colors uppercase tracking-widest text-xs">FB</button>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#E25E3E] uppercase tracking-[0.2em] text-xs font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              {contact?.address && <li>{contact.address}</li>}
              {contact?.phone && <li>{contact.phone}</li>}
              {contact?.email && <li>{contact.email}</li>}
            </ul>
          </div>

          {/* Hours */}
          {hourEntries.length > 0 && (
            <div>
              <h4 className="text-[#E25E3E] uppercase tracking-[0.2em] text-xs font-semibold mb-6">Opening Hours</h4>
              <ul className="space-y-3 font-light text-gray-400">
                {hourEntries.map(([day, hours]) => (
                  <li key={day} className="flex justify-between">
                    <span className="capitalize">{day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
        
        <div className="text-center border-t border-white/5 pt-8 text-gray-600 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} {businessName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
