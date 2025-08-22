import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useServices } from '@/hooks/useServices';
import { ServiceCategory } from '@/services/servicesService';

const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Debe ser un color hexadecimal válido'),
  icon: z.string().min(1, 'El icono es requerido'),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: ServiceCategory | null;
}

const CategoryModal = ({ isOpen, onClose, category }: CategoryModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCategory, updateCategory } = useServices();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: '#3B82F6',
      icon: 'wrench',
      description: '',
    },
  });

  const selectedColor = watch('color');

  // Resetear formulario cuando cambia la categoría
  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('color', category.color);
      setValue('icon', category.icon);
      setValue('description', category.description || '');
    } else {
      reset();
    }
  }, [category, setValue, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setIsSubmitting(true);
      
      if (category) {
        await updateCategory({
          id: category.id,
          ...data,
        });
      } else {
        await createCategory(data);
      }
      
      onClose();
      reset();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
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
                {category ? 'Editar Categoría' : 'Nueva Categoría'}
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
                  label="Nombre de la Categoría"
                  placeholder="Ej: Mantenimiento"
                  error={errors.name?.message}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción (opcional)
                  </label>
                  <textarea
                    {...register('description')}
                    rows={2}
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe la categoría"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        {...register('color')}
                        type="color"
                        className="h-10 w-16 rounded border border-gray-300"
                      />
                      <Input
                        {...register('color')}
                        placeholder="#3B82F6"
                        error={errors.color?.message}
                      />
                    </div>
                    {selectedColor && (
                      <div className="mt-2 flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: selectedColor }}
                        ></div>
                        <span className="text-sm text-gray-500">{selectedColor}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icono
                    </label>
                    <select
                      {...register('icon')}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="wrench">🔧 Wrench</option>
                      <option value="hammer">🔨 Hammer</option>
                      <option value="sparkles">✨ Sparkles</option>
                      <option value="search">🔍 Search</option>
                      <option value="chip">💻 Chip</option>
                      <option value="brake">🛑 Brake</option>
                      <option value="car">🚗 Car</option>
                      <option value="engine">⚙️ Engine</option>
                      <option value="tools">🛠️ Tools</option>
                      <option value="oil">🛢️ Oil</option>
                    </select>
                  </div>
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
                    {category ? 'Actualizar' : 'Crear'} Categoría
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

export default CategoryModal;
