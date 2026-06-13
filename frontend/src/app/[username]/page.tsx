'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useBusiness } from '@/hooks/useBusiness';
import SalonTemplate from '@/components/templates/SalonTemplate';
import TutorTemplate from '@/components/templates/TutorTemplate';
import LoadingSpinner from '@/components/ui/Spinner';

export default function PublicBusinessPage() {
  const params = useParams();
  const username = params.username as string;
  
  const { 
    publicBusiness, 
    publicLoading, 
    publicError, 
    fetchPublicBusiness, 
    clearPublicBusiness 
  } = useBusiness();

  useEffect(() => {
    if (username) {
      fetchPublicBusiness(username);
    }
    
    // Cleanup when component unmounts or username changes
    return () => {
      clearPublicBusiness();
    };
  }, [username, fetchPublicBusiness, clearPublicBusiness]);

  if (publicLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (publicError || !publicBusiness) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Business Not Found</h1>
          <p className="text-gray-400 mb-8">
            {publicError || 'The business page you are looking for does not exist or is not published.'}
          </p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  // Render template based on business type
  if (publicBusiness.businessType === 'salon') {
    return <SalonTemplate business={publicBusiness} />;
  }

  if (publicBusiness.businessType === 'tutor') {
    return <TutorTemplate business={publicBusiness} />;
  }

  // Fallback for other business types (will be implemented later)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-gray-400 mb-8">
          Template for {publicBusiness.businessType} businesses is coming soon!
        </p>
        <div className="bg-white/10 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-white mb-2">{publicBusiness.businessName}</h2>
          {publicBusiness.tagline && (
            <p className="text-gray-300 mb-4">{publicBusiness.tagline}</p>
          )}
          {publicBusiness.contact?.phone && (
            <a 
              href={`tel:${publicBusiness.contact.phone}`}
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Call {publicBusiness.contact.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}