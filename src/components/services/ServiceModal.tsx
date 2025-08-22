import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useServices } from '@/hooks/useServices';
import { Service, ServiceCategory } from '@/services/servicesService';

const serviceSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  duration: z.number().min(1, 'La duración debe ser mayor a 0'),
  category_id: z.number().min(1, 'Debe seleccionar una categoría'),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: Service | null;
  categories: ServiceCategory[];
}

const ServiceModal = ({ isOpen, onClose, service, categories }: ServiceModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createService, updateService } = useServices();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      duration: 30,
      category_id: 0,
    },
  });

  // Resetear formulario cuando cambia el servicio
  useEffect(() => {
    if (service) {
      setValue('name', service.name);
      setValue('description', service.description);
      setValue('price', service.price);
      setValue('duration', service.duration);
      setValue('category_id', service.category_id);
    } else {
      reset();
    }
  }, [service, setValue, reset]);

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setIsSubmitting(true);
      
      if (service) {
        await updateService({
          id: service.id,
          ...data,
        });
      } else {
        await createService(data);
      }
      
      onClose();
      reset();
    } catch (error) {
      console.error('Error al guardar servicio:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>
                {service ? 'Editar Servicio' : 'Nuevo Servicio'}
              </CardTitle>
              <button
                onClick={handleClose}
                className="rounded-md p-1 text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  {...register('name')}
                  label="Nombre del Servicio"
                  placeholder="Ej: Cambio de aceite"
                  error={errors.name?.message}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe el servicio en detalle"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    {...register('price', { valueAsNumber: true })}
                    type="number"
                    label="Precio (RD$)"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    error={errors.price?.message}
                  />

                  <Input
                    {...register('duration', { valueAsNumber: true })}
                    type="number"
                    label="Duración (minutos)"
                    placeholder="30"
                    min="1"
                    error={errors.duration?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    {...register('category_id', { valueAsNumber: true })}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value={0}>Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="mt-1 text-sm text-error-600">{errors.category_id.message}</p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    {service ? 'Actualizar' : 'Crear'} Servicio
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
