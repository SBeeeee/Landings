import { createSlice } from '@reduxjs/toolkit';
import type { Business } from '../../services/business.service';
import {
  submitBusinessIntakeThunk,
  getMyBusinessThunk,
} from '../thunks/business.thunks';

interface BusinessState {
  business: Business | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: BusinessState = {
  business: null,
  loading: false,
  error: null,
  initialized: false,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    clearBusinessError(state) {
      state.error = null;
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
      });
  },
});

export const { clearBusinessError } = businessSlice.actions;
export default businessSlice.reducer;
