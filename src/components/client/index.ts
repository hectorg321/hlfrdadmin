// Layout components
export { default as ClientLayout } from '../layout/ClientLayout';
export { default as PageHeader } from '../layout/PageHeader';
export { default as SectionHeader } from '../layout/SectionHeader';
export { default as EmptyState } from '../layout/EmptyState';
export { default as LoadingSkeleton } from '../layout/LoadingSkeleton';

// UI components
export { default as BottomSheet } from '../ui/MobileComponents';
export { default as ServiceMobileCard } from '../ui/MobileComponents';
export { default as ImageGallery } from '../ui/MobileComponents';
export { default as FAB } from '../ui/MobileComponents';
export { default as TabNavigation } from '../ui/MobileComponents';
export { default as LineClamp } from '../ui/MobileComponents';

// Page components
export { default as HomePage } from '../home/HomePage';
export { default as ProfilePage } from '../profile/ProfilePage';
export { default as ClientServiceHistoryPage } from '../../pages/ClientServiceHistoryPage';
export { default as ClientAppointmentsPage } from '../../pages/ClientAppointmentsPage';
export { default as ClientServicesPage } from '../../pages/ClientServicesPage';
export { default as ClientDashboardPage } from '../../pages/ClientDashboardPage';
export { default as ClientMainMenu } from './ClientMainMenu';

// Auth components
export { default as ClientProtectedRoute } from '../auth/ClientProtectedRoute';

// Types
export * from '../../types/clientTypes';

// Hooks
export * from '../../hooks/useClientAuth';
