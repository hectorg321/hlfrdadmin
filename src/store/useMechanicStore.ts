import { create } from 'zustand';
import { Mechanic, Skill, Certification } from '@/types';

interface MechanicState {
  mechanics: Mechanic[];
  selectedMechanic: Mechanic | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchMechanics: () => Promise<void>;
  createMechanic: (mechanic: Partial<Mechanic>) => Promise<void>;
  updateMechanic: (id: string, updates: Partial<Mechanic>) => Promise<void>;
  deleteMechanic: (id: string) => Promise<void>;
  selectMechanic: (mechanic: Mechanic | null) => void;
  clearError: () => void;
  
  // Specialties
  addSpecialty: (mechanicId: string, specialtyId: string) => Promise<void>;
  removeSpecialty: (mechanicId: string, specialtyId: string) => Promise<void>;
  
  // Skills
  addSkill: (mechanicId: string, skill: Skill) => Promise<void>;
  updateSkill: (mechanicId: string, skillId: string, updates: Partial<Skill>) => Promise<void>;
  removeSkill: (mechanicId: string, skillId: string) => Promise<void>;
  
  // Certifications
  addCertification: (mechanicId: string, certification: Certification) => Promise<void>;
  updateCertification: (mechanicId: string, certId: string, updates: Partial<Certification>) => Promise<void>;
  removeCertification: (mechanicId: string, certId: string) => Promise<void>;
}

