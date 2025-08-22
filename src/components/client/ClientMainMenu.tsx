import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ClockIcon, 
  WrenchScrewdriverIcon, 
  UserIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface ClientMainMenuProps {
  customer: any;
}

const ClientMainMenu: React.FC<ClientMainMenuProps> = ({ customer }) => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'home',
      name: 'Inicio',
      icon: HomeIcon,
      path: '/cliente',
      description: 'Vista general y dashboard'
    },
    {
      id: 'services',
      name: 'Servicios',
      icon: WrenchScrewdriverIcon,
      path: '/cliente/servicios',
      description: 'Explorar servicios disponibles'
    },
    {
      id: 'appointments',
      name: 'Mis Citas',
      icon: CalendarIcon,
      path: '/cliente/citas',
      description: 'Gestionar citas programadas'
    },
    {
      id: 'history',
      name: 'Historial',
      icon: DocumentTextIcon,
      path: '/cliente/historial',
      description: 'Ver servicios completados'
    },
    {
      id: 'profile',
      name: 'Perfil',
      icon: UserIcon,
      path: '/cliente/perfil',
      description: 'Información personal y vehículos'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/cliente' && location.pathname === '/cliente') return true;
    if (path !== '/cliente' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Header del menú */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-3">
          <UserIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-[#2C3E50]">Menú Principal</h2>
        <p className="text-[#34495E]">¿En qué te podemos ayudar hoy?</p>
      </div>

      {/* Grid de opciones del menú */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                active 
                  ? 'border-[#FF6B35] bg-[#FF6B35] text-white' 
                  : 'border-gray-200 bg-white hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-white'
              }`}
            >
              {/* Icono */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                active 
                  ? 'bg-white bg-opacity-20' 
                  : 'bg-[#ECF0F1] group-hover:bg-white group-hover:bg-opacity-20'
              }`}>
                <IconComponent className={`w-6 h-6 ${
                  active ? 'text-white' : 'text-[#2C3E50] group-hover:text-white'
                }`} />
              </div>

              {/* Título */}
              <h3 className={`text-lg font-semibold mb-1 transition-colors ${
                active ? 'text-white' : 'text-[#2C3E50] group-hover:text-white'
              }`}>
                {item.name}
              </h3>

              {/* Descripción */}
              <p className={`text-sm transition-colors ${
                active ? 'text-white text-opacity-90' : 'text-[#34495E] group-hover:text-white group-hover:text-opacity-90'
              }`}>
                {item.description}
              </p>

              {/* Indicador de activo */}
              {active && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Información adicional */}
      <div className="mt-8 p-4 bg-[#ECF0F1] rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center">
            <ClockIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-[#2C3E50]">Horario de Atención</h4>
            <p className="text-sm text-[#34495E]">
              Lunes a Viernes: 8:00 AM - 6:00 PM<br />
              Sábados: 8:00 AM - 2:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Acceso rápido */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="p-3 bg-[#FF6B35] text-white rounded-lg text-sm font-medium hover:bg-[#FF8C69] transition-colors">
          📞 Contactar Soporte
        </button>
        <button className="p-3 bg-[#ECF0F1] text-[#2C3E50] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          📱 Descargar App
        </button>
      </div>
    </div>
  );
};

export default ClientMainMenu;
