import { apiClient } from './api';
import { Appointment, ReportFilter, TimeSlot } from '@/types';

export class AppointmentsService {
  static async getAppointments(filters?: ReportFilter): Promise<Appointment[]> {
    const response = await apiClient.get('/appointments', { params: filters });
    return response.data;
  }

  static async getAppointmentById(id: string): Promise<Appointment> {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  }

  static async createAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
    const response = await apiClient.post('/appointments', appointment);
    return response.data;
  }

  static async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment> {
    const response = await apiClient.patch(`/appointments/${id}`, updates);
    return response.data;
  }

  static async deleteAppointment(id: string): Promise<void> {
    await apiClient.delete(`/appointments/${id}`);
  }

  static async getAvailableSlots(date: string, serviceId: string): Promise<TimeSlot[]> {
    const response = await apiClient.get(`/appointments/available-slots`, {
      params: { date, serviceId }
    });
    return response.data;
  }

  static async updateAppointmentStatus(id: string, status: string): Promise<Appointment> {
    const response = await apiClient.patch(`/appointments/${id}/status`, { status });
    return response.data;
  }

  static async assignMechanic(appointmentId: string, mechanicId: string): Promise<Appointment> {
    const response = await apiClient.patch(`/appointments/${appointmentId}/assign-mechanic`, {
      mechanicId
    });
    return response.data;
  }

  static async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    const response = await apiClient.get(`/appointments/by-date/${date}`);
    return response.data;
  }

  static async getAppointmentsByCustomer(customerId: string): Promise<Appointment[]> {
    const response = await apiClient.get(`/appointments/by-customer/${customerId}`);
    return response.data;
  }

  static async getAppointmentsByMechanic(mechanicId: string): Promise<Appointment[]> {
    const response = await apiClient.get(`/appointments/by-mechanic/${mechanicId}`);
    return response.data;
  }

  static async getAppointmentStats(filters: ReportFilter): Promise<any> {
    const response = await apiClient.get('/appointments/stats', { params: filters });
    return response.data;
  }
}
