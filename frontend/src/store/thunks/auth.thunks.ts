import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';
import type { User } from '../../services/auth.service';

export const registerThunk = createAsyncThunk<User, { username: string; email: string; password: string }>(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const user = await authService.register(data);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk<User, { username: string; password: string }>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const user = await authService.login(data);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMeThunk = createAsyncThunk<User, void>(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getMe();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
