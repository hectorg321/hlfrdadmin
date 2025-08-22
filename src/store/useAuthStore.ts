import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdminUser } from '@/types';

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<AdminUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, _password: string) => {
        try {
          // Aquí iría la llamada real a la API
          // Por ahora simulamos un login exitoso
          const mockUser: AdminUser = {
            id: '1',
            email,
            firstName: 'Super',
            lastName: 'Admin',
            role: 'super_admin',
            permissions: [
              { id: 'users.manage', name: 'Gestionar Usuarios', description: 'Puede crear/editar usuarios admin', module: 'users' },
              { id: 'appointments.view', name: 'Ver Citas', description: 'Puede ver todas las citas', module: 'appointments' },
              { id: 'appointments.create', name: 'Crear Citas', description: 'Puede crear nuevas citas', module: 'appointments' },
              { id: 'appointments.edit', name: 'Editar Citas', description: 'Puede modificar citas existentes', module: 'appointments' },
              { id: 'appointments.delete', name: 'Eliminar Citas', description: 'Puede cancelar/eliminar citas', module: 'appointments' },
              { id: 'services.manage', name: 'Gestionar Servicios', description: 'Puede crear/editar/eliminar servicios', module: 'services' },
              { id: 'customers.view', name: 'Ver Clientes', description: 'Puede ver información de clientes', module: 'customers' },
              { id: 'feed.manage', name: 'Gestionar Feed', description: 'Puede publicar y moderar contenido', module: 'feed' },
              { id: 'reports.view', name: 'Ver Reportes', description: 'Puede acceder a reportes y estadísticas', module: 'reports' }
            ],
            isActive: true,
            createdAt: new Date(),
            workshopId: 'workshop-1'
          };

          const mockToken = 'mock-jwt-token';

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true
          });

          localStorage.setItem('auth_token', mockToken);
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
        localStorage.removeItem('auth_token');
      },

      updateUser: (updates: Partial<AdminUser>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates }
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
); 