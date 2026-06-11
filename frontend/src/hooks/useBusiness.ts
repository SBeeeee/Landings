import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { RootState, AppDispatch } from '../store/store';
import {
  submitBusinessIntakeThunk,
  getMyBusinessThunk,
  updateBusinessThunk,
  getPublicBusinessThunk,
} from '../store/thunks/business.thunks';
import type { BusinessIntakeInput } from '../services/business.service';
import { clearBusinessError, clearPublicBusinessError, clearPublicBusiness } from '../store/slices/businessSlice';

export const useBusiness = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { business, publicBusiness, loading, publicLoading, error, publicError, initialized } = useSelector(
    (s: RootState) => s.business
  );

  const fetchPublicBusiness = useCallback((username: string) => {
    return dispatch(getPublicBusinessThunk(username));
  }, [dispatch]);

  const clearPublicBusinessData = useCallback(() => {
    dispatch(clearPublicBusiness());
  }, [dispatch]);

  return {
    business,
    publicBusiness,
    loading,
    publicLoading,
    error,
    publicError,
    initialized,
    submitIntake: (data: BusinessIntakeInput) =>
      dispatch(submitBusinessIntakeThunk(data)),
    updateBusiness: (data: Partial<BusinessIntakeInput>) =>
      dispatch(updateBusinessThunk(data)),
    fetchMyBusiness: () => dispatch(getMyBusinessThunk()),
    fetchPublicBusiness,
    clearError: () => dispatch(clearBusinessError()),
    clearPublicError: () => dispatch(clearPublicBusinessError()),
    clearPublicBusiness: clearPublicBusinessData,
  };
};
