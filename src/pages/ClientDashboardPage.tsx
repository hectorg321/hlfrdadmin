import React from 'react';
import { Link } from 'react-router-dom';
import { Customer } from '../types/clientTypes';
import { 
  CalendarIcon, 
  WrenchScrewdriverIcon, 
  DocumentTextIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface ClientDashboardPageProps {
  customer: Customer;
}

const ClientDashboardPage: React.FC<ClientDashboardPageProps> = ({ customer }) => {
  // Mock data para el dashboard
  const upcomingAppointment = {
    id: '1',
    service: 'Cambio de Aceite',
    date: '2024-12-20',
    time: '09:00',
    status: 'confirmed'
  };

  const recentServices = [
    { id: '1', name: 'Revisión de Frenos', date: '2024-11-15', status: 'completed' },
    { id: '2', name: 'Cambio de Batería', date: '2024-10-20', status: 'completed' }
  ];

  const notifications = [
    { id: '1', type: 'reminder', message: 'Tu cita está programada para mañana', time: '2h' },
    { id: '2', type: 'promotion', message: '20% de descuento en cambio de filtros', time: '1d' }
  ];

  const quickActions = [
    {
      id: 'book',
      title: 'Reservar Servicio',
      description: 'Agenda un nuevo servicio',
      icon: WrenchScrewdriverIcon,
      path: '/cliente/servicios',
      color: 'bg-[#FF6B35]'
    },
    {
      id: 'appointments',
      title: 'Ver Citas',
      description: 'Gestiona tus citas',
      icon: CalendarIcon,
      path: '/cliente/citas',
      color: 'bg-blue-500'
    },
    {
      id: 'history',
      title: 'Historial',
      description: 'Revisa servicios anteriores',
      icon: DocumentTextIcon,
      path: '/cliente/historial',
      color: 'bg-green-500'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'completed':
        return 'Completada';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header de bienvenida */}
      <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C69] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-2xl">👋</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">¡Hola, {customer.firstName}!</h1>
            <p className="text-white text-opacity-90">Bienvenido a tu taller mecánico</p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={action.id}
              to={action.path}
              className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-[#FF6B35]"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#2C3E50] mb-1">{action.title}</h3>
              <p className="text-sm text-[#34495E]">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Próxima cita */}
      {upcomingAppointment && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#2C3E50]">Próxima Cita</h2>
            <Link 
              to="/cliente/citas"
              className="text-[#FF6B35] hover:text-[#FF8C69] text-sm font-medium"
            >
              Ver todas
            </Link>
          </div>
          
          <div className="bg-[#ECF0F1] rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6B35] rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#2C3E50]">{upcomingAppointment.service}</h3>
                <p className="text-[#34495E]">{formatDate(upcomingAppointment.date)} a las {upcomingAppointment.time}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(upcomingAppointment.status)}`}>
                  {getStatusText(upcomingAppointment.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Servicios recientes */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#2C3E50]">Servicios Recientes</h2>
          <Link 
            to="/cliente/historial"
            className="text-[#FF6B35] hover:text-[#FF8C69] text-sm font-medium"
          >
            Ver historial completo
          </Link>
        </div>
        
        <div className="space-y-3">
          {recentServices.map((service) => (
            <div key={service.id} className="flex items-center gap-3 p-3 bg-[#ECF0F1] rounded-lg">
              <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[#2C3E50]">{service.name}</h4>
                <p className="text-sm text-[#34495E]">{formatDate(service.date)}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                {getStatusText(service.status)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notificaciones */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Notificaciones</h2>
        
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3 p-3 bg-[#ECF0F1] rounded-lg">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                notification.type === 'reminder' ? 'bg-blue-500' : 'bg-[#FF6B35]'
              }`}>
                {notification.type === 'reminder' ? (
                  <ClockIcon className="w-4 h-4 text-white" />
                ) : (
                  <ExclamationTriangleIcon className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[#2C3E50]">{notification.message}</p>
                <p className="text-xs text-[#34495E] mt-1">Hace {notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Información del vehículo */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-[#2C3E50] mb-4">Mi Vehículo</h2>
        
        {customer.vehicles && customer.vehicles.length > 0 ? (
          <div className="bg-[#ECF0F1] rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6B35] rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚗</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#2C3E50]">
                  {customer.vehicles[0].brand} {customer.vehicles[0].model}
                </h3>
                <p className="text-[#34495E]">
                  {customer.vehicles[0].year} • {customer.vehicles[0].plate}
                </p>
                {customer.vehicles[0].mileage && (
                  <p className="text-sm text-[#34495E]">
                    Kilometraje: {customer.vehicles[0].mileage.toLocaleString()} km
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#ECF0F1] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚗</span>
            </div>
            <h3 className="text-lg font-medium text-[#2C3E50] mb-2">No hay vehículos registrados</h3>
            <p className="text-[#34495E] mb-4">Agrega tu vehículo para obtener mejores recomendaciones</p>
            <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-medium hover:bg-[#FF8C69] transition-colors">
              Agregar Vehículo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboardPage;
