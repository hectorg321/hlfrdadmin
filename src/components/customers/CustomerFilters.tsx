import React, { useState, useEffect } from 'react';
import { CustomerFilters as CustomerFiltersType } from '../../services/customersService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  XMarkIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

interface CustomerFiltersProps {
  filters: CustomerFiltersType;
  onFiltersChange: (filters: Partial<CustomerFiltersType>) => void;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const CustomerFilters: React.FC<CustomerFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, filters.search, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (key: keyof CustomerFiltersType, value: any) => {
    onFiltersChange({ [key]: value });
  };

  const clearFilters = () => {
    setSearchQuery('');
    onFiltersChange({
      search: '',
      hasVehicles: undefined,
      hasAppointments: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = filters.hasVehicles !== undefined || 
                          filters.hasAppointments !== undefined || 
                          filters.sortBy !== 'createdAt' || 
                          filters.sortOrder !== 'desc';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Búsqueda principal */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre, email, teléfono o placa..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        
        <Button
          variant="secondary"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <FunnelIcon className="h-4 w-4" />
          Filtros
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${
            showAdvancedFilters ? 'rotate-180' : ''
          }`} />
        </Button>

        {(hasActiveFilters || searchQuery) && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Filtros avanzados */}
      {showAdvancedFilters && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro de vehículos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado de Vehículos
              </label>
              <select
                value={filters.hasVehicles === undefined ? '' : filters.hasVehicles.toString()}
                onChange={(e) => handleFilterChange('hasVehicles', 
                  e.target.value === '' ? undefined : e.target.value === 'true'
                )}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              >
                <option value="">Todos</option>
                <option value="true">Con vehículos</option>
                <option value="false">Sin vehículos</option>
              </select>
            </div>

            {/* Filtro de citas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado de Citas
              </label>
              <select
                value={filters.hasAppointments === undefined ? '' : filters.hasAppointments.toString()}
                onChange={(e) => handleFilterChange('hasAppointments', 
                  e.target.value === '' ? undefined : e.target.value === 'true'
                )}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              >
                <option value="">Todos</option>
                <option value="true">Con citas</option>
                <option value="false">Sin citas</option>
              </select>
            </div>

            {/* Ordenamiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              >
                <option value="firstName">Nombre</option>
                <option value="lastName">Apellido</option>
                <option value="email">Email</option>
                <option value="createdAt">Fecha de registro</option>
              </select>
            </div>
          </div>

          {/* Dirección del ordenamiento */}
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sortOrder"
                value="asc"
                checked={filters.sortOrder === 'asc'}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="mr-2"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">Ascendente</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sortOrder"
                value="desc"
                checked={filters.sortOrder === 'desc'}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="mr-2"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">Descendente</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
