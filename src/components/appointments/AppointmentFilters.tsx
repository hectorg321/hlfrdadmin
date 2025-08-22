import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { ReportFilter, AppointmentStatus } from '@/types';
import { Button } from '@/components/ui';
import { 
  FunnelIcon,
  CalendarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface AppointmentFiltersProps {
  onFiltersChange: (filters: ReportFilter) => void;
}

const statusOptions: { value: AppointmentStatus; label: string }[] = [
  { value: 'scheduled', label: 'Programada' },
  { value: 'confirmed', label: 'Confirmada' },
  { value: 'in_progress', label: 'En Progreso' },
  { value: 'completed', label: 'Completada' },
  { value: 'cancelled', label: 'Cancelada' },
  { value: 'no_show', label: 'No Presentó' }
];

// Datos de ejemplo para desarrollo
const mockServices = [
  { id: '1', name: 'Cambio de Aceite' },
  { id: '2', name: 'Frenos' },
  { id: '3', name: 'Limpieza' },
  { id: '4', name: 'Diagnóstico' }
];

const mockMechanics = [
  { id: '1', name: 'Carlos Rodríguez' },
  { id: '2', name: 'Miguel Santos' },
  { id: '3', name: 'Luis Martínez' }
];

export const AppointmentFilters = ({ onFiltersChange }: AppointmentFiltersProps) => {
  const { filters, setFilters } = useAppointmentStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<ReportFilter>(filters);

  const handleFilterChange = (key: keyof ReportFilter, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
    onFiltersChange(localFilters);
    setIsExpanded(false);
  };

  const handleResetFilters = () => {
    const defaultFilters: ReportFilter = {
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      serviceIds: [],
      mechanicIds: [],
      status: []
    };
    setLocalFilters(defaultFilters);
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const handleQuickDateRange = (days: number) => {
    const endDate = new Date();
    const startDate = subDays(endDate, days);
    const newFilters = { ...localFilters, startDate, endDate };
    setLocalFilters(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.serviceIds && filters.serviceIds.length > 0) count++;
    if (filters.mechanicIds && filters.mechanicIds.length > 0) count++;
    if (filters.status && filters.status.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FunnelIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {activeFiltersCount} activo{activeFiltersCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Ocultar' : 'Mostrar'} filtros
          </Button>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
            >
              <XMarkIcon className="w-4 h-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {/* Filtros rápidos de fecha */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuickDateRange(1)}
          className={localFilters.startDate.toDateString() === subDays(new Date(), 1).toDateString() ? 'bg-blue-100 text-blue-800' : ''}
        >
          Ayer
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuickDateRange(7)}
          className={localFilters.startDate.toDateString() === subDays(new Date(), 7).toDateString() ? 'bg-blue-100 text-blue-800' : ''}
        >
          Última semana
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuickDateRange(30)}
          className={localFilters.startDate.toDateString() === subDays(new Date(), 30).toDateString() ? 'bg-blue-100 text-blue-800' : ''}
        >
          Último mes
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const today = new Date();
            const newFilters = { ...localFilters, startDate: today, endDate: today };
            setLocalFilters(newFilters);
          }}
          className={localFilters.startDate.toDateString() === new Date().toDateString() && 
                     localFilters.endDate.toDateString() === new Date().toDateString() ? 'bg-blue-100 text-blue-800' : ''}
        >
          Hoy
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4 border-t pt-4">
          {/* Rango de fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de inicio
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={format(localFilters.startDate, 'yyyy-MM-dd')}
                  onChange={(e) => handleFilterChange('startDate', new Date(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de fin
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={format(localFilters.endDate, 'yyyy-MM-dd')}
                  onChange={(e) => handleFilterChange('endDate', new Date(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Servicios
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {mockServices.map(service => (
                <label key={service.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localFilters.serviceIds?.includes(service.id) || false}
                    onChange={(e) => {
                      const currentIds = localFilters.serviceIds || [];
                      const newIds = e.target.checked
                        ? [...currentIds, service.id]
                        : currentIds.filter(id => id !== service.id);
                      handleFilterChange('serviceIds', newIds);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{service.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mecánicos */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mecánicos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {mockMechanics.map(mechanic => (
                <label key={mechanic.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localFilters.mechanicIds?.includes(mechanic.id) || false}
                    onChange={(e) => {
                      const currentIds = localFilters.mechanicIds || [];
                      const newIds = e.target.checked
                        ? [...currentIds, mechanic.id]
                        : currentIds.filter(id => id !== mechanic.id);
                      handleFilterChange('mechanicIds', newIds);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{mechanic.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Estados */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Estados
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {statusOptions.map(status => (
                <label key={status.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localFilters.status?.includes(status.value) || false}
                    onChange={(e) => {
                      const currentStatuses = localFilters.status || [];
                      const newStatuses = e.target.checked
                        ? [...currentStatuses, status.value]
                        : currentStatuses.filter(s => s !== status.value);
                      handleFilterChange('status', newStatuses);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApplyFilters}
            >
              Aplicar filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
