import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addMinutes } from 'date-fns';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { Appointment, Customer, Service } from '@/types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { 
  XMarkIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const appointmentSchema = z.object({
  customerId: z.string().min(1, 'Cliente es requerido'),
  serviceId: z.string().min(1, 'Servicio es requerido'),
  scheduledDate: z.string().min(1, 'Fecha es requerida'),
  startTime: z.string().min(1, 'Hora de inicio es requerida'),
  notes: z.string().optional(),
  assignedMechanic: z.string().optional(),
  vehicleInfo: z.object({
    brand: z.string().min(1, 'Marca es requerida'),
    model: z.string().min(1, 'Modelo es requerido'),
    year: z.number().min(1900).max(new Date().getFullYear() + 1),
    plate: z.string().min(1, 'Placa es requerida'),
    color: z.string().optional(),
    mileage: z.number().min(0).optional()
  })
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: Appointment | null;
  selectedDate?: Date;
  selectedTime?: string;
}

// Datos de ejemplo para desarrollo
const mockCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@example.com',
    phone: '809-123-4567',
    vehicles: [],
    createdAt: new Date()
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'García',
    email: 'maria@example.com',
    phone: '809-987-6543',
    vehicles: [],
    createdAt: new Date()
  }
];

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Cambio de Aceite',
    description: 'Cambio de aceite y filtro',
    price: 1500,
    duration: 60,
    capacity: 2,
    category: { id: '1', name: 'Mantenimiento', color: '#3B82F6', icon: 'wrench' },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    workshopId: '1'
  },
  {
    id: '2',
    name: 'Frenos',
    description: 'Revisión y ajuste de frenos',
    price: 2500,
    duration: 90,
    capacity: 1,
    category: { id: '2', name: 'Reparación', color: '#EF4444', icon: 'hammer' },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    workshopId: '1'
  }
];

export const AppointmentModal = ({ 
  isOpen, 
  onClose, 
  appointment, 
  selectedDate, 
  selectedTime 
}: AppointmentModalProps) => {
  const { createAppointment, updateAppointment, isLoading } = useAppointmentStore();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      customerId: '',
      serviceId: '',
      scheduledDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      startTime: selectedTime || '09:00',
      notes: '',
      assignedMechanic: '',
      vehicleInfo: {
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        plate: '',
        color: '',
        mileage: 0
      }
    }
  });

  const watchedServiceId = watch('serviceId');
  const watchedDate = watch('scheduledDate');
  const watchedStartTime = watch('startTime');

  useEffect(() => {
    if (appointment) {
      reset({
        customerId: appointment.customerId,
        serviceId: appointment.serviceId,
        scheduledDate: format(appointment.scheduledDate, 'yyyy-MM-dd'),
        startTime: appointment.startTime,
        notes: appointment.notes || '',
        assignedMechanic: appointment.assignedMechanic || '',
        vehicleInfo: appointment.vehicleInfo
      });
      setSelectedService(appointment.service);
    } else {
      reset({
        customerId: '',
        serviceId: '',
        scheduledDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
        startTime: selectedTime || '09:00',
        notes: '',
        assignedMechanic: '',
        vehicleInfo: {
          brand: '',
          model: '',
          year: new Date().getFullYear(),
          plate: '',
          color: '',
          mileage: 0
        }
      });
      setSelectedService(null);
    }
  }, [appointment, selectedDate, selectedTime, reset]);

  useEffect(() => {
    if (watchedServiceId) {
      const service = mockServices.find(s => s.id === watchedServiceId);
      setSelectedService(service || null);
    }
  }, [watchedServiceId]);

  useEffect(() => {
    if (selectedService && watchedDate) {
      generateTimeSlots();
    }
  }, [selectedService, watchedDate]);

  const generateTimeSlots = () => {
    if (!selectedService) return;

    const slots: string[] = [];
    const startHour = 8; // 8:00 AM
    const endHour = 17; // 5:00 PM
    const duration = selectedService.duration;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endTime = addMinutes(new Date(`2000-01-01T${time}`), duration);
        
        // Verificar que no se pase del horario de cierre
        if (endTime.getHours() <= endHour) {
          slots.push(time);
        }
      }
    }

    setAvailableSlots(slots);
  };

  const calculateEndTime = (startTime: string, duration: number) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = addMinutes(start, duration);
    return format(end, 'HH:mm');
  };

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const appointmentData = {
        ...data,
        scheduledDate: new Date(data.scheduledDate),
        endTime: calculateEndTime(data.startTime, selectedService?.duration || 60),
        workshopId: '1'
      };

      if (appointment) {
        await updateAppointment(appointment.id, appointmentData);
      } else {
        await createAppointment(appointmentData);
      }

      onClose();
      reset();
    } catch (error) {
      console.error('Error al guardar cita:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {appointment ? 'Editar Cita' : 'Nueva Cita'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cliente */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Cliente *
              </label>
              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar cliente</option>
                    {mockCustomers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.firstName} {customer.lastName} - {customer.phone}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.customerId && (
                <p className="text-sm text-red-600">{errors.customerId.message}</p>
              )}
            </div>

            {/* Servicio */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Servicio *
              </label>
              <Controller
                name="serviceId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar servicio</option>
                    {mockServices.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - RD${service.price} ({service.duration} min)
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.serviceId && (
                <p className="text-sm text-red-600">{errors.serviceId.message}</p>
              )}
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha *
              </label>
              <Controller
                name="scheduledDate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
              {errors.scheduledDate && (
                <p className="text-sm text-red-600">{errors.scheduledDate.message}</p>
              )}
            </div>

            {/* Hora de inicio */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hora de inicio *
              </label>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.startTime && (
                <p className="text-sm text-red-600">{errors.startTime.message}</p>
              )}
            </div>

            {/* Hora de fin (calculada) */}
            {selectedService && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hora de fin
                </label>
                <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                  {calculateEndTime(watchedStartTime, selectedService.duration)}
                </div>
              </div>
            )}

            {/* Mecánico asignado */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mecánico asignado
              </label>
              <Controller
                name="assignedMechanic"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Nombre del mecánico"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              />
            </div>
          </div>

          {/* Información del vehículo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TruckIcon className="w-5 h-5" />
                Información del Vehículo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Marca *
                  </label>
                  <Controller
                    name="vehicleInfo.brand"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Toyota, Honda, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.vehicleInfo?.brand && (
                    <p className="text-sm text-red-600">{errors.vehicleInfo.brand.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Modelo *
                  </label>
                  <Controller
                    name="vehicleInfo.model"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Corolla, Civic, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.vehicleInfo?.model && (
                    <p className="text-sm text-red-600">{errors.vehicleInfo.model.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Año *
                  </label>
                  <Controller
                    name="vehicleInfo.year"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.vehicleInfo?.year && (
                    <p className="text-sm text-red-600">{errors.vehicleInfo.year.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Placa *
                  </label>
                  <Controller
                    name="vehicleInfo.plate"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="ABC123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.vehicleInfo?.plate && (
                    <p className="text-sm text-red-600">{errors.vehicleInfo.plate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <Controller
                    name="vehicleInfo.color"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Blanco, Negro, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Kilometraje
                  </label>
                  <Controller
                    name="vehicleInfo.mileage"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min="0"
                        placeholder="45000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notas */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Notas adicionales
            </label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  placeholder="Información adicional sobre la cita..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : (appointment ? 'Actualizar' : 'Crear')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
