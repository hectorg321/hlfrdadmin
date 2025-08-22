import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useMechanicStore } from '@/store/useMechanicStore';
import { Mechanic, defaultMechanicSpecialties } from '@/types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { 
  XMarkIcon,
  UserIcon,
  IdentificationIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const mechanicSchema = z.object({
  firstName: z.string().min(1, 'Nombre es requerido'),
  lastName: z.string().min(1, 'Apellido es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Teléfono es requerido'),
  employeeCode: z.string().min(1, 'Código de empleado es requerido'),
  experience: z.number().min(0, 'Experiencia debe ser mayor o igual a 0'),
  hourlyRate: z.number().min(0, 'Tarifa debe ser mayor a 0'),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.object({
    name: z.string().optional(),
    relationship: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email('Email inválido').optional().or(z.literal(''))
  }).optional()
});

type MechanicFormData = z.infer<typeof mechanicSchema>;

interface MechanicModalProps {
  isOpen: boolean;
  onClose: () => void;
  mechanic?: Mechanic | null;
}

export const MechanicModal = ({ 
  isOpen, 
  onClose, 
  mechanic 
}: MechanicModalProps) => {
  const { createMechanic, updateMechanic, isLoading } = useMechanicStore();
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MechanicFormData>({
    resolver: zodResolver(mechanicSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employeeCode: '',
      experience: 0,
      hourlyRate: 500,
      dateOfBirth: '',
      address: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      }
    }
  });

  useEffect(() => {
    if (mechanic) {
      reset({
        firstName: mechanic.firstName,
        lastName: mechanic.lastName,
        email: mechanic.email,
        phone: mechanic.phone,
        employeeCode: mechanic.employeeCode,
        experience: mechanic.experience,
        hourlyRate: mechanic.hourlyRate,
        dateOfBirth: mechanic.dateOfBirth ? format(mechanic.dateOfBirth, 'yyyy-MM-dd') : '',
        address: mechanic.address || '',
        emergencyContact: {
          name: mechanic.emergencyContact?.name || '',
          relationship: mechanic.emergencyContact?.relationship || '',
          phone: mechanic.emergencyContact?.phone || '',
          email: mechanic.emergencyContact?.email || ''
        }
      });
      setSelectedSpecialties(mechanic.specialties.map(s => s.id));
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        employeeCode: '',
        experience: 0,
        hourlyRate: 500,
        dateOfBirth: '',
        address: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: '',
          email: ''
        }
      });
      setSelectedSpecialties([]);
    }
  }, [mechanic, reset]);

  const onSubmit = async (data: MechanicFormData) => {
    try {
      const mechanicData = {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        specialties: defaultMechanicSpecialties.filter(s => selectedSpecialties.includes(s.id)),
        isActive: true,
        emergencyContact: data.emergencyContact?.name ? {
          name: data.emergencyContact.name,
          relationship: data.emergencyContact.relationship || '',
          phone: data.emergencyContact.phone || '',
          email: data.emergencyContact.email || undefined
        } : undefined
      };

      if (mechanic) {
        await updateMechanic(mechanic.id, mechanicData);
      } else {
        await createMechanic(mechanicData);
      }

      onClose();
      reset();
      setSelectedSpecialties([]);
    } catch (error) {
      console.error('Error al guardar mecánico:', error);
    }
  };

  const handleSpecialtyToggle = (specialtyId: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialtyId)
        ? prev.filter(id => id !== specialtyId)
        : [...prev, specialtyId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {mechanic ? 'Editar Mecánico' : 'Nuevo Mecánico'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Información personal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre *
                  </label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Apellido *
                  </label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono *
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="tel"
                        placeholder="809-123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha de Nacimiento
                  </label>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Calle, ciudad, provincia"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información laboral */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IdentificationIcon className="w-5 h-5" />
                Información Laboral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Código de Empleado *
                  </label>
                  <Controller
                    name="employeeCode"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="MEC001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.employeeCode && (
                    <p className="text-sm text-red-600">{errors.employeeCode.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Años de Experiencia *
                  </label>
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    )}
                  />
                  {errors.experience && (
                    <p className="text-sm text-red-600">{errors.experience.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tarifa por Hora (RD$) *
                  </label>
                  <Controller
                    name="hourlyRate"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min="0"
                        step="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    )}
                  />
                  {errors.hourlyRate && (
                    <p className="text-sm text-red-600">{errors.hourlyRate.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Especialidades */}
          <Card>
            <CardHeader>
              <CardTitle>Especialidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {defaultMechanicSpecialties.map(specialty => (
                  <label key={specialty.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSpecialties.includes(specialty.id)}
                      onChange={() => handleSpecialtyToggle(specialty.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: specialty.color }}
                      ></div>
                      <div>
                        <div className="font-medium text-gray-900">{specialty.name}</div>
                        <div className="text-sm text-gray-500">{specialty.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contacto de emergencia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5" />
                Contacto de Emergencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <Controller
                    name="emergencyContact.name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Nombre del contacto"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Relación
                  </label>
                  <Controller
                    name="emergencyContact.relationship"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar relación</option>
                        <option value="Esposo/a">Esposo/a</option>
                        <option value="Padre/Madre">Padre/Madre</option>
                        <option value="Hermano/a">Hermano/a</option>
                        <option value="Hijo/a">Hijo/a</option>
                        <option value="Amigo/a">Amigo/a</option>
                        <option value="Otro">Otro</option>
                      </select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <Controller
                    name="emergencyContact.phone"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="tel"
                        placeholder="809-123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Controller
                    name="emergencyContact.email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        placeholder="contacto@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.emergencyContact?.email && (
                    <p className="text-sm text-red-600">{errors.emergencyContact.email.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

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
              {isLoading ? 'Guardando...' : (mechanic ? 'Actualizar' : 'Crear')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
