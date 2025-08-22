import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import servicesService, { 
  Service, 
  ServiceCategory, 
  CreateServiceRequest, 
  UpdateServiceRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest
} from '@/services/servicesService';

// Hook para servicios
export const useServices = () => {
  const queryClient = useQueryClient();

  // Query para obtener todos los servicios
  const {
    data: services = [],
    isLoading: isLoadingServices,
    error: servicesError,
    refetch: refetchServices
  } = useQuery({
    queryKey: ['services'],
    queryFn: servicesService.getAllServicesMock, // Usar mock por ahora
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Query para obtener todas las categorías
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories
  } = useQuery({
    queryKey: ['service-categories'],
    queryFn: servicesService.getAllCategoriesMock, // Usar mock por ahora
    staleTime: 10 * 60 * 1000, // 10 minutos
  });

  // Mutación para crear servicio
  const createServiceMutation = useMutation({
    mutationFn: servicesService.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Servicio creado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al crear el servicio');
    },
  });

  // Mutación para actualizar servicio
  const updateServiceMutation = useMutation({
    mutationFn: servicesService.updateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Servicio actualizado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al actualizar el servicio');
    },
  });

  // Mutación para eliminar servicio
  const deleteServiceMutation = useMutation({
    mutationFn: servicesService.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Servicio eliminado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al eliminar el servicio');
    },
  });

  // Mutación para crear categoría
  const createCategoryMutation = useMutation({
    mutationFn: servicesService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-categories'] });
      toast.success('Categoría creada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al crear la categoría');
    },
  });

  // Mutación para actualizar categoría
  const updateCategoryMutation = useMutation({
    mutationFn: servicesService.updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-categories'] });
      toast.success('Categoría actualizada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al actualizar la categoría');
    },
  });

  // Mutación para eliminar categoría
  const deleteCategoryMutation = useMutation({
    mutationFn: servicesService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-categories'] });
      toast.success('Categoría eliminada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al eliminar la categoría');
    },
  });

  // Funciones para servicios
  const createService = (service: CreateServiceRequest) => {
    createServiceMutation.mutate(service);
  };

  const updateService = (service: UpdateServiceRequest) => {
    updateServiceMutation.mutate(service);
  };

  const deleteService = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      deleteServiceMutation.mutate(id);
    }
  };

  // Funciones para categorías
  const createCategory = (category: CreateCategoryRequest) => {
    createCategoryMutation.mutate(category);
  };

  const updateCategory = (category: UpdateCategoryRequest) => {
    updateCategoryMutation.mutate(category);
  };

  const deleteCategory = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      deleteCategoryMutation.mutate(id);
    }
  };

  return {
    // Datos
    services,
    categories,
    
    // Estados de carga
    isLoadingServices,
    isLoadingCategories,
    
    // Estados de mutación
    isCreatingService: createServiceMutation.isPending,
    isUpdatingService: updateServiceMutation.isPending,
    isDeletingService: deleteServiceMutation.isPending,
    isCreatingCategory: createCategoryMutation.isPending,
    isUpdatingCategory: updateCategoryMutation.isPending,
    isDeletingCategory: deleteCategoryMutation.isPending,
    
    // Errores
    servicesError,
    categoriesError,
    
    // Funciones para servicios
    createService,
    updateService,
    deleteService,
    
    // Funciones para categorías
    createCategory,
    updateCategory,
    deleteCategory,
    
    // Refetch
    refetchServices,
    refetchCategories,
  };
};

// Hook para un servicio específico
export const useService = (id: number) => {
  const queryClient = useQueryClient();

  const {
    data: service,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['services', id],
    queryFn: () => servicesService.getServiceById(id),
    enabled: !!id,
  });

  return {
    service,
    isLoading,
    error,
    refetch
  };
};

// Hook para una categoría específica
export const useServiceCategory = (id: number) => {
  const queryClient = useQueryClient();

  const {
    data: category,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['service-categories', id],
    queryFn: () => servicesService.getCategoryById(id),
    enabled: !!id,
  });

  return {
    category,
    isLoading,
    error,
    refetch
  };
};
