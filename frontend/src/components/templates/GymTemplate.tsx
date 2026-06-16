import { Business } from '@/services/business.service';
import Image from 'next/image';

interface GymTemplateProps {
  business: Business;
}

export default function GymTemplate({ business }: GymTemplateProps) {
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
  const halfHours = Math.ceil(hourEntries.length / 2);

  const marqueeItems = [
    'TRAIN HARD',
    'NO EXCUSES',
    'BUILD MUSCLE',
    'ENDURANCE',
    'POWER',
    'BECOME STRONGER',
  ];

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF2A2A] selection:text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;500;700;900&display=swap');
        .gym-title { font-family: 'Oswald', sans-serif; text-transform: uppercase; }
        .gym-red { color: #FF2A2A; }
        .gym-bg-red { background-color: #FF2A2A; }
        .gym-marquee { animation: gymMarquee 30s linear infinite; display: flex; white-space: nowrap; width: max-content; }
        @keyframes gymMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        
        /* Glitch effect on hover for buttons */
        .gym-btn {
          position: relative;
          transition: all 0.2s ease;
          text-transform: uppercase;
          font-family: 'Oswald', sans-serif;
          letter-spacing: 0.1em;
          z-index: 1;
        }
        .gym-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: #FF2A2A;
          z-index: -1;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .gym-btn:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }
        .gym-btn:hover {
          color: #0A0A0A !important;
          border-color: #FF2A2A !important;
        }
        
        .gym-card {
          background: #121212;
          border: 1px solid rgba(255, 42, 42, 0.1);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .gym-card:hover {
          transform: translateY(-5px);
          border-color: #FF2A2A;
        }
        .gym-service-number {
          -webkit-text-stroke: 1px rgba(255, 42, 42, 0.3);
          color: transparent;
        }
      `}</style>

      {/* HEADER */}
      <header className="fixed w-full top-0 z-50 px-4 sm:px-8 lg:px-12 py-4 lg:py-6 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#FF2A2A]/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="gym-title text-2xl md:text-3xl font-bold tracking-wider">
              {businessName}
              <span className="gym-red">.</span>
            </h1>
          </div>
          <div className="flex gap-4">
            {contact?.phone && (
              <button
                onClick={() => handleContactClick('phone')}
                className="gym-btn border border-white/20 px-6 py-2 text-sm font-bold"
              >
                CALL NOW
              </button>
            )}
            {contact?.whatsapp && (
              <button
                onClick={() => handleContactClick('whatsapp')}
                className="gym-btn border border-[#FF2A2A] text-[#FF2A2A] px-6 py-2 text-sm font-bold"
              >
                WHATSAPP
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-8 lg:px-12 pt-24 pb-12 lg:pt-32 overflow-hidden">
        {/* Background Grids & Elements */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
               backgroundSize: '40px 40px' 
             }}>
        </div>
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#FF2A2A] rounded-full blur-[150px] opacity-20 mix-blend-screen z-0"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            {tagline && (
              <div className="inline-block border border-[#FF2A2A] px-4 py-1 mb-6">
                <span className="gym-title gym-red tracking-widest text-sm">{tagline}</span>
              </div>
            )}
            <h2 className="gym-title text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-6">
              FORGE YOUR<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF2A2A' }}>LEGACY</span>
            </h2>
            {description && (
              <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              {contact?.whatsapp && (
                <button
                  onClick={() => handleContactClick('whatsapp')}
                  className="gym-bg-red text-[#0A0A0A] gym-title px-8 py-4 text-xl tracking-wider font-bold hover:bg-white transition-colors"
                >
                  JOIN THE RESISTANCE
                </button>
              )}
            </div>
          </div>
          <div className="relative hidden lg:block">
            {/* Using gym3.svg since it's the character SVG you mentioned */}
            <div className="relative z-10 scale-125 transform translate-y-12 drop-shadow-[0_0_30px_rgba(255,42,42,0.3)]">
              <img src="/gym3.svg" alt="Gym Character" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-4 border-y border-[#FF2A2A]/30 bg-[#FF2A2A] text-[#0A0A0A] transform -rotate-1 origin-left mt-12 mb-24">
        <div className="gym-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gym-title text-3xl font-bold px-8">
              {item} <span className="mx-8 text-[#0A0A0A]/30">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* GALLERY / SHOWCASE */}
      <section className="px-4 sm:px-8 lg:px-12 py-12">
        {gallery && gallery.length > 0 ? (
          <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 ${gallery.length > 2 ? 'lg:grid-cols-3' : ''} gap-8`}>
            {gallery.map((img, i) => (
              <div key={i} className="flex justify-center items-center gym-card overflow-hidden border border-white/5">
                <img src={img.url} alt={`Gallery Image ${i + 1}`} className="w-full h-80 md:h-96 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <div className="flex justify-center items-center p-12 gym-card">
              <img src="/gym1.svg" alt="Gym Graphic 1" className="w-3/4 h-auto drop-shadow-[0_0_15px_rgba(255,42,42,0.2)]" />
            </div>
            <div className="flex justify-center items-center p-12 gym-card">
              <img src="/gym2.svg" alt="Gym Graphic 2" className="w-3/4 h-auto drop-shadow-[0_0_15px_rgba(255,42,42,0.2)]" />
            </div>
          </div>
        )}
      </section>

      {/* SERVICES */}
      {services.length > 0 && (
        <section className="px-4 sm:px-8 lg:px-12 py-16 lg:py-24 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="gym-title text-5xl md:text-7xl font-bold">PROGRAMS</h2>
                <div className="w-24 h-2 bg-[#FF2A2A] mt-4"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="gym-card p-8 flex flex-col justify-between group">
                  <div>
                    <div className="gym-title gym-service-number text-7xl font-bold mb-6">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="gym-title text-2xl mb-4 group-hover:text-[#FF2A2A] transition-colors">
                      {service.name}
                    </h3>
                    {service.description && (
                      <p className="text-gray-400 leading-relaxed mb-8">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-center gym-title tracking-wider">
                    {service.duration && (
                      <span className="text-gray-500 text-sm">{service.duration}</span>
                    )}
                    {service.price && (
                      <span className="gym-red text-xl">{service.price}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOURS & CONTACT SPLIT */}
      <section className="px-4 sm:px-8 lg:px-12 py-16 lg:py-24 bg-[#121212] border-t border-[#FF2A2A]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* HOURS */}
          {hourEntries.length > 0 && (
            <div>
              <h2 className="gym-title text-4xl mb-8">HOURS OF OPERATION</h2>
              <div className="space-y-4">
                {hourEntries.map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="gym-title tracking-widest text-gray-400">{day}</span>
                    <span className={`gym-title tracking-wider ${hours?.toLowerCase() === 'closed' ? 'text-gray-600' : 'text-white'}`}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT INFO */}
          <div>
            <h2 className="gym-title text-4xl mb-8">BASE CAMP</h2>
            <div className="space-y-8">
              {contact?.address && (
                <div>
                  <h4 className="gym-title text-[#FF2A2A] tracking-wider mb-2">LOCATION</h4>
                  <p className="text-xl font-light">{contact.address}</p>
                </div>
              )}
              {contact?.phone && (
                <div>
                  <h4 className="gym-title text-[#FF2A2A] tracking-wider mb-2">COMM LINK</h4>
                  <p className="text-xl font-light">{contact.phone}</p>
                </div>
              )}
              {contact?.email && (
                <div>
                  <h4 className="gym-title text-[#FF2A2A] tracking-wider mb-2">DIGITAL</h4>
                  <p className="text-xl font-light">{contact.email}</p>
                </div>
              )}
            </div>

            {/* Socials */}
            {contact?.socialLinks && (
              <div className="mt-12 flex gap-4">
                {contact.socialLinks.instagram && (
                  <button onClick={() => handleSocialClick('instagram')} className="gym-btn border border-white/20 px-6 py-3">
                    INSTAGRAM
                  </button>
                )}
                {contact.socialLinks.facebook && (
                  <button onClick={() => handleSocialClick('facebook')} className="gym-btn border border-white/20 px-6 py-3">
                    FACEBOOK
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 sm:px-8 lg:px-12 py-8 lg:py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="gym-title text-3xl font-bold tracking-widest text-[#555]">
          {businessName}
        </div>
        <div className="text-sm font-bold tracking-widest text-[#555] uppercase">
          © {new Date().getFullYear()} {businessName}. NO EXCUSES.
        </div>
      </footer>
    </div>
  );
}
