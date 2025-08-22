import { useState } from 'react';
import { useMechanicStore } from '@/store/useMechanicStore';
import { Mechanic } from '@/types';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { 
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  WrenchIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface MechanicsListProps {
  onViewMechanic: (mechanic: Mechanic) => void;
  onEditMechanic: (mechanic: Mechanic) => void;
  onDeleteMechanic: (mechanicId: string) => void;
}



export const MechanicsList = ({ 
  onViewMechanic, 
  onEditMechanic, 
  onDeleteMechanic 
}: MechanicsListProps) => {
  const { mechanics, isLoading, deleteMechanic } = useMechanicStore();
  const [sortField, setSortField] = useState<keyof Mechanic>('firstName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Mechanic) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedMechanics = [...mechanics].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc' 
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const handleDelete = async (mechanicId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mecánico?')) {
      await deleteMechanic(mechanicId);
      onDeleteMechanic(mechanicId);
    }
  };

  const SortIcon = ({ field }: { field: keyof Mechanic }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (mechanics.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <WrenchIcon className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay mecánicos</h3>
          <p className="text-gray-500 text-center">
            No se encontraron mecánicos registrados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('firstName')}
              >
                <div className="flex items-center">
                  Mecánico
                  <SortIcon field="firstName" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Especialidades
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('experience')}
              >
                <div className="flex items-center">
                  Experiencia
                  <SortIcon field="experience" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('hourlyRate')}
              >
                <div className="flex items-center">
                  Tarifa/Hora
                  <SortIcon field="hourlyRate" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('isActive')}
              >
                <div className="flex items-center">
                  Estado
                  <SortIcon field="isActive" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedMechanics.map((mechanic) => (
              <tr key={mechanic.id} className="hover:bg-gray-50">
                {/* Mecánico */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {mechanic.avatar ? (
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={mechanic.avatar} 
                          alt={`${mechanic.firstName} ${mechanic.lastName}`}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {mechanic.firstName} {mechanic.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Código: {mechanic.employeeCode}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Contacto */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900 flex items-center">
                      <PhoneIcon className="w-3 h-3 mr-1 text-gray-400" />
                      {mechanic.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <EnvelopeIcon className="w-3 h-3 mr-1 text-gray-400" />
                      {mechanic.email}
                    </div>
                  </div>
                </td>

                {/* Especialidades */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {mechanic.specialties.slice(0, 2).map(specialty => (
                      <Badge 
                        key={specialty.id}
                        className="text-xs"
                        style={{ 
                          backgroundColor: specialty.color + '20',
                          color: specialty.color,
                          border: `1px solid ${specialty.color}40`
                        }}
                      >
                        {specialty.name}
                      </Badge>
                    ))}
                    {mechanic.specialties.length > 2 && (
                      <Badge className="text-xs bg-gray-100 text-gray-600">
                        +{mechanic.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </td>

                {/* Experiencia */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {mechanic.experience} año{mechanic.experience !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-500">
                    {mechanic.skills.length} habilidades
                  </div>
                </td>

                {/* Tarifa */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    RD${mechanic.hourlyRate.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    por hora
                  </div>
                </td>

                {/* Estado */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {mechanic.isActive ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-700">Activo</span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-red-700">Inactivo</span>
                      </>
                    )}
                  </div>
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewMechanic(mechanic)}
                      title="Ver detalles"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditMechanic(mechanic)}
                      title="Editar"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(mechanic.id)}
                      title="Eliminar"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
