import React, { useState } from 'react';
import { Customer, ClientAppointment, AppointmentStatus, ServiceClient } from '../types/clientTypes';

interface ClientAppointmentsPageProps {
  customer: Customer;
}

const ClientAppointmentsPage: React.FC<ClientAppointmentsPageProps> = ({ customer }) => {
  const [selectedFilter, setSelectedFilter] = useState<AppointmentStatus | 'all'>('all');
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null);

  // Mock data para citas del cliente
  const mockAppointments: ClientAppointment[] = [
    {
      id: '1',
      service: {
        id: 's1',
        name: 'Cambio de Aceite',
        description: 'Cambio de aceite y filtro de aceite',
        shortDescription: 'Mantenimiento preventivo del motor',
        duration: 60,
        price: 45.00,
        category: {
          id: 'cat1',
          name: 'Mantenimiento',
          description: 'Servicios de mantenimiento preventivo',
          color: '#10B981',
          icon: '🔧'
        },
        gallery: [],
        features: ['Aceite sintético', 'Filtro de calidad', 'Inspección general'],
        isPopular: true,
        rating: 4.8,
        reviewCount: 156,
        estimatedTime: '45-60 min'
      },
      scheduledDate: '2024-12-20',
      startTime: '09:00',
      endTime: '10:00',
      status: 'confirmed',
      vehicle: {
        id: '1',
        customerId: '1',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        plate: 'ABC-123',
        color: 'Blanco',
        mileage: 50000,
        isDefault: true,
        createdAt: new Date('2023-01-15')
      },
      notes: 'Aceite sintético preferido',
      price: 45.00,
      confirmationCode: 'ABC123',
      canCancel: true,
      canReschedule: true,
      createdAt: new Date('2024-12-15'),
      workshop: {
        name: 'Taller Mecánico Central',
        address: 'Av. Principal 123, Ciudad',
        phone: '+1 234 567 890',
        whatsapp: '+1 234 567 890',
        coordinates: [19.4326, -99.1332],
        workingHours: {
          monday: { isOpen: true, start: '08:00', end: '18:00' },
          tuesday: { isOpen: true, start: '08:00', end: '18:00' },
          wednesday: { isOpen: true, start: '08:00', end: '18:00' },
          thursday: { isOpen: true, start: '08:00', end: '18:00' },
          friday: { isOpen: true, start: '08:00', end: '18:00' },
          saturday: { isOpen: true, start: '08:00', end: '14:00' },
          sunday: { isOpen: false, start: '00:00', end: '00:00' }
        }
      }
    },
    {
      id: '2',
      service: {
        id: 's2',
        name: 'Revisión de Frenos',
        description: 'Inspección completa del sistema de frenos',
        shortDescription: 'Verificación de seguridad del vehículo',
        duration: 45,
        price: 35.00,
        category: {
          id: 'cat2',
          name: 'Seguridad',
          description: 'Servicios relacionados con la seguridad',
          color: '#EF4444',
          icon: '🛡️'
        },
        gallery: [],
        features: ['Inspección completa', 'Verificación de pastillas', 'Prueba de frenado'],
        isPopular: false,
        rating: 4.9,
        reviewCount: 89,
        estimatedTime: '30-45 min'
      },
      scheduledDate: '2024-12-25',
      startTime: '14:00',
      endTime: '14:45',
      status: 'pending',
      vehicle: {
        id: '1',
        customerId: '1',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        plate: 'ABC-123',
        color: 'Blanco',
        mileage: 50000,
        isDefault: true,
        createdAt: new Date('2023-01-15')
      },
      notes: 'Revisión de rutina',
      price: 35.00,
      confirmationCode: 'DEF456',
      canCancel: true,
      canReschedule: true,
      createdAt: new Date('2024-12-16'),
      workshop: {
        name: 'Taller Mecánico Central',
        address: 'Av. Principal 123, Ciudad',
        phone: '+1 234 567 890',
        whatsapp: '+1 234 567 890',
        coordinates: [19.4326, -99.1332],
        workingHours: {
          monday: { isOpen: true, start: '08:00', end: '18:00' },
          tuesday: { isOpen: true, start: '08:00', end: '18:00' },
          wednesday: { isOpen: true, start: '08:00', end: '18:00' },
          thursday: { isOpen: true, start: '08:00', end: '18:00' },
          friday: { isOpen: true, start: '08:00', end: '18:00' },
          saturday: { isOpen: true, start: '08:00', end: '14:00' },
          sunday: { isOpen: false, start: '00:00', end: '00:00' }
        }
      }
    },
    {
      id: '3',
      service: {
        id: 's3',
        name: 'Cambio de Batería',
        description: 'Reemplazo de batería por desgaste',
        shortDescription: 'Solución a problemas de arranque',
        duration: 30,
        price: 120.00,
        category: {
          id: 'cat3',
          name: 'Eléctrico',
          description: 'Servicios del sistema eléctrico',
          color: '#F59E0B',
          icon: '⚡'
        },
        gallery: [],
        features: ['Batería nueva', 'Instalación profesional', 'Prueba de funcionamiento'],
        isPopular: true,
        rating: 4.7,
        reviewCount: 203,
        estimatedTime: '20-30 min'
      },
      scheduledDate: '2024-12-18',
      startTime: '11:00',
      endTime: '11:30',
      status: 'completed',
      vehicle: {
        id: '1',
        customerId: '1',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        plate: 'ABC-123',
        color: 'Blanco',
        mileage: 50000,
        isDefault: true,
        createdAt: new Date('2023-01-15')
      },
      notes: 'Batería de 60Ah',
      price: 120.00,
      confirmationCode: 'GHI789',
      canCancel: false,
      canReschedule: false,
      createdAt: new Date('2024-12-10'),
      workshop: {
        name: 'Taller Mecánico Central',
        address: 'Av. Principal 123, Ciudad',
        phone: '+1 234 567 890',
        whatsapp: '+1 234 567 890',
        coordinates: [19.4326, -99.1332],
        workingHours: {
          monday: { isOpen: true, start: '08:00', end: '18:00' },
          tuesday: { isOpen: true, start: '08:00', end: '18:00' },
          wednesday: { isOpen: true, start: '08:00', end: '18:00' },
          thursday: { isOpen: true, start: '08:00', end: '18:00' },
          friday: { isOpen: true, start: '08:00', end: '18:00' },
          saturday: { isOpen: true, start: '08:00', end: '14:00' },
          sunday: { isOpen: false, start: '00:00', end: '00:00' }
        }
      }
    }
  ];

  const filteredAppointments = mockAppointments.filter(appointment => {
    if (selectedFilter === 'all') return true;
    return appointment.status === selectedFilter;
  });

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rescheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En Progreso';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      case 'rescheduled':
        return 'Reprogramada';
      default:
        return 'Desconocido';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditAppointment = (appointmentId: string) => {
    setEditingAppointment(appointmentId);
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };

  const handleSaveEdit = (appointmentId: string, newDate: string, newTime: string) => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Guardando cambios para cita:', appointmentId, newDate, newTime);
    setEditingAppointment(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#2C3E50]">Mis Citas</h1>
            <p className="text-[#34495E]">Gestiona tus citas y servicios programados</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#34495E]">Total de citas</p>
            <p className="text-2xl font-bold text-[#FF6B35]">{filteredAppointments.length}</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Estado</label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as AppointmentStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
            >
              <option value="all">Todos los estados</option>
              <option value="confirmed">Confirmadas</option>
              <option value="pending">Pendientes</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completadas</option>
              <option value="cancelled">Canceladas</option>
              <option value="rescheduled">Reprogramadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de citas */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-[#ECF0F1] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#34495E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#2C3E50] mb-2">No hay citas</h3>
            <p className="text-[#34495E]">No se encontraron citas para los filtros seleccionados</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-[#2C3E50]">{appointment.service.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                  <p className="text-[#34495E] mb-2">{appointment.service.description}</p>
                  
                  {/* Información de la cita */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[#34495E]">
                        <span>📅 {formatDate(appointment.scheduledDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#34495E]">
                        <span>⏰ {appointment.startTime} - {appointment.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#34495E]">
                        <span>💰 ${appointment.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[#34495E]">
                        <span>🚗 {appointment.vehicle.plate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#34495E]">
                        <span>🔧 {appointment.service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#34495E]">
                        <span>📋 Código: {appointment.confirmationCode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Taller */}
                  <div className="p-3 bg-[#ECF0F1] rounded-lg mb-4">
                    <p className="font-medium text-[#2C3E50] mb-1">{appointment.workshop.name}</p>
                    <p className="text-sm text-[#34495E]">{appointment.workshop.address}</p>
                    <p className="text-sm text-[#34495E]">📞 {appointment.workshop.phone}</p>
                  </div>

                  {/* Notas */}
                  {appointment.notes && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Notas:</strong> {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                {appointment.canCancel && (
                  <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                    Cancelar Cita
                  </button>
                )}
                
                {appointment.canReschedule && (
                  <button 
                    onClick={() => handleEditAppointment(appointment.id)}
                    className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-sm font-medium hover:bg-[#FF8C69] transition-colors"
                  >
                    Editar Cita
                  </button>
                )}

                <button className="px-4 py-2 bg-[#ECF0F1] text-[#2C3E50] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Ver Detalles
                </button>

                <button className="px-4 py-2 bg-[#ECF0F1] text-[#2C3E50] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Compartir
                </button>
              </div>

              {/* Modal de edición */}
              {editingAppointment === appointment.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                    <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Editar Cita</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2C3E50] mb-2">Nueva Fecha</label>
                        <input
                          type="date"
                          defaultValue={appointment.scheduledDate}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-[#2C3E50] mb-2">Nueva Hora</label>
                        <input
                          type="time"
                          defaultValue={appointment.startTime}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSaveEdit(appointment.id, appointment.scheduledDate, appointment.startTime)}
                        className="flex-1 px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-sm font-medium hover:bg-[#FF8C69] transition-colors"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientAppointmentsPage;
