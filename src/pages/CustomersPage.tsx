import React, { useState, useEffect } from 'react';
import { useCustomerStore } from '../store/useCustomerStore';
import { Customer } from '../types';
import { CreateCustomerData } from '../services/customersService';
import { 
  CustomerStats, 
  CustomerFilters, 
  CustomerModal, 
  CustomerDetails, 
  CustomersList 
} from '../components/customers';
import { Button } from '../components/ui/Button';
import { 
  PlusIcon, 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CustomersPage: React.FC = () => {
  const {
    customers,
    selectedCustomer,
    filters,
    stats,
    isLoading,
    error,
    total,
    currentPage,
    pageSize,
    fetchCustomers,
    fetchCustomerStats,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    setFilters,
    selectCustomer,
    clearError,
    exportCustomers
  } = useCustomerStore();

  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    fetchCustomers();
    fetchCustomerStats();
  }, [fetchCustomers, fetchCustomerStats]);

  // Manejar errores
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  // Aplicar filtros
  useEffect(() => {
    fetchCustomers();
  }, [filters, fetchCustomers]);

  const handleCreateCustomer = async (customerData: CreateCustomerData) => {
    try {
      await createCustomer(customerData);
      toast.success('Cliente creado exitosamente');
      setShowModal(false);
    } catch (error) {
      toast.error('Error al crear el cliente');
    }
  };

  const handleUpdateCustomer = async (customerData: CreateCustomerData) => {
    if (!editingCustomer) return;
    
    try {
      await updateCustomer(editingCustomer.id, customerData);
      toast.success('Cliente actualizado exitosamente');
      setShowModal(false);
      setEditingCustomer(null);
    } catch (error) {
      toast.error('Error al actualizar el cliente');
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await deleteCustomer(customerId);
      toast.success('Cliente eliminado exitosamente');
      if (selectedCustomer?.id === customerId) {
        setShowDetails(false);
        selectCustomer(null);
      }
    } catch (error) {
      toast.error('Error al eliminar el cliente');
    }
  };

  const handleViewCustomer = (customer: Customer) => {
    selectCustomer(customer);
    setShowDetails(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleNewCustomer = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      searchCustomers(query);
    } else {
      fetchCustomers();
    }
  };

  const handlePageChange = (page: number) => {
    setFilters({ offset: (page - 1) * pageSize });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setFilters({ limit: newPageSize, offset: 0 });
  };

  const handleExport = async (format: 'csv' | 'excel' = 'csv') => {
    try {
      await exportCustomers(filters, format);
      toast.success(`Clientes exportados exitosamente en formato ${format.toUpperCase()}`);
    } catch (error) {
      toast.error('Error al exportar clientes');
    }
  };

  const handleImport = async () => {
    if (!importFile) return;

    try {
      // TODO: Implementar importación
      toast.success('Importación iniciada');
      setShowImportModal(false);
      setImportFile(null);
    } catch (error) {
      toast.error('Error al importar clientes');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Clientes</h1>
          <p className="text-gray-600">
            Administra la información de tus clientes y sus vehículos
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2"
          >
            <ArrowUpTrayIcon className="h-4 w-4" />
            Importar
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Exportar CSV
          </Button>
          
          <Button
            variant="primary"
            onClick={handleNewCustomer}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Nuevo Cliente
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      {stats && (
        <CustomerStats 
          stats={stats} 
          isLoading={isLoading} 
        />
      )}

      {/* Filtros */}
      <CustomerFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Lista de clientes */}
      <CustomersList
        customers={customers}
        isLoading={isLoading}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onView={handleViewCustomer}
        onEdit={handleEditCustomer}
        onDelete={handleDeleteCustomer}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Modal de cliente */}
      <CustomerModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingCustomer(null);
        }}
        customer={editingCustomer}
        onSave={editingCustomer ? handleUpdateCustomer : handleCreateCustomer}
        isLoading={isLoading}
      />

      {/* Detalles del cliente */}
      {showDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CustomerDetails
              customer={selectedCustomer}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer}
              onClose={() => {
                setShowDetails(false);
                selectCustomer(null);
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Modal de importación */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Importar Clientes
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Archivo CSV/Excel
                  </label>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="text-sm text-gray-600">
                  <p className="mb-2">El archivo debe contener las siguientes columnas:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nombre</li>
                    <li>Apellido</li>
                    <li>Email</li>
                    <li>Teléfono</li>
                    <li>Dirección (opcional)</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end mt-6">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowImportModal(false);
                    setImportFile(null);
                  }}
                >
                  Cancelar
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleImport}
                  disabled={!importFile}
                >
                  Importar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage; 