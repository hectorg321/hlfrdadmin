import React, { useState } from 'react';
import { 
  UserIcon, 
  TruckIcon, 
  CalendarIcon, 
  CogIcon, 
  BellIcon,
  ChevronRightIcon,
  PencilIcon,
  PlusIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { ClientLayout, PageHeader, SectionHeader, EmptyState } from '../layout/ClientLayout';
import { BottomSheet } from '../ui/MobileComponents';
import { Customer, Vehicle, ClientAppointment } from '../../types/clientTypes';

interface ProfilePageProps {
  customer: Customer;
}

interface ProfileSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
  badge?: number;
}

// Mock data para demostración
const mockCustomer: Customer = {
  id: '1',
  email: 'juan.perez@email.com',
  firstName: 'Juan',
  lastName: 'Pérez',
  phone: '+1 234 567 890',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  isActive: true,
  emailVerified: true,
  phoneVerified: true,
  createdAt: new Date('2023-01-15'),
  lastLogin: new Date(),
  preferences: {
    notifications: {
      email: true,
      whatsapp: true,
      push: false
    },
    privacy: {
      canPost: true,
      canComment: true,
      profileVisible: true
    },
    language: 'es',
    theme: 'auto'
  },
  vehicles: [
    {
      id: '1',
      customerId: '1',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      plate: 'ABC-123',
      color: 'Blanco',
      mileage: 45000,
      isDefault: true,
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      customerId: '1',
      brand: 'Honda',
      model: 'Civic',
      year: 2018,
      plate: 'XYZ-789',
      color: 'Negro',
      mileage: 78000,
      isDefault: false,
      createdAt: new Date('2023-06-20')
    }
  ]
};

const mockAppointments: ClientAppointment[] = [
  {
    id: '1',
    service: {
      id: '1',
      name: 'Cambio de Aceite',
      description: 'Cambio completo de aceite y filtro',
      shortDescription: 'Mantenimiento preventivo',
      duration: 45,
      price: 45.00,
      category: { id: '1', name: 'Mantenimiento', description: '', color: '#3B82F6', icon: 'wrench' },
      imageUrl: '',
      gallery: [],
      features: [],
      requirements: [],
      isPopular: true,
      rating: 4.8,
      reviewCount: 127,
      estimatedTime: '30-45 min'
    },
    scheduledDate: '2025-01-20',
    startTime: '10:00',
    endTime: '10:45',
    status: 'completed',
    vehicle: mockCustomer.vehicles[0],
    price: 45.00,
    confirmationCode: 'ABC123',
    canCancel: false,
    canReschedule: false,
    createdAt: new Date('2025-01-15'),
    workshop: {
      name: 'Taller Mecánico Premium',
      address: 'Av. Principal 123, Ciudad',
      phone: '+1 234 567 890',
      whatsapp: '+1 234 567 890',
      coordinates: [0, 0],
      workingHours: {
        monday: { isOpen: true, start: '08:00', end: '18:00' },
        tuesday: { isOpen: true, start: '08:00', end: '18:00' },
        wednesday: { isOpen: true, start: '08:00', end: '18:00' },
        thursday: { isOpen: true, start: '08:00', end: '18:00' },
        friday: { isOpen: true, start: '08:00', end: '18:00' },
        saturday: { isOpen: true, start: '08:00', end: '14:00' },
        sunday: { isOpen: false, start: '', end: '' }
      }
    }
  }
];

