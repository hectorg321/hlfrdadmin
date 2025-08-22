import { apiClient } from './api';
import { Mechanic, Skill, Certification } from '@/types';

export class MechanicsService {
  static async getMechanics(): Promise<Mechanic[]> {
    const response = await apiClient.get('/mechanics');
    return response.data;
  }

  static async getMechanicById(id: string): Promise<Mechanic> {
    const response = await apiClient.get(`/mechanics/${id}`);
    return response.data;
  }

  static async createMechanic(mechanic: Partial<Mechanic>): Promise<Mechanic> {
    const response = await apiClient.post('/mechanics', mechanic);
    return response.data;
  }

  static async updateMechanic(id: string, updates: Partial<Mechanic>): Promise<Mechanic> {
    const response = await apiClient.patch(`/mechanics/${id}`, updates);
    return response.data;
  }

  static async deleteMechanic(id: string): Promise<void> {
    await apiClient.delete(`/mechanics/${id}`);
  }

  static async activateMechanic(id: string): Promise<Mechanic> {
    const response = await apiClient.patch(`/mechanics/${id}/activate`);
    return response.data;
  }

  static async deactivateMechanic(id: string): Promise<Mechanic> {
    const response = await apiClient.patch(`/mechanics/${id}/deactivate`);
    return response.data;
  }

  // Specialties
  static async addSpecialty(mechanicId: string, specialtyId: string): Promise<Mechanic> {
    const response = await apiClient.post(`/mechanics/${mechanicId}/specialties`, {
      specialtyId
    });
    return response.data;
  }

  static async removeSpecialty(mechanicId: string, specialtyId: string): Promise<Mechanic> {
    const response = await apiClient.delete(`/mechanics/${mechanicId}/specialties/${specialtyId}`);
    return response.data;
  }

  // Skills
  static async addSkill(mechanicId: string, skill: Omit<Skill, 'id'>): Promise<Mechanic> {
    const response = await apiClient.post(`/mechanics/${mechanicId}/skills`, skill);
    return response.data;
  }

  static async updateSkill(mechanicId: string, skillId: string, updates: Partial<Skill>): Promise<Mechanic> {
    const response = await apiClient.patch(`/mechanics/${mechanicId}/skills/${skillId}`, updates);
    return response.data;
  }

  static async removeSkill(mechanicId: string, skillId: string): Promise<Mechanic> {
    const response = await apiClient.delete(`/mechanics/${mechanicId}/skills/${skillId}`);
    return response.data;
  }

  // Certifications
  static async addCertification(mechanicId: string, certification: Omit<Certification, 'id'>): Promise<Mechanic> {
    const response = await apiClient.post(`/mechanics/${mechanicId}/certifications`, certification);
    return response.data;
  }

  static async updateCertification(mechanicId: string, certId: string, updates: Partial<Certification>): Promise<Mechanic> {
    const response = await apiClient.patch(`/mechanics/${mechanicId}/certifications/${certId}`, updates);
    return response.data;
  }

  static async removeCertification(mechanicId: string, certId: string): Promise<Mechanic> {
    const response = await apiClient.delete(`/mechanics/${mechanicId}/certifications/${certId}`);
    return response.data;
  }

  // Filters and search
  static async searchMechanics(query: string): Promise<Mechanic[]> {
    const response = await apiClient.get('/mechanics/search', {
      params: { q: query }
    });
    return response.data;
  }

  static async getMechanicsBySpecialty(specialtyId: string): Promise<Mechanic[]> {
    const response = await apiClient.get(`/mechanics/by-specialty/${specialtyId}`);
    return response.data;
  }

  static async getAvailableMechanics(date: string, startTime: string, endTime: string): Promise<Mechanic[]> {
    const response = await apiClient.get('/mechanics/available', {
      params: { date, startTime, endTime }
    });
    return response.data;
  }

  // Statistics
  static async getMechanicStats(mechanicId: string): Promise<any> {
    const response = await apiClient.get(`/mechanics/${mechanicId}/stats`);
    return response.data;
  }

  static async getMechanicsOverview(): Promise<any> {
    const response = await apiClient.get('/mechanics/overview');
    return response.data;
  }

  // Work assignments
  static async getMechanicWorkload(mechanicId: string, startDate: string, endDate: string): Promise<any> {
    const response = await apiClient.get(`/mechanics/${mechanicId}/workload`, {
      params: { startDate, endDate }
    });
    return response.data;
  }

  static async assignMechanicToAppointment(mechanicId: string, appointmentId: string): Promise<any> {
    const response = await apiClient.post(`/mechanics/${mechanicId}/assignments`, {
      appointmentId
    });
    return response.data;
  }

  static async unassignMechanicFromAppointment(mechanicId: string, appointmentId: string): Promise<any> {
    const response = await apiClient.delete(`/mechanics/${mechanicId}/assignments/${appointmentId}`);
    return response.data;
  }
}
