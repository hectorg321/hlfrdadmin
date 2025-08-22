import {
  HomeIcon,
  CalendarIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  PhotoIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  WrenchIcon
} from '@heroicons/react/24/outline';

import { SidebarItem } from '@/types';

export const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, path: '/admin/dashboard' },
  { id: 'appointments', label: 'Citas', icon: CalendarIcon, path: '/admin/appointments' },
  { id: 'services', label: 'Servicios', icon: WrenchScrewdriverIcon, path: '/admin/services' },
  { id: 'mechanics', label: 'Mecánicos', icon: WrenchIcon, path: '/admin/mechanics' },
  { id: 'customers', label: 'Clientes', icon: UsersIcon, path: '/admin/customers' },
  { id: 'feed', label: 'Feed Social', icon: PhotoIcon, path: '/admin/feed' },
  { id: 'reports', label: 'Reportes', icon: ChartBarIcon, path: '/admin/reports' },
  { id: 'users', label: 'Usuarios Admin', icon: UserGroupIcon, path: '/admin/users', permissions: ['super_admin'] },
  { id: 'settings', label: 'Configuración', icon: Cog6ToothIcon, path: '/admin/settings' }
];

export const routes = {
  login: '/admin/login',
  dashboard: '/admin/dashboard',
  appointments: '/admin/appointments',
  services: '/admin/services',
  mechanics: '/admin/mechanics',
  customers: '/admin/customers',
  feed: '/admin/feed',
  reports: '/admin/reports',
  users: '/admin/users',
  settings: '/admin/settings'
}; 