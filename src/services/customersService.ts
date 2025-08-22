import { apiClient } from './api';
import { Customer, Vehicle } from '../types';

// Datos mock para desarrollo - REMOVER cuando se implemente el backend
const mockCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'Juan Carlos',
    lastName: 'Pérez González',
    email: 'juan.perez@email.com',
    phone: '809-123-4567',
    address: 'Calle Principal #123, Santo Domingo',
    dateOfBirth: new Date('1985-03-15'),
    emergencyContact: {
      name: 'María Pérez',
      relationship: 'Esposa',
      phone: '809-987-6543',
      email: 'maria.perez@email.com'
    },
    vehicles: [
      {
        id: 'v1',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        licensePlate: 'ABC-123',
        vin: '1HGBH41JXMN109186',
        color: 'Blanco'
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    workshopId: 'workshop1'
  },
  {
    id: '2',
    firstName: 'Ana María',
    lastName: 'Rodríguez López',
    email: 'ana.rodriguez@email.com',
    phone: '809-234-5678',
    address: 'Avenida Independencia #456, Santiago',
    dateOfBirth: new Date('1990-07-22'),
    emergencyContact: {
      name: 'Carlos Rodríguez',
      relationship: 'Hermano',
      phone: '809-876-5432',
      email: 'carlos.rodriguez@email.com'
    },
    vehicles: [
      {
        id: 'v2',
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        licensePlate: 'XYZ-789',
        vin: '2T1BURHE0JC123456',
        color: 'Azul'
      },
      {
        id: 'v3',
        make: 'Nissan',
        model: 'Sentra',
        year: 2021,
        licensePlate: 'DEF-456',
        vin: '3N1AB6AP7BL789012',
        color: 'Gris'
      }
    ],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    workshopId: 'workshop1'
  },
  {
    id: '3',
    firstName: 'Roberto',
    lastName: 'Martínez Sánchez',
    email: 'roberto.martinez@email.com',
    phone: '809-345-6789',
    address: 'Calle 27 de Febrero #789, La Romana',
    dateOfBirth: new Date('1982-11-08'),
    emergencyContact: {
      name: 'Carmen Martínez',
      relationship: 'Madre',
      phone: '809-765-4321'
    },
    vehicles: [],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    workshopId: 'workshop1'
  },
  {
    id: '4',
    firstName: 'Isabel',
    lastName: 'García Torres',
    email: 'isabel.garcia@email.com',
    phone: '809-456-7890',
    address: 'Boulevard del Este #321, Punta Cana',
    dateOfBirth: new Date('1988-05-14'),
    emergencyContact: {
      name: 'Miguel García',
      relationship: 'Esposo',
      phone: '809-654-3210',
      email: 'miguel.garcia@email.com'
    },
    vehicles: [
      {
        id: 'v4',
        make: 'Ford',
        model: 'Escape',
        year: 2022,
        licensePlate: 'GHI-789',
        vin: '1FMCU0F75NUB12345',
        color: 'Rojo'
      }
    ],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    workshopId: 'workshop1'
  },
  {
    id: '5',
    firstName: 'Luis Alberto',
    lastName: 'Hernández Vega',
    email: 'luis.hernandez@email.com',
    phone: '809-567-8901',
    address: 'Calle Duarte #654, Puerto Plata',
    dateOfBirth: new Date('1975-09-30'),
    emergencyContact: {
      name: 'Rosa Hernández',
      relationship: 'Hija',
      phone: '809-543-2109',
      email: 'rosa.hernandez@email.com'
    },
    vehicles: [
      {
        id: 'v5',
        make: 'Chevrolet',
        model: 'Cruze',
        year: 2018,
        licensePlate: 'JKL-012',
        vin: '1G1JC5SH3J4123456',
        color: 'Negro'
      }
    ],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-01'),
    workshopId: 'workshop1'
  }
];

const mockStats = {
  totalCustomers: mockCustomers.length,
  newCustomersThisMonth: 3, // Clientes creados en el mes actual
  customersWithVehicles: mockCustomers.filter(c => c.vehicles.length > 0).length,
  customersWithAppointments: 2, // Simulado
  averageVehiclesPerCustomer: mockCustomers.reduce((acc, c) => acc + c.vehicles.length, 0) / mockCustomers.length
};

