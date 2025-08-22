import { AdminUser, Permission } from '@/types';
import { apiClient as api } from './api';

export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'admin' | 'employee' | 'mechanic';
  permissions: string[];
  phone?: string;
  workshopId: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  role?: 'super_admin' | 'admin' | 'employee' | 'mechanic';
  permissions?: string[];
  isActive?: boolean;
  phone?: string;
}

export interface UserFilters {
  search?: string;
  role?: string;
  isActive?: boolean;
  workshopId?: string;
}

export const usersService = {
  // Obtener todos los usuarios
  async getUsers(filters?: UserFilters): Promise<AdminUser[]> {
    console.log('usersService.getUsers called with filters:', filters);
    
    // Mock data para desarrollo
    const mockUsers: AdminUser[] = [
      {
        id: '1',
        email: 'admin@taller.com',
        firstName: 'Admin',
        lastName: 'Principal',
        role: 'super_admin',
        permissions: [
          { id: 'users.manage', name: 'Gestionar Usuarios', description: 'Puede crear/editar usuarios admin', module: 'users' },
          { id: 'appointments.view', name: 'Ver Citas', description: 'Puede ver todas las citas', module: 'appointments' }
        ],
        isActive: true,
        createdAt: new Date(),
        workshopId: '1'
      },
      {
        id: '2',
        email: 'mecanico@taller.com',
        firstName: 'Juan',
        lastName: 'Mecánico',
        role: 'mechanic',
        permissions: [
          { id: 'appointments.view', name: 'Ver Citas', description: 'Puede ver todas las citas', module: 'appointments' }
        ],
        isActive: true,
        createdAt: new Date(),
        workshopId: '1'
      }
    ];
    
    // Simular filtrado
    let filteredUsers = mockUsers;
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters?.role) {
      filteredUsers = filteredUsers.filter(user => user.role === filters.role);
    }
    
    if (filters?.isActive !== undefined) {
      filteredUsers = filteredUsers.filter(user => user.isActive === filters.isActive);
    }
    
    console.log('Returning mock users:', filteredUsers);
    return filteredUsers;
  },

  // Obtener un usuario por ID
  async getUserById(id: string): Promise<AdminUser> {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  // Crear un nuevo usuario
  async createUser(userData: CreateUserData): Promise<AdminUser> {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  // Actualizar un usuario
  async updateUser(id: string, userData: UpdateUserData): Promise<AdminUser> {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  // Eliminar un usuario
  async deleteUser(id: string): Promise<void> {
    await api.delete(`/admin/users/${id}`);
  },

  // Cambiar estado activo/inactivo
  async toggleUserStatus(id: string): Promise<AdminUser> {
    const response = await api.patch(`/admin/users/${id}/toggle-status`);
    return response.data;
  },

  // Obtener permisos disponibles
  async getPermissions(): Promise<Permission[]> {
    console.log('usersService.getPermissions called');
    
    // Mock data para desarrollo
    const mockPermissions: Permission[] = [
      { id: 'appointments.view', name: 'Ver Citas', description: 'Puede ver todas las citas', module: 'appointments' },
      { id: 'appointments.create', name: 'Crear Citas', description: 'Puede crear nuevas citas', module: 'appointments' },
      { id: 'appointments.edit', name: 'Editar Citas', description: 'Puede modificar citas existentes', module: 'appointments' },
      { id: 'appointments.delete', name: 'Eliminar Citas', description: 'Puede cancelar/eliminar citas', module: 'appointments' },
      { id: 'services.manage', name: 'Gestionar Servicios', description: 'Puede crear/editar/eliminar servicios', module: 'services' },
      { id: 'customers.view', name: 'Ver Clientes', description: 'Puede ver información de clientes', module: 'customers' },
      { id: 'feed.manage', name: 'Gestionar Feed', description: 'Puede publicar y moderar contenido', module: 'feed' },
      { id: 'reports.view', name: 'Ver Reportes', description: 'Puede acceder a reportes y estadísticas', module: 'reports' },
      { id: 'users.manage', name: 'Gestionar Usuarios', description: 'Puede crear/editar usuarios admin', module: 'users' }
    ];
    
    console.log('Returning mock permissions:', mockPermissions);
    return mockPermissions;
  },

  // Cambiar contraseña de usuario
  async changeUserPassword(id: string, newPassword: string): Promise<void> {
    await api.post(`/admin/users/${id}/change-password`, { newPassword });
  },

  // Obtener estadísticas de usuarios
  async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    usersByRole: { role: string; count: number }[];
  }> {
    console.log('usersService.getUserStats called');
    
    // Mock data para desarrollo
    const mockStats = {
      totalUsers: 2,
      activeUsers: 2,
      inactiveUsers: 0,
      usersByRole: [
        { role: 'super_admin', count: 1 },
        { role: 'mechanic', count: 1 }
      ]
    };
    
    console.log('Returning mock stats:', mockStats);
    return mockStats;
  }
};
