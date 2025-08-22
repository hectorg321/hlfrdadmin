import React from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface UserFiltersData {
  search?: string;
  role?: string;
  isActive?: boolean;
  workshopId?: string;
}

interface UserFiltersProps {
  filters: UserFiltersData;
  onFiltersChange: (filters: UserFiltersData) => void;
  onClearFilters: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  filters = {},
  onFiltersChange,
  onClearFilters
}) => {
  // Debug logging
  console.log('UserFilters component rendered with filters:', filters);
  
  // Asegurar que filters sea un objeto válido
  const safeFilters = filters || {};
  
  const handleSearchChange = (value: string) => {
    try {
      const newFilters = { ...safeFilters, search: value };
      onFiltersChange(newFilters);
    } catch (error) {
      console.error('Error updating search filter:', error);
    }
  };

  const handleRoleChange = (role: string) => {
    try {
      const newFilters = { ...safeFilters, role: role || undefined };
      onFiltersChange(newFilters);
    } catch (error) {
      console.error('Error updating role filter:', error);
    }
  };

  const handleStatusChange = (isActive: boolean | undefined) => {
    try {
      const newFilters = { ...safeFilters, isActive };
      onFiltersChange(newFilters);
    } catch (error) {
      console.error('Error updating status filter:', error);
    }
  };

  const hasActiveFilters = Boolean(safeFilters.search || safeFilters.role || safeFilters.isActive !== undefined);

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-primary-500 flex items-center">
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Limpiar Filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={safeFilters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Nombre, email..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Rol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rol
          </label>
          <select
            value={safeFilters.role || ''}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todos los roles</option>
            <option value="super_admin">Super Administrador</option>
            <option value="admin">Administrador</option>
            <option value="employee">Empleado</option>
            <option value="mechanic">Mecánico</option>
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={safeFilters.isActive === undefined ? '' : safeFilters.isActive.toString()}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                handleStatusChange(undefined);
              } else {
                handleStatusChange(value === 'true');
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todos los estados</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        {/* Acciones */}
        <div className="flex items-end">
          <Button
            variant="primary"
            onClick={() => onFiltersChange(safeFilters)}
            className="w-full"
          >
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
