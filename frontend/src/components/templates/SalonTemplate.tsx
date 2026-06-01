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
    operatingHours 
  } = business;

  const handleContactClick = (type: 'phone' | 'whatsapp' | 'email') => {
    switch (type) {
      case 'phone':
        if (contact?.phone) window.open(`tel:${contact.phone}`);
        break;
      case 'whatsapp':
        if (contact?.whatsapp) window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`);
        break;
      case 'email':
        if (contact?.email) window.open(`mailto:${contact.email}`);
        break;
    }
  };

  const handleSocialClick = (platform: 'instagram' | 'facebook' | 'linkedin') => {
    const url = contact?.socialLinks?.[platform];
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header/Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{businessName}</h1>
            {tagline && <p className="text-sm text-pink-600">{tagline}</p>}
          </div>
          <div className="flex gap-3">
            {contact?.phone && (
              <Button 
                onClick={() => handleContactClick('phone')}
                className="bg-pink-600 hover:bg-pink-700"
              >
                Call Now
              </Button>
            )}
            {contact?.whatsapp && (
              <Button 
                onClick={() => handleContactClick('whatsapp')}
                className="bg-green-600 hover:bg-green-700"
              >
                WhatsApp
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Welcome to {businessName}
          </h2>
          {tagline && (
            <p className="text-xl text-pink-600 mb-8 font-medium">{tagline}</p>
          )}
          {description && (
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {contact?.phone && (
              <Button 
                size="lg"
                onClick={() => handleContactClick('phone')}
                className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-4"
              >
                📞 Book Appointment
              </Button>
            )}
            {contact?.whatsapp && (
              <Button 
                size="lg"
                onClick={() => handleContactClick('whatsapp')}
                className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
              >
                💬 Chat on WhatsApp
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="p-6 bg-white border-pink-100 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.name}
                    </h4>
                    {service.description && (
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      {service.price && (
                        <span className="text-pink-600 font-semibold text-lg">
                          {service.price}
                        </span>
                      )}
                      {service.duration && (
                        <span className="text-gray-500">
                          ⏱️ {service.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Operating Hours Section */}
      {operatingHours && Object.values(operatingHours).some(hour => hour) && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Opening Hours
            </h3>
            <Card className="p-8 bg-white border-pink-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(operatingHours).map(([day, hours]) => {
                  if (!hours) return null;
                  return (
                    <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-900 capitalize">
                        {day}
                      </span>
                      <span className="text-pink-600 font-medium">
                        {hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-8">
            Get In Touch
          </h3>
          <p className="text-pink-100 mb-12 text-lg">
            Ready to look and feel your best? Contact us today!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contact?.phone && (
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Call Us</h4>
                <p className="text-pink-100">{contact.phone}</p>
                <Button 
                  onClick={() => handleContactClick('phone')}
                  className="mt-3 bg-white text-pink-600 hover:bg-pink-50"
                >
                  Call Now
                </Button>
              </div>
            )}
            
            {contact?.email && (
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✉️</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Email Us</h4>
                <p className="text-pink-100">{contact.email}</p>
                <Button 
                  onClick={() => handleContactClick('email')}
                  className="mt-3 bg-white text-pink-600 hover:bg-pink-50"
                >
                  Send Email
                </Button>
              </div>
            )}
            
            {contact?.address && (
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Visit Us</h4>
                <p className="text-pink-100">{contact.address}</p>
                <Button 
                  onClick={() => contact.address && window.open(`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`, '_blank')}
                  className="mt-3 bg-white text-pink-600 hover:bg-pink-50"
                >
                  Get Directions
                </Button>
              </div>
            )}
          </div>

          {/* Social Links */}
          {contact?.socialLinks && (
            <div className="flex justify-center gap-4">
              {contact.socialLinks.instagram && (
                <Button
                  onClick={() => handleSocialClick('instagram')}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  📷 Instagram
                </Button>
              )}
              {contact.socialLinks.facebook && (
                <Button
                  onClick={() => handleSocialClick('facebook')}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  📘 Facebook
                </Button>
              )}
              {contact.socialLinks.linkedin && (
                <Button
                  onClick={() => handleSocialClick('linkedin')}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  💼 LinkedIn
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-2xl font-bold mb-2">{businessName}</h4>
          {tagline && <p className="text-gray-400 mb-4">{tagline}</p>}
          <p className="text-gray-500 text-sm">
            © 2024 {businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}