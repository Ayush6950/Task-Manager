import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout } from '../Store/slices/authSlice.jsx';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector(
    (state) => state.auth
  );
  const isAuthenticated = !!token;

  const handleLogin = (email, password) => {
    return dispatch(login({ email, password }));
  };

  const handleRegister = (name, email, password) => {
    return dispatch(register({ name, email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};