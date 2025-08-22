import { create } from 'zustand';
import { AdminUser, Permission } from '@/types';
import { usersService, CreateUserData, UpdateUserData, UserFilters } from '@/services/usersService';

interface UsersState {
  users: AdminUser[];
  permissions: Permission[];
  selectedUser: AdminUser | null;
  isLoading: boolean;
  error: string | null;
  filters: UserFilters;
  stats: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    usersByRole: { role: string; count: number }[];
  } | null;
}

interface UsersActions {
  // Acciones básicas
  setUsers: (users: AdminUser[]) => void;
  setSelectedUser: (user: AdminUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: UserFilters) => void;
  setStats: (stats: UsersState['stats']) => void;

  // Acciones de API
  fetchUsers: (filters?: UserFilters) => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  fetchPermissions: () => Promise<void>;
  fetchUserStats: () => Promise<void>;
  
  // CRUD operations
  createUser: (userData: CreateUserData) => Promise<void>;
  updateUser: (id: string, userData: UpdateUserData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  toggleUserStatus: (id: string) => Promise<void>;
  changeUserPassword: (id: string, newPassword: string) => Promise<void>;

  // Utilidades
  getUserById: (id: string) => AdminUser | undefined;
  getUsersByRole: (role: string) => AdminUser[];
  getActiveUsers: () => AdminUser[];
  clearError: () => void;
  reset: () => void;
}

const initialState: UsersState = {
  users: [],
  permissions: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  filters: {},
  stats: null,
};

export const useUsersStore = create<UsersState & UsersActions>((set, get) => ({
  ...initialState,

  // Setters básicos
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set({ filters }),
  setStats: (stats) => set({ stats }),

  // Fetch de usuarios
  fetchUsers: async (filters) => {
    console.log('fetchUsers called with filters:', filters);
    try {
      set({ isLoading: true, error: null });
      const users = await usersService.getUsers(filters);
      console.log('Users fetched successfully:', users);
      set({ users, filters: filters || {} });
    } catch (error) {
      console.error('Error fetching users:', error);
      set({ error: error instanceof Error ? error.message : 'Error al obtener usuarios' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch de usuario por ID
  fetchUserById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const user = await usersService.getUserById(id);
      set({ selectedUser: user });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al obtener usuario' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch de permisos
  fetchPermissions: async () => {
    try {
      set({ isLoading: true, error: null });
      const permissions = await usersService.getPermissions();
      set({ permissions });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al obtener permisos' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch de estadísticas
  fetchUserStats: async () => {
    try {
      set({ isLoading: true, error: null });
      const stats = await usersService.getUserStats();
      set({ stats });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al obtener estadísticas' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Crear usuario
  createUser: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const newUser = await usersService.createUser(userData);
      set((state) => ({ users: [...state.users, newUser] }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al crear usuario' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Actualizar usuario
  updateUser: async (id, userData) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUser = await usersService.updateUser(id, userData);
      set((state) => ({
        users: state.users.map(user => 
          user.id === id ? updatedUser : user
        ),
        selectedUser: state.selectedUser?.id === id ? updatedUser : state.selectedUser
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al actualizar usuario' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Eliminar usuario
  deleteUser: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await usersService.deleteUser(id);
      set((state) => ({
        users: state.users.filter(user => user.id !== id),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al eliminar usuario' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Cambiar estado de usuario
  toggleUserStatus: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUser = await usersService.toggleUserStatus(id);
      set((state) => ({
        users: state.users.map(user => 
          user.id === id ? updatedUser : user
        ),
        selectedUser: state.selectedUser?.id === id ? updatedUser : state.selectedUser
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al cambiar estado del usuario' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Cambiar contraseña
  changeUserPassword: async (id, newPassword) => {
    try {
      set({ isLoading: true, error: null });
      await usersService.changeUserPassword(id, newPassword);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al cambiar contraseña' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Utilidades
  getUserById: (id) => get().users.find(user => user.id === id),
  getUsersByRole: (role) => get().users.filter(user => user.role === role),
  getActiveUsers: () => get().users.filter(user => user.isActive),
  clearError: () => set({ error: null }),
  reset: () => set(initialState),
}));
