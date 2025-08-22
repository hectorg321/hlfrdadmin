import React from 'react';

interface UserFiltersSimpleProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

const UserFiltersSimple: React.FC<UserFiltersSimpleProps> = ({
  filters = {},
  onFiltersChange,
  onClearFilters
}) => {
  console.log('UserFiltersSimple rendered with filters:', filters);

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-primary-500">
          Filtros Simplificados
        </h3>
        <button
          onClick={onClearFilters}
          className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Limpiar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Búsqueda */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            placeholder="Nombre, email..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Rol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rol
          </label>
          <select
            value={filters.role || ''}
            onChange={(e) => onFiltersChange({ ...filters, role: e.target.value || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todos los roles</option>
            <option value="super_admin">Super Admin</option>
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
            value={filters.isActive === undefined ? '' : filters.isActive.toString()}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                onFiltersChange({ ...filters, isActive: undefined });
              } else {
                onFiltersChange({ ...filters, isActive: value === 'true' });
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Todos los estados</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserFiltersSimple;
