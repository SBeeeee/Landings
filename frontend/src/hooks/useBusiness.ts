import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import {
  submitBusinessIntakeThunk,
  getMyBusinessThunk,
} from '../store/thunks/business.thunks';
import type { BusinessIntakeInput } from '../services/business.service';
import { clearBusinessError } from '../store/slices/businessSlice';

export const useBusiness = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { business, loading, error, initialized } = useSelector(
    (s: RootState) => s.business
  );

  return {
    business,
    loading,
    error,
    initialized,
    submitIntake: (data: BusinessIntakeInput) =>
      dispatch(submitBusinessIntakeThunk(data)),
    fetchMyBusiness: () => dispatch(getMyBusinessThunk()),
    clearError: () => dispatch(clearBusinessError()),
  };
};
