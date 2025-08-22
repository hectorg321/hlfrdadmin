import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientAuthStore } from '../store/useClientAuthStore';

export const useClientAuth = (redirectTo?: string) => {
  const { isAuthenticated, isLoading, customer } = useClientAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  return {
    isAuthenticated,
    isLoading,
    customer,
    isLoggedIn: isAuthenticated && !!customer
  };
};

export const useRequireAuth = (redirectTo: string = '/cliente/login') => {
  const { isAuthenticated, isLoading, customer } = useClientAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  return {
    isAuthenticated,
    isLoading,
    customer,
    isLoggedIn: isAuthenticated && !!customer
  };
};

export const useRedirectIfAuthenticated = (redirectTo: string = '/cliente') => {
  const { isAuthenticated, isLoading } = useClientAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  return {
    isAuthenticated,
    isLoading
  };
};
