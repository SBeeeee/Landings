import { Business } from '@/services/business.service';
import Image from 'next/image';

interface TutorTemplateProps {
  business: Business;
}

export default function TutorTemplate({ business }: TutorTemplateProps) {
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

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#2563EB] selection:text-white"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        
        .tutor-serif { font-family: 'Lora', serif; }
        .tutor-accent { color: #2563EB; }
        .tutor-bg-accent { background-color: #2563EB; }
        
        .tutor-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
        }
        .tutor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-color: #BFDBFE;
        }
        
        .tutor-btn-primary {
          background: #2563EB;
          color: #FFFFFF;
          transition: all 0.2s ease;
        }
        .tutor-btn-primary:hover {
          background: #1D4ED8;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        .tutor-btn-outline {
          background: transparent;
          color: #2563EB;
          border: 1px solid #2563EB;
          transition: all 0.2s ease;
        }
        .tutor-btn-outline:hover {
          background: #EFF6FF;
        }

        .tutor-header-blur {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #E2E8F0;
        }

        .tutor-pattern {
          background-image: radial-gradient(#CBD5E1 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 tutor-header-blur">
        <div>
          <h1 className="tutor-serif text-xl md:text-2xl font-semibold tracking-tight text-[#0F172A]">
            {businessName}
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          {contact?.phone && (
            <button
              onClick={() => handleContactClick('phone')}
              className="tutor-btn-outline text-xs md:text-sm font-medium px-4 py-2 rounded-full hidden sm:block"
            >
              Call Now
            </button>
          )}
          {contact?.whatsapp && (
            <button
              onClick={() => handleContactClick('whatsapp')}
              className="tutor-btn-primary text-xs md:text-sm font-medium px-5 py-2 rounded-full"
            >
              Message
            </button>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-32 px-4 sm:px-8 lg:px-12 overflow-hidden tutor-pattern">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob pointer-events-none"></div>
        <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text */}
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <div className="inline-block mb-6 px-4 py-1.5 bg-white border border-blue-100 rounded-full text-blue-600 text-xs md:text-sm font-semibold tracking-wide uppercase shadow-sm">
                Professional Tutoring & Mentorship
              </div>
              
              <h2 className="tutor-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 text-[#0F172A]">
                Unlock your <br className="hidden lg:block" />
                <span className="tutor-accent italic">full potential.</span>
              </h2>
              
              {tagline && (
                <p className="text-lg md:text-xl text-[#475569] mb-6 font-medium leading-relaxed">
                  {tagline}
                </p>
              )}

              {description && (
                <p className="text-base text-[#64748B] mb-10 leading-relaxed">
                  {description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                {contact?.whatsapp && (
                  <button
                    onClick={() => handleContactClick('whatsapp')}
                    className="tutor-btn-primary text-base font-medium px-8 py-3.5 rounded-full w-full sm:w-auto shadow-lg shadow-blue-500/30"
                  >
                    Book a Session
                  </button>
                )}
                {contact?.email && (
                  <button
                    onClick={() => handleContactClick('email')}
                    className="tutor-btn-outline bg-white text-base font-medium px-8 py-3.5 rounded-full w-full sm:w-auto shadow-sm"
                  >
                    Send an Email
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Illustration */}
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full filter blur-2xl opacity-70 transform scale-90"></div>
              {gallery && gallery.length > 0 ? (
                <img 
                  src={gallery[0].url} 
                  alt="Tutoring" 
                  className="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-2xl border-4 border-white hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <Image 
                  src="/tutor1.svg" 
                  alt="Tutoring Illustration" 
                  width={600} 
                  height={500} 
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              )}
              
              {/* Floating detail cards */}
              <div className="absolute top-10 -left-6 md:-left-12 bg-white p-4 rounded-2xl shadow-xl border border-blue-50 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Expert</p>
                    <p className="text-sm font-bold text-gray-900">Guidance</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-10 -right-6 md:-right-12 bg-white p-4 rounded-2xl shadow-xl border border-blue-50 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <span className="font-bold text-lg">A+</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Proven</p>
                    <p className="text-sm font-bold text-gray-900">Results</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE ME SECTION */}
      <section className="py-16 lg:py-20 px-4 sm:px-8 lg:px-12 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative flex justify-center">
              <div className="absolute inset-0 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
              {gallery && gallery.length > 1 ? (
                <img 
                  src={gallery[1].url} 
                  alt="Learning Philosophy" 
                  className="relative z-10 w-full max-w-md h-[400px] object-cover rounded-3xl shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              ) : (
                <Image 
                  src="/tutor2.svg" 
                  alt="Learning Philosophy" 
                  width={500} 
                  height={400} 
                  className="relative z-10 w-full max-w-md h-auto drop-shadow-xl"
                />
              )}
            </div>
            
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h3 className="tutor-serif text-3xl md:text-4xl font-semibold mb-6 text-[#0F172A]">
                A personalized approach to <span className="tutor-accent italic">learning.</span>
              </h3>
              <p className="text-lg text-[#475569] mb-8 leading-relaxed">
                Education is not a one-size-fits-all journey. My philosophy is built around understanding each student's unique learning style and crafting a curriculum that fosters true comprehension, rather than just rote memorization.
              </p>
              
              <ul className="space-y-4 text-left max-w-lg mx-auto lg:mx-0">
                {[
                  'Customized lesson plans for every student',
                  'Focus on core concepts and practical application',
                  'Flexible scheduling to fit your busy life',
                  'Continuous feedback and progress tracking'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[#334155] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES/SUBJECTS */}
      {services.length > 0 && (
        <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-12 bg-[#F8FAFC] relative overflow-hidden">
          {gallery && gallery.length > 2 && (
             <div className="absolute top-8 right-8 lg:right-24 w-40 lg:w-64 transform rotate-6 hover:rotate-0 transition-transform duration-500 hidden md:block z-0 opacity-80 hover:opacity-100">
                <div className="p-2 lg:p-3 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img src={gallery[2].url} alt="Tutoring Snapshot" className="w-full h-full object-cover" />
                  </div>
                </div>
             </div>
          )}
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-16 text-center">
              <h3 className="tutor-serif text-3xl md:text-4xl font-semibold mb-4 text-[#0F172A]">
                Subjects & Courses
              </h3>
              <p className="text-[#64748B] max-w-xl mx-auto">
                Tailored educational programs designed to help you achieve your academic goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="tutor-card rounded-2xl p-8 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full tutor-bg-accent"></div>
                  <div className="flex-1">
                    <h4 className="tutor-serif text-xl font-semibold text-[#0F172A] mb-3">
                      {service.name}
                    </h4>
                    {service.description && (
                      <p className="text-[#475569] text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-[#E2E8F0] flex justify-between items-end">
                    {service.price && (
                      <div>
                        <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Fee</p>
                        <p className="text-lg font-semibold tutor-accent">{service.price}</p>
                      </div>
                    )}
                    {service.duration && (
                      <div className="text-right">
                        <p className="text-xs text-[#64748B] uppercase tracking-wider mb-1">Duration</p>
                        <p className="text-sm font-medium text-[#0F172A]">{service.duration}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE & CONTACT DUAL SECTION */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-12 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
        {gallery && gallery.length > 3 && (
           <div className="absolute top-20 left-4 lg:left-12 w-32 lg:w-48 transform -rotate-6 hover:rotate-0 transition-transform duration-500 hidden xl:block z-0 opacity-40 hover:opacity-100">
              <div className="p-2 bg-white rounded-xl shadow-lg border border-slate-100">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <img src={gallery[3].url} alt="Contact Snapshot" className="w-full h-full object-cover" />
                </div>
              </div>
           </div>
        )}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
          
          {/* Schedule */}
          {hourEntries.length > 0 && (
            <div>
              <h3 className="tutor-serif text-3xl font-semibold mb-8 text-[#0F172A]">
                Availability
              </h3>
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm">
                <ul className="space-y-4">
                  {hourEntries.map(([day, hours]) => (
                    <li key={day} className="flex justify-between items-center py-2 border-b border-[#F1F5F9] last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-[#475569] capitalize">{day}</span>
                      {hours?.toLowerCase() === 'closed' ? (
                        <span className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">Closed</span>
                      ) : (
                        <span className="text-sm font-semibold text-[#0F172A]">{hours}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Contact */}
          <div>
            <h3 className="tutor-serif text-3xl font-semibold mb-8 text-[#0F172A]">
              Get in Touch
            </h3>
            <div className="space-y-6">
              {contact?.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-lg font-medium text-[#0F172A]">{contact.phone}</p>
                    <button onClick={() => handleContactClick('phone')} className="text-sm tutor-accent font-medium mt-1 hover:underline">Call directly</button>
                  </div>
                </div>
              )}

              {contact?.email && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Email</p>
                    <p className="text-lg font-medium text-[#0F172A]">{contact.email}</p>
                    <button onClick={() => handleContactClick('email')} className="text-sm tutor-accent font-medium mt-1 hover:underline">Send email</button>
                  </div>
                </div>
              )}

              {contact?.address && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Location</p>
                    <p className="text-lg font-medium text-[#0F172A]">{contact.address}</p>
                    <button 
                      onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(contact.address || '')}`, '_blank')} 
                      className="text-sm tutor-accent font-medium mt-1 hover:underline"
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              )}
            </div>

            {contact?.socialLinks && (Object.values(contact.socialLinks).some(Boolean)) && (
              <div className="mt-10 pt-8 border-t border-[#E2E8F0]">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-4">Connect Online</p>
                <div className="flex gap-4">
                  {contact.socialLinks.linkedin && (
                    <button onClick={() => handleSocialClick('linkedin')} className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors">
                      In
                    </button>
                  )}
                  {contact.socialLinks.facebook && (
                    <button onClick={() => handleSocialClick('facebook')} className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors">
                      Fb
                    </button>
                  )}
                  {contact.socialLinks.instagram && (
                    <button onClick={() => handleSocialClick('instagram')} className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#475569] hover:text-[#2563EB] hover:border-[#2563EB] transition-colors">
                      Ig
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 sm:px-8 lg:px-12 bg-white border-t border-[#E2E8F0] text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="tutor-serif text-lg font-semibold text-[#0F172A]">{businessName}</h2>
            {tagline && <p className="text-xs text-[#64748B] mt-1">{tagline}</p>}
          </div>
          <p className="text-sm text-[#94A3B8]">
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
