import { create } from 'zustand';
import { Appointment, ReportFilter, TimeSlot } from '@/types';

interface AppointmentState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  filters: ReportFilter;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchAppointments: () => Promise<void>;
  createAppointment: (appointment: Partial<Appointment>) => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  getAvailableSlots: (date: string, serviceId: string) => Promise<TimeSlot[]>;
  setFilters: (filters: Partial<ReportFilter>) => void;
  selectAppointment: (appointment: Appointment | null) => void;
  clearError: () => void;
}

const defaultFilters: ReportFilter = {
  startDate: new Date(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
  serviceIds: [],
  mechanicIds: [],
  status: []
};

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  selectedAppointment: null,
  filters: defaultFilters,
  isLoading: false,
  error: null,

  fetchAppointments: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // const response = await appointmentsService.getAppointments(get().filters);
      // set({ appointments: response });
      
      // Datos de ejemplo para desarrollo
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          customerId: '1',
          customer: {
            id: '1',
            firstName: 'Juan',
            lastName: 'Pérez',
            email: 'juan@example.com',
            phone: '809-123-4567',
            vehicles: [],
            createdAt: new Date()
          },
          serviceId: '1',
          service: {
            id: '1',
            name: 'Cambio de Aceite',
            description: 'Cambio de aceite y filtro',
            price: 1500,
            duration: 60,
            capacity: 2,
            category: { id: '1', name: 'Mantenimiento', color: '#3B82F6', icon: 'wrench' },
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            workshopId: '1'
          },
          scheduledDate: new Date('2024-01-15'),
          startTime: '09:00',
          endTime: '10:00',
          status: 'confirmed',
          notes: 'Cliente solicita aceite sintético',
          assignedMechanic: '1',
          vehicleInfo: {
            brand: 'Toyota',
            model: 'Corolla',
            year: 2020,
            plate: 'ABC123',
            color: 'Blanco',
            mileage: 45000
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          workshopId: '1'
        }
      ];
      
      set({ appointments: mockAppointments, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar citas', 
        isLoading: false 
      });
    }
  },

  createAppointment: async (appointment) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // const newAppointment = await appointmentsService.createAppointment(appointment);
      // set(state => ({ 
      //   appointments: [...state.appointments, newAppointment],
      //   isLoading: false 
      // }));
      
      // Simulación para desarrollo
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...appointment,
        createdAt: new Date(),
        updatedAt: new Date(),
        workshopId: '1'
      } as Appointment;
      
      set(state => ({ 
        appointments: [...state.appointments, newAppointment],
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al crear cita', 
        isLoading: false 
      });
    }
  },

  updateAppointment: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // const updatedAppointment = await appointmentsService.updateAppointment(id, updates);
      // set(state => ({
      //   appointments: state.appointments.map(apt => 
      //     apt.id === id ? { ...apt, ...updatedAppointment } : apt
      //   ),
      //   isLoading: false
      // }));
      
      // Simulación para desarrollo
      set(state => ({
        appointments: state.appointments.map(apt => 
          apt.id === id ? { ...apt, ...updates, updatedAt: new Date() } : apt
        ),
        selectedAppointment: state.selectedAppointment?.id === id 
          ? { ...state.selectedAppointment, ...updates, updatedAt: new Date() }
          : state.selectedAppointment,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al actualizar cita', 
        isLoading: false 
      });
    }
  },

  deleteAppointment: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await appointmentsService.deleteAppointment(id);
      // set(state => ({
      //   appointments: state.appointments.filter(apt => apt.id !== id),
      //   selectedAppointment: state.selectedAppointment?.id === id ? null : state.selectedAppointment,
      //   isLoading: false
      // }));
      
      // Simulación para desarrollo
      set(state => ({
        appointments: state.appointments.filter(apt => apt.id !== id),
        selectedAppointment: state.selectedAppointment?.id === id ? null : state.selectedAppointment,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al eliminar cita', 
        isLoading: false 
      });
    }
  },

  getAvailableSlots: async (date, _serviceId) => {
    try {
      // TODO: Implementar llamada a API real
      // const slots = await appointmentsService.getAvailableSlots(date, serviceId);
      // return slots;
      
      // Simulación para desarrollo
      const slots: TimeSlot[] = [];
      for (let hour = 8; hour <= 17; hour++) {
        slots.push({
          date,
          time: `${hour.toString().padStart(2, '0')}:00`,
          available: Math.random() > 0.3, // 70% de probabilidad de estar disponible
          capacity: 2,
          booked: Math.floor(Math.random() * 2)
        });
      }
      return slots;
    } catch (error) {
      throw new Error('Error al obtener horarios disponibles');
    }
  },

  setFilters: (filters) => {
    set(state => ({ filters: { ...state.filters, ...filters } }));
  },

  selectAppointment: (appointment) => {
    set({ selectedAppointment: appointment });
  },

  clearError: () => {
    set({ error: null });
  }
}));
