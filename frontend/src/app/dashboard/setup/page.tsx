'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GalleryManager from '@/components/dashboard/GalleryManager';
import { useBusiness } from '@/hooks/useBusiness';
import { useAuth } from '@/hooks/useAuth';

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
    // Social links
    socialInstagram: '',
    socialFacebook: '',
    socialLinkedin: '',
    // Operating hours
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

  useEffect(() => {
    fetchMyBusiness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!business) {
      if (user?.username) {
        setFormData((prev) => ({ ...prev, username: prev.username || user.username }));
      }
      return;
    }

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
  }, [business]);

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
      // Update existing business
      result = await updateBusiness(businessData);
    } else {
      // Create new business
      result = await submitIntake(businessData);
    }

    if (!('error' in result)) {
      setSaved(true);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold tracking-tight text-white">Business Setup</h1>
      <p className="mt-2 text-gray-400">
        Submit your details now. We will use this data to generate your landing page and subdomain.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
        {saved && <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">Business data saved successfully.</p>}
        {hasSubmittedSite && (
          <p className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-sm text-indigo-200">
            You can update your business information below.
          </p>
        )}

        <Input
          label="Subdomain username"
          placeholder="e.g. priya-salon"
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value.toLowerCase().trim())}
          disabled={!allowUsernameChange || hasSubmittedSite}
          className={!allowUsernameChange ? 'bg-white/10 text-gray-400' : ''}
          hint={!allowUsernameChange ? "Using your account username by default. Enable change to edit." : undefined}
          required
        />
        {!hasSubmittedSite && (
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={allowUsernameChange}
              onChange={(e) => setAllowUsernameChange(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
            />
            Change username
          </label>
        )}

        <Input
          label="Business name"
          placeholder="Priya Beauty Studio"
          value={formData.businessName}
          onChange={(e) => handleChange('businessName', e.target.value)}
          disabled={false}
          required
        />

        <Select
          label="Business type"
          value={formData.businessType}
          onChange={(e) => handleChange('businessType', e.target.value)}
          options={businessTypes}
          disabled={false}
          required
        />

        <Input
          label="Tagline"
          placeholder="Glow with confidence"
          value={formData.tagline}
          onChange={(e) => handleChange('tagline', e.target.value)}
          disabled={false}
        />

        <Textarea
          label="Description"
          placeholder="Tell us about your business"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          disabled={false}
        />

        <Input
          label="Contact phone"
          placeholder="+91..."
          value={formData.contactPhone}
          onChange={(e) => handleChange('contactPhone', e.target.value)}
          disabled={false}
        />

        <Input
          label="Contact email"
          placeholder="business@example.com"
          value={formData.contactEmail}
          onChange={(e) => handleChange('contactEmail', e.target.value)}
          disabled={false}
        />

        <Input
          label="Address"
          placeholder="Street, City"
          value={formData.contactAddress}
          onChange={(e) => handleChange('contactAddress', e.target.value)}
          disabled={false}
        />

        <Input
          label="WhatsApp"
          placeholder="+91..."
          value={formData.contactWhatsapp}
          onChange={(e) => handleChange('contactWhatsapp', e.target.value)}
          disabled={sameAsPhone}
        />
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={sameAsPhone}
            disabled={false}
            onChange={(e) => {
              const checked = e.target.checked;
              setSameAsPhone(checked);
              if (checked) {
                setFormData((prev) => ({
                  ...prev,
                  contactWhatsapp: prev.contactPhone,
                }));
              }
            }}
            className="h-4 w-4 rounded border-white/20 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
          />
          WhatsApp same as phone number
        </label>

        {/* Social Links Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Social Media Links</h3>
          <p className="text-sm text-gray-400">Add your social media profiles (optional)</p>
          
          <Input
            label="Instagram"
            placeholder="https://instagram.com/yourbusiness"
            value={formData.socialInstagram}
            onChange={(e) => handleChange('socialInstagram', e.target.value)}
            disabled={false}
          />

          <Input
            label="Facebook"
            placeholder="https://facebook.com/yourbusiness"
            value={formData.socialFacebook}
            onChange={(e) => handleChange('socialFacebook', e.target.value)}
            disabled={false}
          />

          <Input
            label="LinkedIn"
            placeholder="https://linkedin.com/company/yourbusiness"
            value={formData.socialLinkedin}
            onChange={(e) => handleChange('socialLinkedin', e.target.value)}
            disabled={false}
          />
        </div>

        {/* Services Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Services</h3>
              <p className="text-sm text-gray-400">Add the services you offer</p>
            </div>
            {true && (
              <Button
                type="button"
                onClick={addService}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Add Service
              </Button>
            )}
          </div>

          {services.map((service, index) => (
            <Card key={index} className="p-4 space-y-3 bg-white/5 border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">Service {index + 1}</h4>
                {true && services.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeService(index)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-xs px-2 py-1"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="Service Name"
                  placeholder="e.g. Hair Cut"
                  value={service.name}
                  onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                  disabled={false}
                />

                <Input
                  label="Price"
                  placeholder="e.g. ₹500"
                  value={service.price}
                  onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                  disabled={false}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="Duration"
                  placeholder="e.g. 30 mins"
                  value={service.duration}
                  onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                  disabled={false}
                />
              </div>

              <Textarea
                label="Description"
                placeholder="Brief description of the service"
                value={service.description}
                onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                disabled={false}
              />
            </Card>
          ))}
        </div>

        {/* Operating Hours Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Operating Hours</h3>
          <p className="text-sm text-gray-400">Set your business hours (optional)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {daysOfWeek.map((day) => (
              <Input
                key={day.key}
                label={day.label}
                placeholder="e.g. 9:00 AM - 6:00 PM or Closed"
                value={formData.operatingHours[day.key as keyof typeof formData.operatingHours]}
                onChange={(e) => handleOperatingHoursChange(day.key, e.target.value)}
                disabled={false}
              />
            ))}
          </div>
        </div>

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
    </div>
  );
}