// Función para simular delay de API
const simulateApiDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Función para simular búsqueda
const searchInMockData = (query: string, customers: Customer[]): Customer[] => {
  const searchTerm = query.toLowerCase();
  return customers.filter(customer => 
    customer.firstName.toLowerCase().includes(searchTerm) ||
    customer.lastName.toLowerCase().includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm) ||
    customer.phone.includes(searchTerm) ||
    customer.vehicles.some(v => v.licensePlate.toLowerCase().includes(searchTerm))
  );
};

export interface CustomerFilters {
  search?: string;
  hasVehicles?: boolean;
  hasAppointments?: boolean;
  sortBy?: 'firstName' | 'lastName' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface CreateCustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  vehicles?: Omit<Vehicle, 'id'>[];
}

export interface UpdateCustomerData extends Partial<CreateCustomerData> {
  id: string;
}

export interface CustomerStats {
  totalCustomers: number;
  newCustomersThisMonth: number;
  customersWithVehicles: number;
  customersWithAppointments: number;
  averageVehiclesPerCustomer: number;
}

export class CustomersService {
  // Obtener todos los clientes con filtros (MOCK)
  static async getCustomers(filters?: CustomerFilters): Promise<{
    customers: Customer[];
    total: number;
    hasMore: boolean;
  }> {
    await simulateApiDelay();
    
    let filteredCustomers = [...mockCustomers];
    
    // Aplicar búsqueda
    if (filters?.search) {
      filteredCustomers = searchInMockData(filters.search, filteredCustomers);
    }
    
    // Aplicar filtros
    if (filters?.hasVehicles !== undefined) {
      filteredCustomers = filteredCustomers.filter(c => 
        filters.hasVehicles ? c.vehicles.length > 0 : c.vehicles.length === 0
      );
    }
    
    if (filters?.hasAppointments !== undefined) {
      // Simulado - algunos clientes tienen citas
      filteredCustomers = filteredCustomers.filter(c => 
        filters.hasAppointments ? ['1', '2', '4'].includes(c.id) : !['1', '2', '4'].includes(c.id)
      );
    }
    
    // Aplicar ordenamiento
    if (filters?.sortBy) {
      filteredCustomers.sort((a, b) => {
        let aValue: any = a[filters.sortBy!];
        let bValue: any = b[filters.sortBy!];
        
        if (filters.sortBy === 'createdAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        } else {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (filters.sortOrder === 'desc') {
          return aValue > bValue ? -1 : 1;
        }
        return aValue < bValue ? -1 : 1;
      });
    }
    
    const total = filteredCustomers.length;
    const offset = filters?.offset || 0;
    const limit = filters?.limit || 20;
    
    const paginatedCustomers = filteredCustomers.slice(offset, offset + limit);
    const hasMore = offset + limit < total;
    
    return {
      customers: paginatedCustomers,
      total,
      hasMore
    };
  }

