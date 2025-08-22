import { apiClient } from './api';

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category_id: number;
  category_name: string;
  category_color: string;
  category_icon: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  color: string;
  icon: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  price: number;
  duration: number;
  category_id: number;
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
  id: number;
}

export interface CreateCategoryRequest {
  name: string;
  color: string;
  icon: string;
  description?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: number;
}

class ServicesService {
  // Servicios
  async getAllServices(): Promise<Service[]> {
    const response = await apiClient.get('/services');
    return response.data;
  }

  async getServiceById(id: number): Promise<Service> {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  }

  async createService(service: CreateServiceRequest): Promise<Service> {
    const response = await apiClient.post('/services', service);
    return response.data;
  }

  async updateService(service: UpdateServiceRequest): Promise<Service> {
    const response = await apiClient.put(`/services/${service.id}`, service);
    return response.data;
  }

  async deleteService(id: number): Promise<boolean> {
    const response = await apiClient.delete(`/services/${id}`);
    return response.data.success;
  }

  // Categorías
  async getAllCategories(): Promise<ServiceCategory[]> {
    const response = await apiClient.get('/service-categories');
    return response.data;
  }

  async getCategoryById(id: number): Promise<ServiceCategory> {
    const response = await apiClient.get(`/service-categories/${id}`);
    return response.data;
  }

  async createCategory(category: CreateCategoryRequest): Promise<ServiceCategory> {
    const response = await apiClient.post('/service-categories', category);
    return response.data;
  }

  async updateCategory(category: UpdateCategoryRequest): Promise<ServiceCategory> {
    const response = await apiClient.put(`/service-categories/${category.id}`, category);
    return response.data;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const response = await apiClient.delete(`/service-categories/${id}`);
    return response.data.success;
  }

  // Métodos mock para desarrollo (cuando no hay backend)
  async getAllServicesMock(): Promise<Service[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 1,
        name: 'Cambio de aceite',
        description: 'Cambio de aceite y filtro del motor',
        price: 2500.00,
        duration: 30,
        category_id: 1,
        category_name: 'Mantenimiento',
        category_color: '#3B82F6',
        category_icon: 'wrench',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Cambio de frenos',
        description: 'Cambio de pastillas y discos de freno',
        price: 8000.00,
        duration: 90,
        category_id: 6,
        category_name: 'Frenos',
        category_color: '#DC2626',
        category_icon: 'brake',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 3,
        name: 'Alineación',
        description: 'Alineación de las ruedas',
        price: 3000.00,
        duration: 45,
        category_id: 7,
        category_name: 'Suspensión',
        category_color: '#059669',
        category_icon: 'car',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];
  }

  async getAllCategoriesMock(): Promise<ServiceCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      {
        id: 1,
        name: 'Mantenimiento',
        color: '#3B82F6',
        icon: 'wrench',
        description: 'Servicios de mantenimiento preventivo',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Reparación',
        color: '#EF4444',
        icon: 'hammer',
        description: 'Reparaciones y diagnósticos',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 3,
        name: 'Limpieza',
        color: '#10B981',
        icon: 'sparkles',
        description: 'Servicios de limpieza y detallado',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 4,
        name: 'Diagnóstico',
        color: '#F59E0B',
        icon: 'search',
        description: 'Diagnósticos y evaluaciones',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];
  }
}

export default new ServicesService();
