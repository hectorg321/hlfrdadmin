import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { Appointment, AppointmentStatus } from '@/types';
import { Button, Card, CardContent } from '@/components/ui';
import { 
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  TruckIcon,
  WrenchIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface AppointmentsListProps {
  onViewAppointment: (appointment: Appointment) => void;
  onEditAppointment: (appointment: Appointment) => void;
  onDeleteAppointment: (appointmentId: string) => void;
}

const statusConfig: Record<AppointmentStatus, {
  label: string;
  color: string;
  bgColor: string;
}> = {
  scheduled: {
    label: 'Programada',
    color: 'text-blue-800',
    bgColor: 'bg-blue-100'
  },
  confirmed: {
    label: 'Confirmada',
    color: 'text-green-800',
    bgColor: 'bg-green-100'
  },
  in_progress: {
    label: 'En Progreso',
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-100'
  },
  completed: {
    label: 'Completada',
    color: 'text-emerald-800',
    bgColor: 'bg-emerald-100'
  },
  cancelled: {
    label: 'Cancelada',
    color: 'text-red-800',
    bgColor: 'bg-red-100'
  },
  no_show: {
    label: 'No Presentó',
    color: 'text-gray-800',
    bgColor: 'bg-gray-100'
  }
};

export const AppointmentsList = ({ 
  onViewAppointment, 
  onEditAppointment, 
  onDeleteAppointment 
}: AppointmentsListProps) => {
  const { appointments, isLoading, deleteAppointment } = useAppointmentStore();
  const [sortField, setSortField] = useState<keyof Appointment>('scheduledDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Appointment) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc' 
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const handleDelete = async (appointmentId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      await deleteAppointment(appointmentId);
      // También llamar al callback del padre si es necesario
      onDeleteAppointment(appointmentId);
    }
  };

  const SortIcon = ({ field }: { field: keyof Appointment }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CalendarIcon className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay citas</h3>
          <p className="text-gray-500 text-center">
            No se encontraron citas con los filtros actuales.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('scheduledDate')}
              >
                <div className="flex items-center">
                  Fecha
                  <SortIcon field="scheduledDate" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('startTime')}
              >
                <div className="flex items-center">
                  Hora
                  <SortIcon field="startTime" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('customerId')}
              >
                <div className="flex items-center">
                  Cliente
                  <SortIcon field="customerId" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehículo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Servicio
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Estado
                  <SortIcon field="status" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAppointments.map((appointment) => {
              const statusInfo = statusConfig[appointment.status];
              return (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  {/* Fecha */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(appointment.scheduledDate, 'dd/MM/yyyy', { locale: es })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(appointment.scheduledDate, 'EEEE', { locale: es })}
                    </div>
                  </td>

                  {/* Hora */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.startTime} - {appointment.endTime}
                    </div>
                    <div className="text-xs text-gray-500">
                      {appointment.service.duration} min
                    </div>
                  </td>

                  {/* Cliente */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.customer.firstName} {appointment.customer.lastName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <PhoneIcon className="w-3 h-3 mr-1" />
                          {appointment.customer.phone}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <EnvelopeIcon className="w-3 h-3 mr-1" />
                          {appointment.customer.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Vehículo */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TruckIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-900">
                          {appointment.vehicleInfo.brand} {appointment.vehicleInfo.model}
                        </div>
                        <div className="text-xs text-gray-500">
                          {appointment.vehicleInfo.year} • {appointment.vehicleInfo.plate}
                        </div>
                        {appointment.vehicleInfo.color && (
                          <div className="text-xs text-gray-500">
                            {appointment.vehicleInfo.color}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Servicio */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <WrenchIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-900">
                          {appointment.service.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          RD${appointment.service.price.toLocaleString()}
                        </div>
                        <div className="flex items-center space-x-1">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: appointment.service.category.color }}
                          ></div>
                          <span className="text-xs text-gray-500">
                            {appointment.service.category.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewAppointment(appointment)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditAppointment(appointment)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
