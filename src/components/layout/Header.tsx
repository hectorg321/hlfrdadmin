import { useState } from 'react';
import { 
  Bars3Icon, 
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { AdminUser } from '@/types';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  user: AdminUser | null;
  onLogout: () => void;
}

const Header = ({ onMenuClick, user, onLogout }: HeaderProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-300 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Botón de menú móvil */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-primary-500 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Abrir sidebar</span>
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Separador */}
      <div className="h-6 w-px bg-gray-300 lg:hidden" />

      {/* Título de la página */}
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-primary-500">
            Panel Administrativo
          </h1>
        </div>
      </div>

      {/* Acciones del header */}
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        {/* Enlace al cliente */}
        <Link
          to="/cliente"
          className="-m-2.5 p-2.5 text-[#2C3E50] hover:text-[#FF6B35] flex items-center gap-2"
        >
          <UserIcon className="h-6 w-6" />
          <span className="hidden lg:block text-sm">Cliente</span>
        </Link>
        
        {/* Enlace al login del cliente */}
        <Link
          to="/cliente/login"
          className="-m-2.5 p-2.5 text-[#2C3E50] hover:text-[#FF6B35] flex items-center space-x-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span className="hidden lg:block text-sm">Login Cliente</span>
        </Link>

        {/* Notificaciones */}
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-500 hover:text-accent-500"
        >
          <span className="sr-only">Ver notificaciones</span>
          <BellIcon className="h-6 w-6" />
        </button>

        {/* Separador */}
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-300" />

        {/* Menú de usuario */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-x-4 text-sm font-medium text-primary-500 hover:text-primary-600"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <UserCircleIcon className="h-8 w-8 text-gray-500" />
            <span className="hidden lg:block">
              {user?.firstName} {user?.lastName}
            </span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>

          {/* Dropdown del usuario */}
          {userMenuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <button
                onClick={onLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 