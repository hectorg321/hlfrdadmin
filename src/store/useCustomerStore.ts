import { create } from 'zustand';
import { Customer } from '../types';
import { CustomersService, CustomerFilters, CreateCustomerData, CustomerStats } from '../services/customersService';

interface CustomerState {
  // Estado
  customers: Customer[];
  selectedCustomer: Customer | null;
  filters: CustomerFilters;
  stats: CustomerStats | null;
  isLoading: boolean;
  error: string | null;
  
  // Paginación
  total: number;
  hasMore: boolean;
  currentPage: number;
  pageSize: number;

  // Acciones
  fetchCustomers: (filters?: CustomerFilters) => Promise<void>;
  fetchCustomerById: (id: string) => Promise<void>;
  createCustomer: (customerData: CreateCustomerData) => Promise<void>;
  updateCustomer: (id: string, updates: Partial<CreateCustomerData>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  searchCustomers: (query: string) => Promise<void>;
  fetchCustomerStats: () => Promise<void>;
  exportCustomers: (filters?: CustomerFilters, format?: 'csv' | 'excel') => Promise<void>;
  importCustomers: (file: File) => Promise<{ success: number; errors: string[]; total: number }>;
  
  // Utilidades
  setFilters: (filters: Partial<CustomerFilters>) => void;
  selectCustomer: (customer: Customer | null) => void;
  clearError: () => void;
  resetState: () => void;
}

const initialState = {
  customers: [],
  selectedCustomer: null,
  filters: {
    search: '',
    hasVehicles: undefined,
    hasAppointments: undefined,
    sortBy: 'createdAt' as const,
    sortOrder: 'desc' as const,
    limit: 20,
    offset: 0
  },
  stats: null,
  isLoading: false,
  error: null,
  total: 0,
  hasMore: false,
  currentPage: 1,
  pageSize: 20
};

export const useCustomerStore = create<CustomerState>((set, get) => ({
  ...initialState,

  fetchCustomers: async (filters?: CustomerFilters) => {
    try {
      set({ isLoading: true, error: null });
      
      const currentFilters = { ...get().filters, ...filters };
      const result = await CustomersService.getCustomers(currentFilters);
      
      set({
        customers: result.customers,
        total: result.total,
        hasMore: result.hasMore,
        filters: currentFilters,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar clientes',
        isLoading: false 
      });
    }
  },

  fetchCustomerById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const customer = await CustomersService.getCustomerById(id);
      set({ selectedCustomer: customer, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar cliente',
        isLoading: false 
      });
    }
  },

  createCustomer: async (customerData: CreateCustomerData) => {
    try {
      set({ isLoading: true, error: null });
      
      const newCustomer = await CustomersService.createCustomer(customerData);
      
      set(state => ({
        customers: [newCustomer, ...state.customers],
        total: state.total + 1,
        isLoading: false
      }));
      
      return newCustomer;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al crear cliente',
        isLoading: false 
      });
      throw error;
    }
  },

  updateCustomer: async (id: string, updates: Partial<CreateCustomerData>) => {
    try {
      set({ isLoading: true, error: null });
      
      const updatedCustomer = await CustomersService.updateCustomer(id, updates);
      
      set(state => ({
        customers: state.customers.map(customer => 
          customer.id === id ? updatedCustomer : customer
        ),
        selectedCustomer: state.selectedCustomer?.id === id ? updatedCustomer : state.selectedCustomer,
        isLoading: false
      }));
      
      return updatedCustomer;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al actualizar cliente',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteCustomer: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await CustomersService.deleteCustomer(id);
      
      set(state => ({
        customers: state.customers.filter(customer => customer.id !== id),
        total: state.total - 1,
        selectedCustomer: state.selectedCustomer?.id === id ? null : state.selectedCustomer,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al eliminar cliente',
        isLoading: false 
      });
      throw error;
    }
  },

  searchCustomers: async (query: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const customers = await CustomersService.searchCustomers(query);
      set({ customers, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error en la búsqueda',
        isLoading: false 
      });
    }
  },

  fetchCustomerStats: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const stats = await CustomersService.getCustomerStats();
      set({ stats, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar estadísticas',
        isLoading: false 
      });
    }
  },

  exportCustomers: async (filters?: CustomerFilters, format: 'csv' | 'excel' = 'csv') => {
    try {
      set({ isLoading: true, error: null });
      
      const blob = await CustomersService.exportCustomers(filters, format);
      
      // Crear descarga del archivo
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clientes.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al exportar clientes',
        isLoading: false 
      });
    }
  },

  importCustomers: async (file: File) => {
    try {
      set({ isLoading: true, error: null });
      
      const result = await CustomersService.importCustomers(file);
      
      // Recargar clientes después de la importación
      await get().fetchCustomers();
      
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al importar clientes',
        isLoading: false 
      });
      throw error;
    }
  },

  setFilters: (filters: Partial<CustomerFilters>) => {
    set(state => ({
      filters: { ...state.filters, ...filters },
      currentPage: 1 // Resetear a la primera página
    }));
  },

  selectCustomer: (customer: Customer | null) => {
    set({ selectedCustomer: customer });
  },

  clearError: () => {
    set({ error: null });
  },

  resetState: () => {
    set(initialState);
  }
}));
