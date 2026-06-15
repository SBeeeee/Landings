import { createAsyncThunk } from '@reduxjs/toolkit';
import businessService from '../../services/business.service';
import type { Business, BusinessIntakeInput, GalleryImage } from '../../services/business.service';

export const submitBusinessIntakeThunk = createAsyncThunk<
  Business,
  BusinessIntakeInput
>('business/submitIntake', async (data, { rejectWithValue }) => {
  try {
    return await businessService.submitIntake(data);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getMyBusinessThunk = createAsyncThunk<Business, void>(
  'business/getMyBusiness',
  async (_, { rejectWithValue }) => {
    try {
      return await businessService.getMyBusiness();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBusinessThunk = createAsyncThunk<
  Business,
  Partial<BusinessIntakeInput>
>('business/updateBusiness', async (data, { rejectWithValue }) => {
  try {
    return await businessService.updateBusiness(data);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getPublicBusinessThunk = createAsyncThunk<
  Business,
  string
>('business/getPublicBusiness', async (username, { rejectWithValue }) => {
  try {
    return await businessService.getPublicBusiness(username);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const uploadGalleryImageThunk = createAsyncThunk<
  GalleryImage,
  File
>('business/uploadGalleryImage', async (file, { rejectWithValue }) => {
  try {
    return await businessService.uploadGalleryImage(file);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteGalleryImageThunk = createAsyncThunk<
  string,
  string
>('business/deleteGalleryImage', async (publicId, { rejectWithValue }) => {
  try {
    await businessService.deleteGalleryImage(publicId);
    return publicId;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
