import { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { useServices } from '@/hooks/useServices';
import { Service, ServiceCategory } from '@/services/servicesService';
import ServiceModal from '@/components/services/ServiceModal';
import CategoryModal from '@/components/services/CategoryModal';

const ServicesPage = () => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'categories'>('services');

  const {
    services,
    categories,
    isLoadingServices,
    isLoadingCategories,
    deleteService,
    deleteCategory,
    isDeletingService,
    isDeletingCategory
  } = useServices();

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsServiceModalOpen(true);
  };

  const handleEditCategory = (category: ServiceCategory) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Servicios</h1>
          <p className="text-gray-600">Administra los servicios y categorías del taller</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsCategoryModalOpen(true)}
            variant="outline"
            leftIcon={<PlusIcon className="h-4 w-4" />}
          >
            Nueva Categoría
          </Button>
          <Button
            onClick={() => setIsServiceModalOpen(true)}
            leftIcon={<PlusIcon className="h-4 w-4" />}
          >
            Nuevo Servicio
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('services')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'services'
                ? 'border-accent-500 text-accent-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Servicios ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'categories'
                ? 'border-accent-500 text-accent-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Categorías ({categories.length})
          </button>
        </nav>
      </div>

      {/* Contenido de los tabs */}
      {activeTab === 'services' ? (
        /* Tab de Servicios */
        <div className="space-y-4">
          {isLoadingServices ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
            </div>
          ) : services.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32 text-gray-500">
                <div className="text-center">
                  <WrenchScrewdriverIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No hay servicios</p>
                  <p className="text-sm">Crea tu primer servicio para comenzar</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {service.name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            style={{ backgroundColor: service.category_color + '20', borderColor: service.category_color }}
                          >
                            {service.category_name}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{service.description}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <CurrencyDollarIcon className="h-4 w-4" />
                            <span className="font-medium text-gray-900">
                              {formatPrice(service.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{formatDuration(service.duration)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditService(service)}
                          leftIcon={<PencilIcon className="h-4 w-4" />}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteService(service.id)}
                          disabled={isDeletingService}
                          leftIcon={<TrashIcon className="h-4 w-4" />}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Tab de Categorías */
        <div className="space-y-4">
          {isLoadingCategories ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
            </div>
          ) : categories.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32 text-gray-500">
                <div className="text-center">
                  <WrenchScrewdriverIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No hay categorías</p>
                  <p className="text-sm">Crea tu primera categoría para comenzar</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                          leftIcon={<PencilIcon className="h-4 w-4" />}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteCategory(category.id)}
                          disabled={isDeletingCategory}
                          leftIcon={<TrashIcon className="h-4 w-4" />}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {category.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Icono: {category.icon}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modales */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={handleCloseServiceModal}
        service={editingService}
        categories={categories}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        category={editingCategory}
      />
    </div>
  );
};

export default ServicesPage; 