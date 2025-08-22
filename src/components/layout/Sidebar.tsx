import { useNavigate } from 'react-router-dom';
import { SidebarItem } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

interface SidebarProps {
  items: SidebarItem[];
  currentPath: string;
  onItemClick?: () => void;
}

const Sidebar = ({ items, currentPath, onItemClick }: SidebarProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Debug logging
  console.log('Sidebar rendered with:', { items, currentPath, user });

  const handleItemClick = (item: SidebarItem) => {
    console.log('Sidebar item clicked:', item);
    
    // Verificar permisos si el usuario no es super_admin
    if (item.permissions && user?.role !== 'super_admin') {
      const hasPermission = item.permissions.some(permission => 
        user?.permissions.some(userPerm => userPerm.id === permission)
      );
      if (!hasPermission) {
        console.log('User does not have permission for:', item.id);
        return;
      }
    }

    navigate(item.path);
    onItemClick?.();
  };

  const filteredItems = items.filter(item => {
    if (item.permissions && user?.role !== 'super_admin') {
      const hasPermission = item.permissions.some(permission => 
        user?.permissions.some(userPerm => userPerm.id === permission)
      );
      console.log(`Item ${item.id} permission check:`, hasPermission);
      return hasPermission;
    }
    console.log(`Item ${item.id} no permissions required, showing`);
    return true;
  });

  console.log('Filtered items:', filteredItems);

  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {filteredItems.map((item) => {
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
          </button>
        );
      })}
    </nav>
  );
};

export default Sidebar; 