import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Appointment, AppointmentStatus } from '@/types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { 
  UserIcon,
  WrenchIcon,
  CalendarIcon,
  ClockIcon,
  TruckIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as ClockIconSolid,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface AppointmentDetailsProps {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointmentId: string) => void;
  onStatusChange: (appointmentId: string, status: AppointmentStatus) => void;
}

const statusConfig: Record<AppointmentStatus, {
  label: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  scheduled: {
    label: 'Programada',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: ClockIcon
  },
  confirmed: {
    label: 'Confirmada',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircleIcon
  },
  in_progress: {
    label: 'En Progreso',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: ClockIconSolid
  },
  completed: {
    label: 'Completada',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: CheckCircleIcon
  },
  cancelled: {
    label: 'Cancelada',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircleIcon
  },
  no_show: {
    label: 'No Presentó',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: XCircleIcon
  }
};

export const AppointmentDetails = ({ 
  appointment, 
  onEdit, 
  onDelete, 
  onStatusChange 
}: AppointmentDetailsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const statusInfo = statusConfig[appointment.status];

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      setIsDeleting(true);
      try {
        await onDelete(appointment.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleStatusChange = (newStatus: AppointmentStatus) => {
    if (window.confirm(`¿Cambiar estado a "${statusConfig[newStatus].label}"?`)) {
      onStatusChange(appointment.id, newStatus);
    }
  };

  const getAvailableStatuses = (): AppointmentStatus[] => {
    switch (appointment.status) {
      case 'scheduled':
        return ['confirmed', 'cancelled'];
      case 'confirmed':
        return ['in_progress', 'cancelled', 'no_show'];
      case 'in_progress':
        return ['completed', 'cancelled'];
      case 'completed':
        return [];
      case 'cancelled':
        return ['scheduled'];
      case 'no_show':
        return ['scheduled'];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con estado y acciones */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full border text-sm font-medium ${statusInfo.color}`}>
            <div className="flex items-center space-x-2">
              <statusInfo.icon className="w-4 h-4" />
              <span>{statusInfo.label}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(appointment)}
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="error"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </div>

      {/* Cambio de estado */}
      {getAvailableStatuses().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cambiar Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getAvailableStatuses().map(status => {
                const config = statusConfig[status];
                return (
                  <Button
                    key={status}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleStatusChange(status)}
                  >
                    <config.icon className="w-4 h-4 mr-2" />
                    {config.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información de la cita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información del cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Información del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">
                {appointment.customer.firstName} {appointment.customer.lastName}
              </h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <PhoneIcon className="w-4 h-4" />
                <span>{appointment.customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <EnvelopeIcon className="w-4 h-4" />
                <span>{appointment.customer.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información del servicio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WrenchIcon className="w-5 h-5" />
              Servicio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{appointment.service.name}</h3>
              <p className="text-gray-600 text-sm">{appointment.service.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Precio</span>
                <p className="font-semibold text-lg text-green-600">
                  RD${appointment.service.price.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Duración</span>
                <p className="font-semibold">{appointment.service.duration} min</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: appointment.service.category.color }}
              ></div>
              <span className="text-sm text-gray-600">
                {appointment.service.category.name}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Fecha y hora */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Fecha y Hora
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Fecha</span>
                <p className="font-semibold">
                  {format(appointment.scheduledDate, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: es })}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Hora</span>
                <p className="font-semibold">
                  {appointment.startTime} - {appointment.endTime}
                </p>
              </div>
            </div>

            {appointment.assignedMechanic && (
              <div>
                <span className="text-sm text-gray-500">Mecánico asignado</span>
                <p className="font-semibold">{appointment.assignedMechanic}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Información del vehículo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TruckIcon className="w-5 h-5" />
              Vehículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">
                {appointment.vehicleInfo.brand} {appointment.vehicleInfo.model}
              </h3>
              <p className="text-gray-600">{appointment.vehicleInfo.year}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Placa</span>
                <p className="font-semibold font-mono text-lg">
                  {appointment.vehicleInfo.plate}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Color</span>
                <p className="font-semibold">{appointment.vehicleInfo.color || 'N/A'}</p>
              </div>
            </div>

            {appointment.vehicleInfo.mileage && (
              <div>
                <span className="text-sm text-gray-500">Kilometraje</span>
                <p className="font-semibold">{appointment.vehicleInfo.mileage.toLocaleString()} km</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notas */}
      {appointment.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5" />
              Notas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{appointment.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Información del sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500">Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Creada:</span>
              <p>{format(appointment.createdAt, 'dd/MM/yyyy HH:mm')}</p>
            </div>
            <div>
              <span className="font-medium">Actualizada:</span>
              <p>{format(appointment.updatedAt, 'dd/MM/yyyy HH:mm')}</p>
            </div>
            <div>
              <span className="font-medium">ID:</span>
              <p className="font-mono">{appointment.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
