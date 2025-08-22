import React from 'react';
import { 
  HomeIcon, 
  WrenchIcon, 
  CalendarIcon, 
  PhotoIcon, 
  UserIcon,
  HomeIcon as HomeSolidIcon,
  WrenchIcon as WrenchSolidIcon,
  CalendarIcon as CalendarSolidIcon,
  PhotoIcon as PhotoSolidIcon,
  UserIcon as UserSolidIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeSolidIconFilled,
  WrenchIcon as WrenchSolidIconFilled,
  CalendarIcon as CalendarSolidIconFilled,
  PhotoIcon as PhotoSolidIconFilled,
  UserIcon as UserSolidIconFilled
} from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';

interface ClientLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  showHeader?: boolean;
  title?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeIcon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

const bottomNavItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: HomeIcon,
    activeIcon: HomeSolidIconFilled,
    path: '/'
  },
  {
    id: 'services',
    label: 'Servicios',
    icon: WrenchIcon,
    activeIcon: WrenchSolidIconFilled,
    path: '/services'
  },
  {
    id: 'appointments',
    label: 'Mis Citas',
    icon: CalendarIcon,
    activeIcon: CalendarSolidIconFilled,
    path: '/appointments'
  },
  {
    id: 'feed',
    label: 'Galería',
    icon: PhotoIcon,
    activeIcon: PhotoSolidIconFilled,
    path: '/feed'
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: UserIcon,
    activeIcon: UserSolidIconFilled,
    path: '/profile'
  }
];

export const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  showBottomNav = true,
  showHeader = true,
  title,
  onBack,
  rightAction
}) => {
  const [activeTab, setActiveTab] = React.useState('home');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Aquí podrías implementar la navegación real
    console.log('Navigating to:', tabId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      {showHeader && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {title && (
                <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              )}
            </div>
            {rightAction && (
              <div>{rightAction}</div>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="flex items-center justify-around px-2 py-2">
            {bottomNavItems.map((item) => {
              const Icon = activeTab === item.id ? item.activeIcon : item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={cn(
                    'flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors min-w-0 flex-1',
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <Icon className={cn(
                    'w-6 h-6',
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  )} />
                  <span className={cn(
                    'text-xs font-medium truncate w-full text-center',
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  )}>
                    {item.label}
                  </span>
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

// Componente de header personalizado para páginas específicas
export const PageHeader: React.FC<{
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  showBorder?: boolean;
}> = ({ title, subtitle, onBack, rightAction, showBorder = true }) => {
  return (
    <div className={cn(
      'bg-white px-4 py-4',
      showBorder && 'border-b border-gray-200'
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-gray-900 truncate">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-500 truncate">{subtitle}</p>
            )}
          </div>
        </div>
        {rightAction && (
          <div className="flex-shrink-0 ml-3">
            {rightAction}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de sección con título
export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, className }) => {
  return (
    <div className={cn('px-4 py-3', className)}>
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {action && (
          <div className="flex-shrink-0 ml-3">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de estado vacío
export const EmptyState: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ icon: Icon, title, description, action, className }) => {
  return (
    <div className={cn('text-center py-12 px-4', className)}>
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

// Componente de loading skeleton
export const LoadingSkeleton: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className }) => {
  return (
    <div className={cn('animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'bg-gray-200 rounded h-4 mb-3',
            index === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
};
