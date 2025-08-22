// Tipos de usuario
export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'admin' | 'employee' | 'mechanic';
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  workshopId: string;
  avatar?: string;
  phone?: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

// Tipos de servicios
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // en minutos
  capacity: number; // servicios por hora
  category: ServiceCategory;
  isActive: boolean;
  requirements?: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  workshopId: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

// Tipos de citas
export interface Appointment {
  id: string;
  customerId: string;
  customer: Customer;
  serviceId: string;
  service: Service;
  scheduledDate: Date;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  assignedMechanic?: string;
  vehicleInfo: VehicleInfo;
  createdAt: Date;
  updatedAt: Date;
  workshopId: string;
}

export type AppointmentStatus = 
  | 'scheduled' 
  | 'confirmed' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'no_show';

export interface VehicleInfo {
  brand: string;
  model: string;
  year: number;
  plate: string;
  color?: string;
  mileage?: number;
}

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
  capacity: number;
  booked: number;
}

// Tipos de mecánicos
export interface Mechanic {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeCode: string;
  specialties: MechanicSpecialty[];
  experience: number; // años de experiencia
  hourlyRate: number;
  isActive: boolean;
  avatar?: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: EmergencyContact;
  skills: Skill[];
  certifications: Certification[];
  createdAt: Date;
  updatedAt: Date;
  workshopId: string;
}

export interface MechanicSpecialty {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateObtained: Date;
  expirationDate?: Date;
  certificateNumber?: string;
  imageUrl?: string;
}

// Tipos de clientes
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: Date;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  vehicles: Vehicle[];
  createdAt: Date;
  updatedAt: Date;
  workshopId: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin?: string;
  color: string;
}

// Tipos de feed social
export interface FeedPost {
  id: string;
  title: string;
  content: string;
  images: string[];
  author: AdminUser;
  likes: Like[];
  comments: Comment[];
  isPublished: boolean;
  createdAt: Date;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: AdminUser;
  createdAt: Date;
}

// Tipos de reportes
export interface Report {
  id: string;
  title: string;
  type: 'financial' | 'operational' | 'customer' | 'service';
  data: any;
  generatedAt: Date;
}

export interface HourStats {
  hour: number;
  appointments: number;
  revenue: number;
}

export interface ReportFilter {
  startDate: Date;
  endDate: Date;
  serviceIds?: string[];
  mechanicIds?: string[];
  status?: AppointmentStatus[];
}

export interface AppointmentReport {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShowAppointments: number;
  averageDuration: number;
  totalRevenue: number;
  topServices: ServiceStats[];
  dailyStats: DayStats[];
  hourlyDistribution: HourStats[];
}

export interface ServiceStats {
  serviceId: string;
  serviceName: string;
  count: number;
  revenue: number;
  averageRating?: number;
}

export interface DayStats {
  date: string;
  appointments: number;
  revenue: number;
  completionRate: number;
}

// Tipos de UI
export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  permissions?: string[];
}

export interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface TableColumn<T> {
  key: keyof T | 'actions';
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

// Constantes
export const defaultCategories: ServiceCategory[] = [
  { id: '1', name: 'Mantenimiento', color: '#3B82F6', icon: 'wrench' },
  { id: '2', name: 'Reparación', color: '#EF4444', icon: 'hammer' },
  { id: '3', name: 'Limpieza', color: '#10B981', icon: 'sparkles' },
  { id: '4', name: 'Diagnóstico', color: '#F59E0B', icon: 'search' }
];

export const defaultMechanicSpecialties: MechanicSpecialty[] = [
  { id: '1', name: 'Motor', description: 'Especialista en reparación y mantenimiento de motores', color: '#DC2626', icon: 'cog' },
  { id: '2', name: 'Transmisión', description: 'Especialista en sistemas de transmisión', color: '#7C3AED', icon: 'cog-8-tooth' },
  { id: '3', name: 'Frenos', description: 'Especialista en sistemas de frenos', color: '#EA580C', icon: 'stop' },
  { id: '4', name: 'Suspensión', description: 'Especialista en sistemas de suspensión y dirección', color: '#0891B2', icon: 'arrow-trending-up' },
  { id: '5', name: 'Eléctrico', description: 'Especialista en sistemas eléctricos y electrónicos', color: '#FBBF24', icon: 'bolt' },
  { id: '6', name: 'Aire Acondicionado', description: 'Especialista en sistemas de climatización', color: '#06B6D4', icon: 'snowflake' },
  { id: '7', name: 'Carrocería', description: 'Especialista en reparación de carrocería y pintura', color: '#84CC16', icon: 'paint-brush' },
  { id: '8', name: 'Diagnóstico', description: 'Especialista en diagnóstico computarizado', color: '#8B5CF6', icon: 'computer-desktop' }
];

export const defaultPermissions: Permission[] = [
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