  // Obtener un cliente por ID (MOCK)
  static async getCustomerById(id: string): Promise<Customer> {
    await simulateApiDelay();
    const customer = mockCustomers.find(c => c.id === id);
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }
    return customer;
  }

  // Crear un nuevo cliente (MOCK)
  static async createCustomer(customerData: CreateCustomerData): Promise<Customer> {
    await simulateApiDelay();
    
    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...customerData,
      vehicles: customerData.vehicles || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      workshopId: 'workshop1'
    };
    
    mockCustomers.unshift(newCustomer);
    return newCustomer;
  }

  // Actualizar un cliente existente (MOCK)
  static async updateCustomer(id: string, updates: Partial<CreateCustomerData>): Promise<Customer> {
    await simulateApiDelay();
    
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Cliente no encontrado');
    }
    
    mockCustomers[index] = {
      ...mockCustomers[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return mockCustomers[index];
  }

  // Eliminar un cliente (MOCK)
  static async deleteCustomer(id: string): Promise<void> {
    await simulateApiDelay();
    
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Cliente no encontrado');
    }
    
    mockCustomers.splice(index, 1);
  }

  // Obtener estadísticas de clientes (MOCK)
  static async getCustomerStats(): Promise<CustomerStats> {
    await simulateApiDelay();
    return mockStats;
  }

  // Buscar clientes por término (MOCK)
  static async searchCustomers(query: string, limit: number = 10): Promise<Customer[]> {
    await simulateApiDelay();
    return searchInMockData(query, mockCustomers).slice(0, limit);
  }

  // Obtener clientes por vehículo (MOCK)
  static async getCustomersByVehicle(vehicleQuery: string): Promise<Customer[]> {
    await simulateApiDelay();
    return mockCustomers.filter(customer => 
      customer.vehicles.some(vehicle => 
        vehicle.licensePlate.toLowerCase().includes(vehicleQuery.toLowerCase()) ||
        vehicle.vin?.toLowerCase().includes(vehicleQuery.toLowerCase())
      )
    );
  }

  // Agregar vehículo a un cliente (MOCK)
  static async addVehicleToCustomer(customerId: string, vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> {
    await simulateApiDelay();
    
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }
    
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      ...vehicle
    };
    
    customer.vehicles.push(newVehicle);
    customer.updatedAt = new Date();
    
    return newVehicle;
  }

  // Actualizar vehículo de un cliente (MOCK)
  static async updateCustomerVehicle(customerId: string, vehicleId: string, updates: Partial<Vehicle>): Promise<Vehicle> {
    await simulateApiDelay();
    
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }
    
    const vehicle = customer.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) {
      throw new Error('Vehículo no encontrado');
    }
    
    Object.assign(vehicle, updates);
    customer.updatedAt = new Date();
    
    return vehicle;
  }

  // Eliminar vehículo de un cliente (MOCK)
  static async removeVehicleFromCustomer(customerId: string, vehicleId: string): Promise<void> {
    await simulateApiDelay();
    
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) {
      throw new Error('Cliente no encontrado');
    }
    
    const index = customer.vehicles.findIndex(v => v.id === vehicleId);
    if (index === -1) {
      throw new Error('Vehículo no encontrado');
    }
    
    customer.vehicles.splice(index, 1);
    customer.updatedAt = new Date();
  }

  // Obtener historial de citas de un cliente (MOCK)
  static async getCustomerAppointments(customerId: string): Promise<any[]> {
    await simulateApiDelay();
    // Simulado - retorna citas de ejemplo
    return [
      {
        id: 'apt1',
        service: 'Cambio de aceite',
        date: new Date('2024-03-15'),
        status: 'completed'
      }
    ];
  }

  // Obtener historial de servicios de un cliente (MOCK)
  static async getCustomerServices(customerId: string): Promise<any[]> {
    await simulateApiDelay();
    // Simulado - retorna servicios de ejemplo
    return [
      {
        id: 'svc1',
        service: 'Mantenimiento preventivo',
        date: new Date('2024-02-20'),
        cost: 2500
      }
    ];
  }

  // Exportar clientes a CSV/Excel (MOCK)
  static async exportCustomers(filters?: CustomerFilters, format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    await simulateApiDelay();
    
    // Simular descarga de archivo
    const data = mockCustomers.map(c => ({
      Nombre: c.firstName,
      Apellido: c.lastName,
      Email: c.email,
      Teléfono: c.phone,
      Dirección: c.address || '',
      Vehículos: c.vehicles.length
    }));
    
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    return new Blob([csvContent], { type: 'text/csv' });
  }

  // Importar clientes desde CSV/Excel (MOCK)
  static async importCustomers(file: File): Promise<{
    success: number;
    errors: string[];
    total: number;
  }> {
    await simulateApiDelay();
    
    // Simulado - procesa el archivo
    return {
      success: 5,
      errors: [],
      total: 5
    };
  }

  // Obtener clientes frecuentes (MOCK)
  static async getFrequentCustomers(limit: number = 10): Promise<Customer[]> {
    await simulateApiDelay();
    // Simulado - retorna los primeros clientes como "frecuentes"
    return mockCustomers.slice(0, limit);
  }

  // Obtener clientes inactivos (MOCK)
  static async getInactiveCustomers(months: number = 6): Promise<Customer[]> {
    await simulateApiDelay();
    // Simulado - retorna clientes más antiguos como "inactivos"
    return mockCustomers.slice(-2);
  }
}
