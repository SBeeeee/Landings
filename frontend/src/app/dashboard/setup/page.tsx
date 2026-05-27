'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
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

export default function BusinessSetupPage() {
  const { user } = useAuth();
  const { submitIntake, loading, error, clearError, business, fetchMyBusiness } =
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
  });

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
    }));
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

  const hasSubmittedSite = !!business?._id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const result = await submitIntake({
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
      contact: {
        phone: formData.contactPhone,
        email: formData.contactEmail,
        address: formData.contactAddress,
        whatsapp: formData.contactWhatsapp,
      },
    });

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
            You have already submitted one site. Only one site per user is allowed.
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
          disabled={hasSubmittedSite}
          required
        />

        <Select
          label="Business type"
          value={formData.businessType}
          onChange={(e) => handleChange('businessType', e.target.value)}
          options={businessTypes}
          disabled={hasSubmittedSite}
          required
        />

        <Input
          label="Tagline"
          placeholder="Glow with confidence"
          value={formData.tagline}
          onChange={(e) => handleChange('tagline', e.target.value)}
          disabled={hasSubmittedSite}
        />

        <Textarea
          label="Description"
          placeholder="Tell us about your business"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          disabled={hasSubmittedSite}
        />

        <Input
          label="Contact phone"
          placeholder="+91..."
          value={formData.contactPhone}
          onChange={(e) => handleChange('contactPhone', e.target.value)}
          disabled={hasSubmittedSite}
        />

        <Input
          label="Contact email"
          placeholder="business@example.com"
          value={formData.contactEmail}
          onChange={(e) => handleChange('contactEmail', e.target.value)}
          disabled={hasSubmittedSite}
        />

        <Input
          label="Address"
          placeholder="Street, City"
          value={formData.contactAddress}
          onChange={(e) => handleChange('contactAddress', e.target.value)}
          disabled={hasSubmittedSite}
        />

        <Input
          label="WhatsApp"
          placeholder="+91..."
          value={formData.contactWhatsapp}
          onChange={(e) => handleChange('contactWhatsapp', e.target.value)}
          disabled={hasSubmittedSite || sameAsPhone}
        />
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={sameAsPhone}
            disabled={hasSubmittedSite}
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

        <Button type="submit" size="lg" disabled={loading || hasSubmittedSite}>
          {loading ? 'Saving...' : 'Save Business Data'}
        </Button>
      </form>
    </div>
  );
}
