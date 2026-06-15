import { createSlice } from '@reduxjs/toolkit';
import type { Business, GalleryImage } from '../../services/business.service';
import {
  submitBusinessIntakeThunk,
  getMyBusinessThunk,
  updateBusinessThunk,
  getPublicBusinessThunk,
  uploadGalleryImageThunk,
  deleteGalleryImageThunk,
  publishBusinessThunk,
} from '../thunks/business.thunks';

interface BusinessState {
  business: Business | null;
  publicBusiness: Business | null;
  loading: boolean;
  publicLoading: boolean;
  error: string | null;
  publicError: string | null;
  initialized: boolean;
  uploading: boolean;
  uploadError: string | null;
}

const initialState: BusinessState = {
  business: null,
  publicBusiness: null,
  loading: false,
  publicLoading: false,
  error: null,
  publicError: null,
  initialized: false,
  uploading: false,
  uploadError: null,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    clearBusinessError(state) {
      state.error = null;
      state.uploadError = null;
    },
    clearPublicBusinessError(state) {
      state.publicError = null;
    },
    clearPublicBusiness(state) {
      state.publicBusiness = null;
      state.publicError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBusinessIntakeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBusinessIntakeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.business = action.payload;
        state.initialized = true;
      })
      .addCase(submitBusinessIntakeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to save business data';
      })
      .addCase(getMyBusinessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBusinessThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.business = action.payload;
        state.initialized = true;
      })
      .addCase(getMyBusinessThunk.rejected, (state, action) => {
        state.loading = false;
        state.business = null;
        state.initialized = true;
        state.error = (action.payload as string) ?? 'No business data found';
      })
      .addCase(updateBusinessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBusinessThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.business = action.payload;
      })
      .addCase(updateBusinessThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to update business data';
      })
      .addCase(publishBusinessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishBusinessThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.business = action.payload;
      })
      .addCase(publishBusinessThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to publish business';
      })
      .addCase(getPublicBusinessThunk.pending, (state) => {
        state.publicLoading = true;
        state.publicError = null;
      })
      .addCase(getPublicBusinessThunk.fulfilled, (state, action) => {
        state.publicLoading = false;
        state.publicBusiness = action.payload;
      })
      .addCase(getPublicBusinessThunk.rejected, (state, action) => {
        state.publicLoading = false;
        state.publicBusiness = null;
        state.publicError = (action.payload as string) ?? 'Business not found';
      })
      .addCase(uploadGalleryImageThunk.pending, (state) => {
        state.uploading = true;
        state.uploadError = null;
      })
      .addCase(uploadGalleryImageThunk.fulfilled, (state, action) => {
        state.uploading = false;
        if (state.business) {
          state.business.gallery = [...(state.business.gallery ?? []), action.payload];
        }
      })
      .addCase(uploadGalleryImageThunk.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = (action.payload as string) ?? 'Failed to upload image';
      })
      .addCase(deleteGalleryImageThunk.pending, (state) => {
        state.uploading = true;
        state.uploadError = null;
      })
      .addCase(deleteGalleryImageThunk.fulfilled, (state, action) => {
        state.uploading = false;
        if (state.business?.gallery) {
          state.business.gallery = state.business.gallery.filter(
            (img: GalleryImage) => img.publicId !== action.payload
          );
        }
      })
      .addCase(deleteGalleryImageThunk.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = (action.payload as string) ?? 'Failed to delete image';
      });
  },
});

export const { clearBusinessError, clearPublicBusinessError, clearPublicBusiness } = businessSlice.actions;
export default businessSlice.reducer;