// Componente de Información Personal
const PersonalInfoSection: React.FC<{ customer: Customer }> = ({ customer }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-xl mx-4 mb-6 border border-gray-100">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <PencilIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Avatar y nombre */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {customer.avatar ? (
                <img 
                  src={customer.avatar} 
                  alt={`${customer.firstName} ${customer.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <UserIcon className="w-10 h-10 text-blue-600" />
                </div>
              )}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">
                {customer.firstName} {customer.lastName}
              </h4>
              <p className="text-gray-500">Cliente desde {customer.createdAt.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          
          {/* Información de contacto */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <EnvelopeIcon className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{customer.email}</p>
              </div>
              {customer.emailVerified && (
                <ShieldCheckIcon className="w-5 h-5 text-green-500" />
              )}
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <PhoneIcon className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium text-gray-900">{customer.phone}</p>
              </div>
              {customer.phoneVerified && (
                <ShieldCheckIcon className="w-5 h-5 text-green-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Vehículos
const VehiclesSection: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);

  const handleEditVehicle = (vehicle: Vehicle) => {
    console.log('Edit vehicle:', vehicle);
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    console.log('Delete vehicle:', vehicleId);
  };

  const handleSetDefault = (vehicleId: string) => {
    console.log('Set default vehicle:', vehicleId);
  };

  return (
    <div className="bg-white rounded-xl mx-4 mb-6 border border-gray-100">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Mis Vehículos</h3>
          <button
            onClick={() => setIsAddingVehicle(true)}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        
        {vehicles.length === 0 ? (
          <EmptyState
            icon={TruckIcon}
            title="No tienes vehículos registrados"
            description="Agrega tu primer vehículo para poder agendar servicios"
            action={
              <button
                onClick={() => setIsAddingVehicle(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Agregar Vehículo
              </button>
            }
          />
        ) : (
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TruckIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {vehicle.brand} {vehicle.model}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {vehicle.year} • {vehicle.plate}
                      </p>
                    </div>
                  </div>
                  {vehicle.isDefault && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Principal
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div>Color: {vehicle.color}</div>
                  {vehicle.mileage && <div>Kilometraje: {vehicle.mileage.toLocaleString()} km</div>}
                </div>
                
                <div className="flex space-x-2">
                  {!vehicle.isDefault && (
                    <button
                      onClick={() => handleSetDefault(vehicle.id)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Establecer como Principal
                    </button>
                  )}
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Historial de Citas
const AppointmentHistorySection: React.FC<{ appointments: ClientAppointment[] }> = ({ appointments }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl mx-4 mb-6 border border-gray-100">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Historial de Citas</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            Ver todas
          </button>
        </div>
        
        {appointments.length === 0 ? (
          <EmptyState
            icon={CalendarIcon}
            title="No tienes citas previas"
            description="Todas tus citas aparecerán aquí una vez completadas"
          />
        ) : (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{appointment.service.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div>Fecha: {new Date(appointment.scheduledDate).toLocaleDateString('es-ES')}</div>
                  <div>Hora: {appointment.startTime}</div>
                  <div>Vehículo: {appointment.vehicle.plate}</div>
                  <div>Precio: ${appointment.price}</div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="truncate">{appointment.workshop.name}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Preferencias
const PreferencesSection: React.FC<{ preferences: Customer['preferences'] }> = ({ preferences }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handlePreferenceChange = (key: string, value: any) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'light':
        return <SunIcon className="w-5 h-5" />;
      case 'dark':
        return <MoonIcon className="w-5 h-5" />;
      default:
        return <ComputerDesktopIcon className="w-5 h-5" />;
    }
  };

  const getThemeText = (theme: string) => {
    switch (theme) {
      case 'light':
        return 'Claro';
      case 'dark':
        return 'Oscuro';
      default:
        return 'Automático';
    }
  };

  return (
    <div className="bg-white rounded-xl mx-4 mb-6 border border-gray-100">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencias</h3>
        
        <div className="space-y-6">
          {/* Notificaciones */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
              <BellIcon className="w-5 h-5 text-gray-500" />
              <span>Notificaciones</span>
            </h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localPreferences.notifications.email}
                  onChange={(e) => handlePreferenceChange('notifications', {
                    ...localPreferences.notifications,
                    email: e.target.checked
                  })}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Notificaciones por email</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localPreferences.notifications.whatsapp}
                  onChange={(e) => handlePreferenceChange('notifications', {
                    ...localPreferences.notifications,
                    whatsapp: e.target.checked
                  })}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Notificaciones por WhatsApp</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localPreferences.notifications.push}
                  onChange={(e) => handlePreferenceChange('notifications', {
                    ...localPreferences.notifications,
                    push: e.target.checked
                  })}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Notificaciones push</span>
              </label>
            </div>
          </div>
          
          {/* Privacidad */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
              <ShieldCheckIcon className="w-5 h-5 text-gray-500" />
              <span>Privacidad</span>
            </h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localPreferences.privacy.canPost}
                  onChange={(e) => handlePreferenceChange('privacy', {
                    ...localPreferences.privacy,
                    canPost: e.target.checked
                  })}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Puedo publicar en el feed</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localPreferences.privacy.canComment}
                  onChange={(e) => handlePreferenceChange('privacy', {
                    ...localPreferences.privacy,
                    canComment: e.target.checked
                  })}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Puedo comentar publicaciones</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localPreferences.privacy.profileVisible}
                  onChange={(e) => handlePreferenceChange('privacy', {
                    ...localPreferences.privacy,
                    profileVisible: e.target.checked
                  })}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Mi perfil es visible para otros</span>
              </label>
            </div>
          </div>
          
          {/* Idioma y Tema */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                <GlobeAltIcon className="w-5 h-5 text-gray-500" />
                <span>Idioma</span>
              </h4>
              <select
                value={localPreferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                <SunIcon className="w-5 h-5 text-gray-500" />
                <span>Tema</span>
              </h4>
              <select
                value={localPreferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Página Principal de Perfil
const ProfilePage: React.FC<ProfilePageProps> = ({ customer }) => {
  const [activeSection, setActiveSection] = useState('personal');

  const profileSections: ProfileSection[] = [
    {
      id: 'personal',
      title: 'Información Personal',
      icon: UserIcon,
      component: PersonalInfoSection
    },
    {
      id: 'vehicles',
      title: 'Mis Vehículos',
      icon: TruckIcon,
      component: VehiclesSection
    },
    {
      id: 'appointments',
      title: 'Historial de Citas',
      icon: CalendarIcon,
      component: AppointmentHistorySection
    },
    {
      id: 'preferences',
      title: 'Preferencias',
      icon: CogIcon,
      component: PreferencesSection
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection customer={customer} />;
      case 'vehicles':
        return <VehiclesSection vehicles={customer.vehicles} />;
      case 'appointments':
        return <AppointmentHistorySection appointments={mockAppointments} />;
      case 'preferences':
        return <PreferencesSection preferences={customer.preferences} />;
      default:
        return <PersonalInfoSection customer={customer} />;
    }
  };

  return (
    <ClientLayout showBottomNav={false}>
      <PageHeader
        title="Mi Perfil"
        subtitle="Gestiona tu información y preferencias"
        onBack={() => console.log('Go back')}
      />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {profileSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                activeSection === section.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span>{section.title}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Section Content */}
      {renderSection()}
    </ClientLayout>
  );
};

export default ProfilePage;
