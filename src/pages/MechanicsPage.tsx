import { useState, useEffect } from 'react';
import { useMechanicStore } from '@/store/useMechanicStore';
import { Mechanic } from '@/types';
import { Button, Card, CardContent } from '@/components/ui';
import { 
  MechanicsList,
  MechanicModal,
  MechanicDetails
} from '@/components/mechanics';
import { 
  PlusIcon,
  WrenchIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const MechanicsPage = () => {
  const { 
    mechanics, 
    selectedMechanic, 
    fetchMechanics, 
    selectMechanic,
    updateMechanic,
    deleteMechanic 
  } = useMechanicStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMechanic, setEditingMechanic] = useState<Mechanic | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMechanics();
  }, [fetchMechanics]);

  const handleNewMechanic = () => {
    setEditingMechanic(null);
    setIsModalOpen(true);
  };

  const handleEditMechanic = (mechanic: Mechanic) => {
    setEditingMechanic(mechanic);
    setIsModalOpen(true);
  };

  const handleViewMechanic = (mechanic: Mechanic) => {
    selectMechanic(mechanic);
  };

  const handleDeleteMechanic = async (mechanicId: string) => {
    await deleteMechanic(mechanicId);
    if (selectedMechanic?.id === mechanicId) {
      selectMechanic(null);
    }
  };

  const handleToggleStatus = async (mechanicId: string, isActive: boolean) => {
    await updateMechanic(mechanicId, { isActive });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMechanic(null);
  };

  const getStats = () => {
    const total = mechanics.length;
    const active = mechanics.filter(mech => mech.isActive).length;
    const inactive = mechanics.filter(mech => !mech.isActive).length;
    const avgExperience = total > 0 
      ? Math.round(mechanics.reduce((sum, mech) => sum + mech.experience, 0) / total)
      : 0;

    return { total, active, inactive, avgExperience };
  };

  const filteredMechanics = mechanics.filter(mechanic => {
    const searchLower = searchTerm.toLowerCase();
    return (
      mechanic.firstName.toLowerCase().includes(searchLower) ||
      mechanic.lastName.toLowerCase().includes(searchLower) ||
      mechanic.email.toLowerCase().includes(searchLower) ||
      mechanic.phone.includes(searchTerm) ||
      mechanic.employeeCode.toLowerCase().includes(searchLower) ||
      mechanic.specialties.some(s => s.name.toLowerCase().includes(searchLower))
    );
  });

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Mecánicos</h1>
          <p className="text-gray-600">Administra el equipo de mecánicos del taller</p>
        </div>
        
        <Button
          variant="primary"
          onClick={handleNewMechanic}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Nuevo Mecánico
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Mecánicos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Activos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactivos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <WrenchIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Experiencia Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgExperience} años</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar mecánicos por nombre, email, teléfono, código o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-2">
              Mostrando {filteredMechanics.length} de {mechanics.length} mecánicos
            </p>
          )}
        </CardContent>
      </Card>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de mecánicos */}
        <div className={`${selectedMechanic ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <MechanicsList
            onViewMechanic={handleViewMechanic}
            onEditMechanic={handleEditMechanic}
            onDeleteMechanic={handleDeleteMechanic}
          />
        </div>

        {/* Panel lateral de detalles */}
        {selectedMechanic && (
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Detalles del Mecánico
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => selectMechanic(null)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <MechanicDetails
                    mechanic={selectedMechanic}
                    onEdit={handleEditMechanic}
                    onDelete={handleDeleteMechanic}
                    onToggleStatus={handleToggleStatus}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Modal de creación/edición */}
      <MechanicModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mechanic={editingMechanic}
      />
    </div>
  );
};

export default MechanicsPage;
