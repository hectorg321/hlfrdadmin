// Tipos específicos para la aplicación cliente

// Tipos de autenticación del cliente
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
  preferences: CustomerPreferences;
  vehicles: Vehicle[];
}

export interface CustomerPreferences {
  notifications: {
    email: boolean;
    whatsapp: boolean;
    push: boolean;
  };
  privacy: {
    canPost: boolean;
    canComment: boolean;
    profileVisible: boolean;
  };
  language: 'es' | 'en';
  theme: 'light' | 'dark' | 'auto';
}

export interface Vehicle {
  id: string;
  customerId: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color?: string;
  mileage?: number;
  isDefault: boolean;
  createdAt: Date;
}

// Formularios de autenticación
export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  vehicle: {
    brand: string;
    model: string;
    year: number;
    plate: string;
    color?: string;
  };
}

export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Tipos de servicios para el cliente
export interface ServiceClient {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  duration: number; // en minutos
  price: number;
  category: ServiceCategory;
  imageUrl?: string;
  gallery: string[];
  features: string[];
  requirements?: string[];
  isPopular: boolean;
  rating: number;
  reviewCount: number;
  estimatedTime: string; // "30 min - 1 hora"
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  imageUrl?: string;
}

// Sistema de reservas
export interface BookingFlow {
  step: 'service' | 'datetime' | 'vehicle' | 'confirmation';
  selectedService: ServiceClient | null;
  selectedDate: string | null;
  selectedTime: string | null;
  selectedVehicle: Vehicle | null;
  specialRequests?: string;
}

export interface AvailableSlot {
  date: string;
  time: string;
  available: boolean;
  price: number;
  estimatedDuration: number;
}

export interface BookingConfirmation {
  appointmentId: string;
  service: ServiceClient;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  vehicle: Vehicle;
  totalPrice: number;
  estimatedDuration: number;
  workshopInfo: WorkshopInfo;
  confirmationCode: string;
}

export interface WorkshopInfo {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  coordinates: [number, number];
  workingHours: WorkingHours;
}

export interface WorkingHours {
  monday: TimeRange;
  tuesday: TimeRange;
  wednesday: TimeRange;
  thursday: TimeRange;
  friday: TimeRange;
  saturday: TimeRange;
  sunday: TimeRange;
}

export interface TimeRange {
  isOpen: boolean;
  start: string; // "08:00"
  end: string;   // "17:00"
}

// Gestión de citas del cliente
export interface ClientAppointment {
  id: string;
  service: ServiceClient;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  vehicle: Vehicle;
  notes?: string;
  price: number;
  confirmationCode: string;
  canCancel: boolean;
  canReschedule: boolean;
  createdAt: Date;
  workshop: WorkshopInfo;
}

export type AppointmentStatus = 
  | 'confirmed'     // Confirmada
  | 'pending'       // Pendiente de confirmación
  | 'in_progress'   // En progreso
  | 'completed'     // Completada
  | 'cancelled'     // Cancelada
  | 'rescheduled';  // Reprogramada

export interface AppointmentActions {
  canCancel: boolean;
  canReschedule: boolean;
  canRate: boolean;
  canShare: boolean;
}

export interface AppointmentFilters {
  status?: AppointmentStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  serviceIds?: string[];
}

// Feed social
export interface FeedPost {
  id: string;
  content: string;
  images: FeedImage[];
  video?: FeedVideo;
  authorType: 'workshop' | 'customer';
  author: FeedAuthor;
  isPublished: boolean;
  isPinned: boolean;
  createdAt: Date;
  stats: PostStats;
  userInteraction: UserInteraction;
  comments: FeedComment[];
  tags: string[];
}

export interface FeedImage {
  id: string;
  url: string;
  thumbnail: string;
  alt?: string;
  width: number;
  height: number;
}

export interface FeedVideo {
  id: string;
  url: string;
  thumbnail: string;
  duration: number;
  width: number;
  height: number;
}

export interface FeedAuthor {
  id: string;
  name: string;
  avatar?: string;
  type: 'workshop' | 'customer';
  isVerified?: boolean;
}

export interface PostStats {
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

export interface UserInteraction {
  hasLiked: boolean;
  hasShared: boolean;
  hasBookmarked: boolean;
}

export interface FeedComment {
  id: string;
  postId: string;
  content: string;
  author: FeedAuthor;
  createdAt: Date;
  likes: number;
  userHasLiked: boolean;
  replies?: FeedComment[];
}

export interface CreatePostForm {
  content: string;
  images: File[];
  video?: File;
  tags: string[];
  visibility: 'public' | 'followers';
}

// Notificaciones del cliente
export interface ClientNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: NotificationData;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  actionLabel?: string;
}

export type NotificationType = 
  | 'appointment_reminder'
  | 'appointment_confirmed'
  | 'appointment_cancelled'
  | 'appointment_rescheduled'
  | 'service_completed'
  | 'promotion'
  | 'feed_activity'
  | 'system_update';

export interface NotificationData {
  appointmentId?: string;
  serviceId?: string;
  postId?: string;
  [key: string]: any;
}

export interface NotificationFilters {
  type?: NotificationType[];
  isRead?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Filtros de servicios
export interface ServiceFilters {
  categoryId?: string;
  priceRange?: [number, number];
  duration?: 'quick' | 'medium' | 'long'; // < 30min, 30-60min, > 60min
  sortBy: 'popularity' | 'price_low' | 'price_high' | 'rating' | 'name';
  searchQuery?: string;
}

// Componentes de UI
export interface ServiceCardProps {
  service: ServiceClient;
  onSelect: (service: ServiceClient) => void;
  onQuickBook?: (service: ServiceClient) => void;
}

export interface ServiceDetailProps {
  service: ServiceClient;
  onBook: () => void;
  onShare: () => void;
}

// Datos del taller
export interface WorkshopData {
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  website?: string;
  coordinates: [number, number];
  workingHours: WorkingHours;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  services: ServiceClient[];
  rating: number;
  reviewCount: number;
}
