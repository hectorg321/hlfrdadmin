import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRequireAuth } from '../../hooks/useClientAuth';

interface ClientProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ClientProtectedRoute: React.FC<ClientProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/cliente/login' 
}) => {
  const { isLoggedIn, isLoading } = useRequireAuth(redirectTo);
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ECF0F1] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mx-auto mb-4"></div>
          <p className="text-[#2C3E50]">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, el hook ya se encargó de la redirección
  if (!isLoggedIn) {
    return null;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
};

export default ClientProtectedRoute;
