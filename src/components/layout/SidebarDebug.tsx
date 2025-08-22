import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarItem } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

interface SidebarDebugProps {
  items: SidebarItem[];
  currentPath: string;
  onItemClick?: () => void;
}

const SidebarDebug: React.FC<SidebarDebugProps> = ({ items, currentPath, onItemClick }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  console.log('SidebarDebug rendered with:', { items, currentPath, user });

  const handleItemClick = (item: SidebarItem) => {
    console.log('SidebarDebug item clicked:', item);
    navigate(item.path);
    onItemClick?.();
  };

  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded">
        <p className="text-xs text-yellow-800">
          <strong>Debug Info:</strong><br/>
          Total items: {items.length}<br/>
          Current path: {currentPath}<br/>
          User role: {user?.role}<br/>
          User permissions: {user?.permissions?.length || 0}
        </p>
      </div>
      
      {items.map((item) => {
        const isActive = currentPath === item.path;
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`sidebar-item w-full text-left ${
              isActive ? 'active' : ''
            }`}
          >
            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.label}
            {item.permissions && (
              <span className="ml-2 text-xs text-gray-400">
                ({item.permissions.join(', ')})
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default SidebarDebug;
