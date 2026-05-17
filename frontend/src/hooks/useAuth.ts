import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import {
  loginThunk,
  registerThunk,
  logoutThunk,
  getMeThunk,
} from '../store/thunks/auth.thunks';
import type { LoginInput, RegisterInput } from '../services/auth.service';
import { clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, initialized } = useSelector(
    (s: RootState) => s.auth
  );

  return {
    // state
    user,
    loading,
    error,
    initialized,
    isLoggedIn: !!user,

    // actions — components call these, never dispatch directly
    login: (data: LoginInput) => dispatch(loginThunk(data)),
    register: (data: RegisterInput) => dispatch(registerThunk(data)),
    logout: () => dispatch(logoutThunk()),
    restoreSession: () => dispatch(getMeThunk()),
    clearError: () => dispatch(clearError()),
  };
};
