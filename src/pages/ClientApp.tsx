import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useClientAuthStore } from '../store/useClientAuthStore';

// Importar componentes directamente desde sus archivos
import HomePage from '../components/home/HomePage';
import ProfilePage from '../components/profile/ProfilePage';
import ClientServiceHistoryPage from './ClientServiceHistoryPage';
import ClientAppointmentsPage from './ClientAppointmentsPage';
import ClientServicesPage from './ClientServicesPage';
import ClientDashboardPage from './ClientDashboardPage';

const ClientApp: React.FC = () => {
  const { customer, logout } = useClientAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Si no hay customer, mostrar loading
  if (!customer) {
    return (
      <div className="min-h-screen bg-[#ECF0F1] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mx-auto mb-4"></div>
          <p className="text-[#2C3E50]">Cargando...</p>
        </div>
      </div>
    );
  }

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/cliente':
        return 'Inicio';
      case '/cliente/servicios':
        return 'Servicios';
      case '/cliente/citas':
        return 'Mis Citas';
      case '/cliente/historial':
        return 'Historial';
      case '/cliente/perfil':
        return 'Perfil';
      default:
        return 'Cliente';
    }
  };

  const getPageIcon = () => {
    switch (location.pathname) {
      case '/cliente':
        return '🏠';
      case '/cliente/servicios':
        return '🔧';
      case '/cliente/citas':
        return '📅';
      case '/cliente/historial':
        return '📋';
      case '/cliente/perfil':
        return '👤';
      default:
        return '🏠';
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF0F1]">
      {/* Header de navegación */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/cliente')}
              className="text-2xl hover:scale-110 transition-transform"
            >
              {getPageIcon()}
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#2C3E50]">{getPageTitle()}</h1>
              <p className="text-sm text-[#34495E]">Taller Mecánico - Cliente</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/cliente')}
              className="px-3 py-2 bg-[#ECF0F1] text-[#2C3E50] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Menú
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="pb-20">
        <Routes>
          <Route path="/" element={<ClientDashboardPage customer={customer} />} />
          <Route path="/servicios" element={<ClientServicesPage customer={customer} />} />
          <Route path="/citas" element={<ClientAppointmentsPage customer={customer} />} />
          <Route path="/historial" element={<ClientServiceHistoryPage customer={customer} />} />
          <Route path="/perfil" element={<ProfilePage customer={customer} />} />
        </Routes>
      </main>

      {/* Navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button
            onClick={() => navigate('/cliente')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              location.pathname === '/cliente' 
                ? 'text-[#FF6B35] bg-[#FF6B35] bg-opacity-10' 
                : 'text-[#34495E] hover:text-[#FF6B35]'
            }`}
          >
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs">Inicio</span>
          </button>
          
          <button
            onClick={() => navigate('/cliente/servicios')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              location.pathname === '/cliente/servicios' 
                ? 'text-[#FF6B35] bg-[#FF6B35] bg-opacity-10' 
                : 'text-[#34495E] hover:text-[#FF6B35]'
            }`}
          >
            <span className="text-xl mb-1">🔧</span>
            <span className="text-xs">Servicios</span>
          </button>
          
          <button
            onClick={() => navigate('/cliente/citas')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              location.pathname === '/cliente/citas' 
                ? 'text-[#FF6B35] bg-[#FF6B35] bg-opacity-10' 
                : 'text-[#34495E] hover:text-[#FF6B35]'
            }`}
          >
            <span className="text-xl mb-1">📅</span>
            <span className="text-xs">Citas</span>
          </button>
          
          <button
            onClick={() => navigate('/cliente/historial')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              location.pathname === '/cliente/historial' 
                ? 'text-[#FF6B35] bg-[#FF6B35] bg-opacity-10' 
                : 'text-[#34495E] hover:text-[#FF6B35]'
            }`}
          >
            <span className="text-xl mb-1">📋</span>
            <span className="text-xs">Historial</span>
          </button>
          
          <button
            onClick={() => navigate('/cliente/perfil')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              location.pathname === '/cliente/perfil' 
                ? 'text-[#FF6B35] bg-[#FF6B35] bg-opacity-10' 
                : 'text-[#34495E] hover:text-[#FF6B35]'
            }`}
          >
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ClientApp;
