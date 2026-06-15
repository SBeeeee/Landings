'use client';

import { useEffect, useState, useRef } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GalleryManager from '@/components/dashboard/GalleryManager';
import { useBusiness } from '@/hooks/useBusiness';
import { useAuth } from '@/hooks/useAuth';
import SalonTemplate from '@/components/templates/SalonTemplate';
import TutorTemplate from '@/components/templates/TutorTemplate';
import GymTemplate from '@/components/templates/GymTemplate';
import RestaurantTemplate from '@/components/templates/RestaurantTemplate';
import { Business } from '@/services/business.service';

const businessTypes = [
  { value: 'salon', label: 'Salon' },
  { value: 'tutor', label: 'Tutor' },
  { value: 'boutique', label: 'Boutique' },
  { value: 'gym', label: 'Gym' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'other', label: 'Other' },
];

const daysOfWeek = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

interface Service {
  name: string;
  description: string;
  price: string;
  duration: string;
}

export default function BusinessSetupPage() {
  const { user } = useAuth();
  const { submitIntake, updateBusiness, loading, error, clearError, business, fetchMyBusiness } =
    useBusiness();
  const [saved, setSaved] = useState(false);
  const [allowUsernameChange, setAllowUsernameChange] = useState(false);
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'services' | 'hours'>('basic');

  const [formData, setFormData] = useState({
    username: user?.username || '',
    businessName: '',
    businessType: 'salon',
    tagline: '',
    description: '',
    contactPhone: '',
    contactEmail: '',
    contactAddress: '',
    contactWhatsapp: '',
    socialInstagram: '',
    socialFacebook: '',
    socialLinkedin: '',
    operatingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
  });

  const [services, setServices] = useState<Service[]>([
    { name: '', description: '', price: '', duration: '' }
  ]);

  const initRef = useRef(false);

  useEffect(() => {
    fetchMyBusiness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!business) {
      if (user?.username && formData.username !== user.username) {
        setFormData((prev) => ({ ...prev, username: user.username }));
      }
      return;
    }

    if (initRef.current) return;

    setFormData((prev) => ({
      ...prev,
      username: business.username || prev.username,
      businessName: business.businessName || prev.businessName,
      businessType: business.businessType || prev.businessType,
      tagline: business.tagline || '',
      description: business.description || '',
      contactPhone: business.contact?.phone || '',
      contactEmail: business.contact?.email || '',
      contactAddress: business.contact?.address || '',
      contactWhatsapp: business.contact?.whatsapp || '',
      socialInstagram: business.contact?.socialLinks?.instagram || '',
      socialFacebook: business.contact?.socialLinks?.facebook || '',
      socialLinkedin: business.contact?.socialLinks?.linkedin || '',
      operatingHours: {
        monday: business.operatingHours?.monday || '',
        tuesday: business.operatingHours?.tuesday || '',
        wednesday: business.operatingHours?.wednesday || '',
        thursday: business.operatingHours?.thursday || '',
        friday: business.operatingHours?.friday || '',
        saturday: business.operatingHours?.saturday || '',
        sunday: business.operatingHours?.sunday || '',
      },
    }));

    if (business.services && business.services.length > 0) {
      setServices(business.services.map(service => ({
        name: service.name || '',
        description: service.description || '',
        price: service.price || '',
        duration: service.duration || '',
      })));
    }

    setSaved(true);
    setSameAsPhone(
      !!business.contact?.phone &&
        business.contact?.phone === business.contact?.whatsapp
    );
    initRef.current = true;
  }, [business, user?.username, formData.username]);

  const handleChange = (
    key: keyof typeof formData,
    value: string
  ) => {
    setSaved(false);
    setFormData((prev) => {
      const updated = { ...prev, [key]: value };
      if (sameAsPhone && key === 'contactPhone') {
        updated.contactWhatsapp = value;
      }
      return updated;
    });
  };

  const handleOperatingHoursChange = (day: string, value: string) => {
    setSaved(false);
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: value,
      },
    }));
  };

  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
    setSaved(false);
    setServices((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addService = () => {
    setServices((prev) => [...prev, { name: '', description: '', price: '', duration: '' }]);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices((prev) => prev.filter((_, i) => i !== index));
      setSaved(false);
    }
  };

  const hasSubmittedSite = !!business?._id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    const businessData = {
      username: formData.username,
      businessName: formData.businessName,
      businessType: formData.businessType as
        | 'salon'
        | 'tutor'
        | 'boutique'
        | 'gym'
        | 'restaurant'
        | 'other',
      tagline: formData.tagline,
      description: formData.description,
      services: services.filter(service => service.name.trim() !== ''),
      contact: {
        phone: formData.contactPhone,
        email: formData.contactEmail,
        address: formData.contactAddress,
        whatsapp: formData.contactWhatsapp,
        socialLinks: {
          instagram: formData.socialInstagram,
          facebook: formData.socialFacebook,
          linkedin: formData.socialLinkedin,
        },
      },
      operatingHours: formData.operatingHours,
    };

    let result;
    if (hasSubmittedSite) {
      result = await updateBusiness(businessData);
    } else {
      result = await submitIntake(businessData);
    }

    if (!('error' in result)) {
      setSaved(true);
    }
  };

  const previewBusinessData: Business = {
    _id: business?._id || 'preview-id',
    userId: user?._id || 'preview-user-id',
    username: formData.username || 'preview',
    businessName: formData.businessName || 'Your Business Name',
    businessType: formData.businessType as 'salon' | 'tutor',
    tagline: formData.tagline || 'Your tagline here',
    description: formData.description || 'Business description goes here.',
    services: services.filter(s => s.name.trim() !== ''),
    contact: {
      phone: formData.contactPhone,
      email: formData.contactEmail,
      address: formData.contactAddress,
      whatsapp: formData.contactWhatsapp,
      socialLinks: {
        instagram: formData.socialInstagram,
        facebook: formData.socialFacebook,
        linkedin: formData.socialLinkedin,
      },
    },
    operatingHours: formData.operatingHours,
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'contact', label: 'Contact & Social' },
    { id: 'services', label: 'Services' },
    { id: 'hours', label: 'Operating Hours' },
  ];

  return (
    <div className="mx-auto max-w-4xl relative pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Business Setup</h1>
          <p className="mt-2 text-gray-400">
            Customize your details below to instantly generate your landing page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            type="button" 
            variant="outline" 
            className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
            onClick={() => setShowPreview(true)}
          >
            Preview Site
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0F1115] overflow-hidden shadow-xl">
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-white/10 bg-white/5 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-indigo-500 text-indigo-400 bg-indigo-500/10'
                  : 'border-b-2 border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
          {saved && <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">Business data saved successfully.</p>}

          {/* BASIC INFO TAB */}
          <div className={activeTab === 'basic' ? 'block space-y-6' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  label="Subdomain username"
                  placeholder="e.g. priya-salon"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value.toLowerCase().trim())}
                  disabled={!allowUsernameChange || hasSubmittedSite}
                  className={(!allowUsernameChange || hasSubmittedSite) ? 'bg-white/5 text-gray-400 cursor-not-allowed' : ''}
                  required
                />
                {!hasSubmittedSite && (
                  <label className="flex items-center gap-2 text-sm text-gray-300 mt-2">
                    <input
                      type="checkbox"
                      checked={allowUsernameChange}
                      onChange={(e) => setAllowUsernameChange(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
                    />
                    Change username
                  </label>
                )}
              </div>

              <Select
                label="Business type"
                value={formData.businessType}
                onChange={(e) => handleChange('businessType', e.target.value)}
                options={businessTypes}
                required
              />
            </div>

            <Input
              label="Business name"
              placeholder="e.g. Priya Beauty Studio"
              value={formData.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              required
            />

            <Input
              label="Tagline"
              placeholder="e.g. Glow with confidence"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
            />

            <Textarea
              label="Description"
              placeholder="Tell us about your business, your mission, and what makes you unique."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="h-32"
            />
          </div>

          {/* CONTACT & SOCIAL TAB */}
          <div className={activeTab === 'contact' ? 'block space-y-8' : 'hidden'}>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  placeholder="+91..."
                  value={formData.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                />
                
                <div className="space-y-2">
                  <Input
                    label="WhatsApp"
                    placeholder="+91..."
                    value={formData.contactWhatsapp}
                    onChange={(e) => handleChange('contactWhatsapp', e.target.value)}
                    disabled={sameAsPhone}
                    className={sameAsPhone ? 'bg-white/5 text-gray-400' : ''}
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      checked={sameAsPhone}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSameAsPhone(checked);
                        if (checked) {
                          setFormData(prev => ({ ...prev, contactWhatsapp: prev.contactPhone }));
                        }
                      }}
                      className="h-4 w-4 rounded border-white/20 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
                    />
                    Same as phone number
                  </label>
                </div>

                <Input
                  label="Email Address"
                  placeholder="business@example.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                />

                <Input
                  label="Physical Address"
                  placeholder="Street, City, State"
                  value={formData.contactAddress}
                  onChange={(e) => handleChange('contactAddress', e.target.value)}
                />
              </div>
            </div>

            <hr className="border-white/10" />

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Social Media (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="Instagram"
                  placeholder="https://instagram.com/..."
                  value={formData.socialInstagram}
                  onChange={(e) => handleChange('socialInstagram', e.target.value)}
                />
                <Input
                  label="Facebook"
                  placeholder="https://facebook.com/..."
                  value={formData.socialFacebook}
                  onChange={(e) => handleChange('socialFacebook', e.target.value)}
                />
                <Input
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.socialLinkedin}
                  onChange={(e) => handleChange('socialLinkedin', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SERVICES TAB */}
          <div className={activeTab === 'services' ? 'block space-y-6' : 'hidden'}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400">List the main services or products you offer.</p>
              <Button type="button" onClick={addService} size="sm" variant="secondary">
                + Add Service
              </Button>
            </div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <Card key={index} className="p-5 md:p-6 bg-white/[0.02] border-white/10 relative group">
                  {services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove service"
                    >
                      Remove
                    </button>
                  )}
                  <h4 className="text-sm font-semibold text-indigo-400 mb-4 uppercase tracking-wider">Service {index + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-4">
                    <div className="md:col-span-6">
                      <Input
                        label="Service Name"
                        placeholder="e.g. Signature Haircut"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Input
                        label="Price"
                        placeholder="e.g. ₹500"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Input
                        label="Duration"
                        placeholder="e.g. 45 mins"
                        value={service.duration}
                        onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Textarea
                    label="Description"
                    placeholder="Briefly describe what this service includes..."
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                    className="h-20"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* HOURS TAB */}
          <div className={activeTab === 'hours' ? 'block space-y-6' : 'hidden'}>
            <p className="text-gray-400 mb-6">Set your standard operating hours. Leave blank or enter "Closed" for days you are not working.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl">
              {daysOfWeek.map((day) => (
                <div key={day.key} className="flex items-center gap-4">
                  <div className="w-28 text-sm font-medium text-gray-300 capitalize">
                    {day.label}
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="e.g. 9:00 AM - 6:00 PM"
                      value={formData.operatingHours[day.key as keyof typeof formData.operatingHours]}
                      onChange={(e) => handleOperatingHoursChange(day.key, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Submit */}
          <div className="pt-8 border-t border-white/10 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {hasSubmittedSite ? 'Make sure to save your changes.' : 'Ready to create your site?'}
            </p>
            <Button type="submit" size="lg" disabled={loading} className="px-8">
              {loading ? 'Saving...' : hasSubmittedSite ? 'Update Data' : 'Save Business Data'}
            </Button>
          </div>
        </form>
      </div>

      {/* Preview Modal Overlay */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col shadow-2xl bg-gray-900 border-x border-white/10 md:my-8 md:h-[calc(100vh-4rem)] md:rounded-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-white/10 backdrop-blur-sm relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-300">Live Preview Mode</span>
              </div>
              <button 
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-sm font-medium text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
              >
                Close Preview
              </button>
            </div>
            
            {/* Modal Content - Scrollable Iframe feel */}
            <div className="flex-1 overflow-y-auto bg-gray-950 relative">
              {formData.businessType === 'salon' ? (
                <SalonTemplate business={previewBusinessData} />
              ) : formData.businessType === 'tutor' ? (
                <TutorTemplate business={previewBusinessData} />
              ) : formData.businessType === 'gym' ? (
                <GymTemplate business={previewBusinessData} />
              ) : formData.businessType === 'restaurant' ? (
                <RestaurantTemplate business={previewBusinessData} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <p className="text-xl mb-2">🚧</p>
                    <p>Preview for {formData.businessType} is not available yet.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
<<<<<<< HEAD

        {/* Gallery Section */}
        {hasSubmittedSite && (
          <div className="space-y-4">
            <GalleryManager />
          </div>
        )}

        <Button type="submit" size="lg" disabled={loading}>
          {loading ? 'Saving...' : hasSubmittedSite ? 'Update Business Data' : 'Save Business Data'}
        </Button>
      </form>
=======
      )}
>>>>>>> 8a7ebd65346305053908bb81fafb18a0d58c1856
    </div>
  );
}
