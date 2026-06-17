'use client';

import { useRef, useState, useEffect } from 'react';
import { useBusiness } from '@/hooks/useBusiness';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';
import { useSharedToast } from '@/components/ui/Toast';
import type { GalleryImage } from '@/services/business.service';

export default function GalleryManager() {
  const { business, uploading, deleting, uploadError, uploadImage, deleteImage } = useBusiness();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const toast = useSharedToast();

  useEffect(() => {
    if (uploadError) {
      toast.error(uploadError);
    }
  }, [uploadError]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadImage(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const publicId = confirmDelete;
    setConfirmDelete(null);
    setDeletingId(publicId);
    await deleteImage(publicId);
    setDeletingId(null);
  };

  const gallery = business?.gallery ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Gallery</h3>
          <p className="text-sm text-gray-400 mt-1">
            {gallery.length} {gallery.length === 1 ? 'photo' : 'photos'}
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || deleting}
        >
          {gallery.length >= 3 ? 'Limit Reached' : uploading ? 'Uploading...' : deleting ? 'Deleting...' : 'Add Photo'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {gallery.length === 0 && !uploading ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
          <svg
            className="mx-auto h-10 w-10 text-gray-600 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
          <p className="text-sm text-gray-500">
            No photos yet. Add some to showcase your business.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((image: GalleryImage) => (
            <div
              key={image.publicId}
              className="group relative aspect-square rounded-xl overflow-hidden border border-white/8 bg-white/3"
            >
              <img
                src={image.url}
                alt="Gallery"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmDelete(image.publicId)}
                  disabled={deletingId === image.publicId}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {deletingId === image.publicId ? (
                    <Spinner size="sm" />
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          ))}

          {uploading && (
            <div className="aspect-square rounded-xl border border-dashed border-white/10 flex items-center justify-center">
              <Spinner size="md" label="Uploading" />
            </div>
          )}
        </div>
      )}

      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete Image"
        description="Are you sure you want to remove this image from your gallery?"
        size="sm"
      >
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