export const useMechanicStore = create<MechanicState>((set) => ({
  mechanics: [],
  selectedMechanic: null,
  isLoading: false,
  error: null,

  fetchMechanics: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // const response = await mechanicsService.getMechanics();
      // set({ mechanics: response });
      
      // Datos de ejemplo para desarrollo
      const mockMechanics: Mechanic[] = [
        {
          id: '1',
          firstName: 'Carlos',
          lastName: 'Rodríguez',
          email: 'carlos.rodriguez@taller.com',
          phone: '809-123-4567',
          employeeCode: 'MEC001',
          specialties: [
            { id: '1', name: 'Motor', description: 'Especialista en reparación y mantenimiento de motores', color: '#DC2626', icon: 'cog' },
            { id: '2', name: 'Transmisión', description: 'Especialista en sistemas de transmisión', color: '#7C3AED', icon: 'cog-8-tooth' }
          ],
          experience: 8,
          hourlyRate: 750,
          isActive: true,
          address: 'Calle Principal #123, Santo Domingo',
          emergencyContact: {
            name: 'María Rodríguez',
            relationship: 'Esposa',
            phone: '809-987-6543',
            email: 'maria.rodriguez@email.com'
          },
          skills: [
            { id: '1', name: 'Diagnóstico de Motor', level: 'expert', yearsOfExperience: 8 },
            { id: '2', name: 'Reparación de Transmisión', level: 'advanced', yearsOfExperience: 6 },
            { id: '3', name: 'Sistemas Hidráulicos', level: 'intermediate', yearsOfExperience: 4 }
          ],
          certifications: [
            {
              id: '1',
              name: 'Certificación ASE Motor',
              issuer: 'ASE (Automotive Service Excellence)',
              dateObtained: new Date('2020-03-15'),
              expirationDate: new Date('2025-03-15'),
              certificateNumber: 'ASE-A1-2020-001'
            },
            {
              id: '2',
              name: 'Técnico Toyota',
              issuer: 'Toyota Motor Corporation',
              dateObtained: new Date('2019-08-20'),
              expirationDate: new Date('2024-08-20'),
              certificateNumber: 'TOY-TEC-2019-456'
            }
          ],
          createdAt: new Date('2021-01-15'),
          updatedAt: new Date(),
          workshopId: '1'
        },
        {
          id: '2',
          firstName: 'Miguel',
          lastName: 'Santos',
          email: 'miguel.santos@taller.com',
          phone: '809-234-5678',
          employeeCode: 'MEC002',
          specialties: [
            { id: '3', name: 'Frenos', description: 'Especialista en sistemas de frenos', color: '#EA580C', icon: 'stop' },
            { id: '5', name: 'Eléctrico', description: 'Especialista en sistemas eléctricos y electrónicos', color: '#FBBF24', icon: 'bolt' }
          ],
          experience: 5,
          hourlyRate: 650,
          isActive: true,
          address: 'Avenida Independencia #456, Santiago',
          emergencyContact: {
            name: 'Ana Santos',
            relationship: 'Madre',
            phone: '809-876-5432'
          },
          skills: [
            { id: '4', name: 'Sistemas de Frenos ABS', level: 'expert', yearsOfExperience: 5 },
            { id: '5', name: 'Diagnóstico Eléctrico', level: 'advanced', yearsOfExperience: 4 },
            { id: '6', name: 'Instalación de Accesorios', level: 'intermediate', yearsOfExperience: 3 }
          ],
          certifications: [
            {
              id: '3',
              name: 'Certificación Sistemas Eléctricos',
              issuer: 'NIASE (National Institute for Automotive Service Excellence)',
              dateObtained: new Date('2021-06-10'),
              expirationDate: new Date('2026-06-10'),
              certificateNumber: 'NIASE-E1-2021-789'
            }
          ],
          createdAt: new Date('2021-06-01'),
          updatedAt: new Date(),
          workshopId: '1'
        },
        {
          id: '3',
          firstName: 'Luis',
          lastName: 'Martínez',
          email: 'luis.martinez@taller.com',
          phone: '809-345-6789',
          employeeCode: 'MEC003',
          specialties: [
            { id: '4', name: 'Suspensión', description: 'Especialista en sistemas de suspensión y dirección', color: '#0891B2', icon: 'arrow-trending-up' },
            { id: '6', name: 'Aire Acondicionado', description: 'Especialista en sistemas de climatización', color: '#06B6D4', icon: 'snowflake' }
          ],
          experience: 12,
          hourlyRate: 850,
          isActive: true,
          dateOfBirth: new Date('1985-04-12'),
          address: 'Calle Mercedes #789, La Romana',
          emergencyContact: {
            name: 'Carmen Martínez',
            relationship: 'Hermana',
            phone: '809-765-4321',
            email: 'carmen.martinez@email.com'
          },
          skills: [
            { id: '7', name: 'Alineación y Balanceo', level: 'expert', yearsOfExperience: 12 },
            { id: '8', name: 'Sistemas de Suspensión', level: 'expert', yearsOfExperience: 10 },
            { id: '9', name: 'Aire Acondicionado Automotriz', level: 'advanced', yearsOfExperience: 8 }
          ],
          certifications: [
            {
              id: '4',
              name: 'Master Technician',
              issuer: 'ASE (Automotive Service Excellence)',
              dateObtained: new Date('2018-11-30'),
              expirationDate: new Date('2023-11-30'),
              certificateNumber: 'ASE-MT-2018-999'
            },
            {
              id: '5',
              name: 'Certificación Aire Acondicionado R-134a',
              issuer: 'EPA (Environmental Protection Agency)',
              dateObtained: new Date('2020-02-14'),
              certificateNumber: 'EPA-609-2020-147'
            }
          ],
          createdAt: new Date('2020-03-10'),
          updatedAt: new Date(),
          workshopId: '1'
        }
      ];
      
      set({ mechanics: mockMechanics, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar mecánicos', 
        isLoading: false 
      });
    }
  },

  createMechanic: async (mechanic) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // const newMechanic = await mechanicsService.createMechanic(mechanic);
      // set(state => ({ 
      //   mechanics: [...state.mechanics, newMechanic],
      //   isLoading: false 
      // }));
      
      // Simulación para desarrollo
      const newMechanic: Mechanic = {
        id: Date.now().toString(),
        specialties: [],
        skills: [],
        certifications: [],
        isActive: true,
        experience: 0,
        hourlyRate: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
        workshopId: '1',
        ...mechanic
      } as Mechanic;
      
      set(state => ({ 
        mechanics: [...state.mechanics, newMechanic],
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al crear mecánico', 
        isLoading: false 
      });
    }
  },

  updateMechanic: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // const updatedMechanic = await mechanicsService.updateMechanic(id, updates);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.map(mech => 
          mech.id === id ? { ...mech, ...updates, updatedAt: new Date() } : mech
        ),
        selectedMechanic: state.selectedMechanic?.id === id 
          ? { ...state.selectedMechanic, ...updates, updatedAt: new Date() }
          : state.selectedMechanic,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al actualizar mecánico', 
        isLoading: false 
      });
    }
  },

  deleteMechanic: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await mechanicsService.deleteMechanic(id);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.filter(mech => mech.id !== id),
        selectedMechanic: state.selectedMechanic?.id === id ? null : state.selectedMechanic,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al eliminar mecánico', 
        isLoading: false 
      });
    }
  },

  selectMechanic: (mechanic) => {
    set({ selectedMechanic: mechanic });
  },

  clearError: () => {
    set({ error: null });
  },

  // Specialties
  addSpecialty: async (mechanicId, specialtyId) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await mechanicsService.addSpecialty(mechanicId, specialtyId);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.map(mech => {
          if (mech.id === mechanicId) {
            // Aquí deberías obtener la especialidad completa de una lista
            const newSpecialty = { id: specialtyId, name: 'Nueva Especialidad', description: '', color: '#000', icon: 'wrench' };
            return { ...mech, specialties: [...mech.specialties, newSpecialty] };
          }
          return mech;
        }),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al agregar especialidad', 
        isLoading: false 
      });
    }
  },

  removeSpecialty: async (mechanicId, specialtyId) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await mechanicsService.removeSpecialty(mechanicId, specialtyId);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.map(mech => {
          if (mech.id === mechanicId) {
            return { ...mech, specialties: mech.specialties.filter(s => s.id !== specialtyId) };
          }
          return mech;
        }),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al eliminar especialidad', 
        isLoading: false 
      });
    }
  },

  // Skills
  addSkill: async (mechanicId, skill) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await mechanicsService.addSkill(mechanicId, skill);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.map(mech => {
          if (mech.id === mechanicId) {
            const newSkill = { ...skill, id: Date.now().toString() };
            return { ...mech, skills: [...mech.skills, newSkill] };
          }
          return mech;
        }),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al agregar habilidad', 
        isLoading: false 
      });
    }
  },

  updateSkill: async (mechanicId, skillId, updates) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await mechanicsService.updateSkill(mechanicId, skillId, updates);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.map(mech => {
          if (mech.id === mechanicId) {
            return {
              ...mech,
              skills: mech.skills.map(skill => 
                skill.id === skillId ? { ...skill, ...updates } : skill
              )
            };
          }
          return mech;
        }),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al actualizar habilidad', 
        isLoading: false 
      });
    }
  },

  removeSkill: async (mechanicId, skillId) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await mechanicsService.removeSkill(mechanicId, skillId);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.map(mech => {
          if (mech.id === mechanicId) {
            return { ...mech, skills: mech.skills.filter(s => s.id !== skillId) };
          }
          return mech;
        }),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al eliminar habilidad', 
        isLoading: false 
      });
    }
  },

  // Certifications
  addCertification: async (mechanicId, certification) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await mechanicsService.addCertification(mechanicId, certification);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.map(mech => {
          if (mech.id === mechanicId) {
            const newCertification = { ...certification, id: Date.now().toString() };
            return { ...mech, certifications: [...mech.certifications, newCertification] };
          }
          return mech;
        }),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al agregar certificación', 
        isLoading: false 
      });
    }
  },

  updateCertification: async (mechanicId, certId, updates) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await mechanicsService.updateCertification(mechanicId, certId, updates);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.map(mech => {
          if (mech.id === mechanicId) {
            return {
              ...mech,
              certifications: mech.certifications.map(cert => 
                cert.id === certId ? { ...cert, ...updates } : cert
              )
            };
          }
          return mech;
        }),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al actualizar certificación', 
        isLoading: false 
      });
    }
  },

  removeCertification: async (mechanicId, certId) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implementar llamada a API real
      // await mechanicsService.removeCertification(mechanicId, certId);
      
      // Simulación para desarrollo
      set(state => ({
        mechanics: state.mechanics.map(mech => {
          if (mech.id === mechanicId) {
            return { ...mech, certifications: mech.certifications.filter(c => c.id !== certId) };
          }
          return mech;
        }),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al eliminar certificación', 
        isLoading: false 
      });
    }
  }
}));
