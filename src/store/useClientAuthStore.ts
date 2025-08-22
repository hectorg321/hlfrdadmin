import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer } from '../types/clientTypes';

interface ClientAuthState {
  // Estado de autenticación
  isAuthenticated: boolean;
  customer: Customer | null;
  token: string | null;
  refreshToken: string | null;
  
  // Estado de carga
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  login: (email: string, password: string) => Promise<boolean>;
  register: (customerData: any) => Promise<boolean>;
  logout: () => void;
  refreshAuth: () => Promise<boolean>;
  clearError: () => void;
  updateCustomer: (customerData: Partial<Customer>) => void;
}

// Mock API functions (reemplazar con llamadas reales)
const mockLoginAPI = async (email: string, password: string): Promise<{ customer: Customer; token: string; refreshToken: string }> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'demo@cliente.com' && password === '123456') {
    return {
      customer: {
        id: '1',
        email: 'demo@cliente.com',
        firstName: 'Juan',
        lastName: 'Pérez',
        phone: '+1 234 567 890',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        isActive: true,
        emailVerified: true,
        phoneVerified: true,
        createdAt: new Date('2023-01-15'),
        lastLogin: new Date(),
        preferences: {
          notifications: {
            email: true,
            whatsapp: true,
            push: false
          },
          privacy: {
            canPost: true,
            canComment: true,
            profileVisible: true
          },
          language: 'es',
          theme: 'auto'
        },
        vehicles: [
          {
            id: '1',
            customerId: '1',
            brand: 'Toyota',
            model: 'Corolla',
            year: 2020,
            plate: 'ABC-123',
            color: 'Blanco',
            mileage: 45000,
            isDefault: true,
            createdAt: new Date('2023-01-15')
          }
        ]
      },
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    };
  }
  
  throw new Error('Credenciales inválidas');
};

const mockRegisterAPI = async (customerData: any): Promise<{ customer: Customer; token: string; refreshToken: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    customer: {
      id: Date.now().toString(),
      email: customerData.email,
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      phone: customerData.phone,
      avatar: undefined,
      isActive: true,
      emailVerified: false,
      phoneVerified: false,
      createdAt: new Date(),
      lastLogin: new Date(),
      preferences: {
        notifications: {
          email: true,
          whatsapp: true,
          push: false
        },
        privacy: {
          canPost: true,
          canComment: true,
          profileVisible: true
        },
        language: 'es',
        theme: 'auto'
      },
      vehicles: customerData.vehicle ? [customerData.vehicle] : []
    },
    token: 'mock-jwt-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now()
  };
};

export const useClientAuthStore = create<ClientAuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      isAuthenticated: false,
      customer: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      // Login
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const { customer, token, refreshToken } = await mockLoginAPI(email, password);
          
          set({
            isAuthenticated: true,
            customer,
            token,
            refreshToken,
            isLoading: false,
            error: null
          });
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Error de autenticación'
          });
          return false;
        }
      },

      // Registro
      register: async (customerData: any) => {
        set({ isLoading: true, error: null });
        
        try {
          const { customer, token, refreshToken } = await mockRegisterAPI(customerData);
          
          set({
            isAuthenticated: true,
            customer,
            token,
            refreshToken,
            isLoading: false,
            error: null
          });
          
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Error en el registro'
          });
          return false;
        }
      },

      // Logout
      logout: () => {
        set({
          isAuthenticated: false,
          customer: null,
          token: null,
          refreshToken: null,
          error: null
        });
      },

      // Refresh token
      refreshAuth: async () => {
        const { refreshToken } = get();
        
        if (!refreshToken) {
          return false;
        }

        try {
          // Aquí iría la lógica real de refresh
          // Por ahora solo retornamos true si existe un refresh token
          return true;
        } catch (error) {
          get().logout();
          return false;
        }
      },

      // Limpiar error
      clearError: () => {
        set({ error: null });
      },

      // Actualizar datos del cliente
      updateCustomer: (customerData: Partial<Customer>) => {
        const { customer } = get();
        if (customer) {
          set({
            customer: { ...customer, ...customerData }
          });
        }
      }
    }),
    {
      name: 'client-auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        customer: state.customer,
        token: state.token,
        refreshToken: state.refreshToken
      })
    }
  )
);
