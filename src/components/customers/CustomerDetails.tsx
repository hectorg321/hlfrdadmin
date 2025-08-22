import React, { useState } from 'react';
import { Customer } from '../../types';
import { Button } from '../ui/Button';
import { 
  PencilIcon, 
  TrashIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  CalendarIcon,
  TruckIcon,
  UserIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface CustomerDetailsProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  onEdit,
  onDelete,
  onClose,
  isLoading = false
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(customer.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {customer.firstName} {customer.lastName}
            </h2>
            <p className="text-gray-600">Cliente desde {formatDate(customer.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => onEdit(customer)}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <PencilIcon className="h-4 w-4" />
            Editar
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isLoading}
            className="text-red-600 hover:text-red-700"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            Cerrar
          </Button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-6">
        {/* Información de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Información de Contacto
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{customer.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="text-gray-900">{customer.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Información Adicional
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Fecha de Registro</p>
                  <p className="text-gray-900">{formatDate(customer.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <TruckIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Total de Vehículos</p>
                  <p className="text-gray-900">{customer.vehicles.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vehículos */}
        {customer.vehicles.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Vehículos ({customer.vehicles.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customer.vehicles.map((vehicle, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                                             <div className="flex items-center gap-2 mb-2">
                         <TruckIcon className="h-5 w-5 text-blue-600" />
                         <h4 className="font-semibold text-gray-900">
                           {vehicle.make} {vehicle.model}
                         </h4>
                       </div>
                      
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Año:</span> {vehicle.year}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Placa:</span> {vehicle.licensePlate}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Color:</span> {vehicle.color}
                        </p>
                        {vehicle.vin && (
                          <p className="text-gray-600">
                            <span className="font-medium">VIN:</span> {vehicle.vin}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sin vehículos */}
        {customer.vehicles.length === 0 && (
          <div className="border-t border-gray-200 pt-6">
                         <div className="text-center py-8">
               <TruckIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
               <h3 className="text-lg font-medium text-gray-900 mb-2">
                 Sin vehículos registrados
               </h3>
                            <p className="text-gray-500">
               Este cliente aún no tiene vehículos registrados en el sistema.
             </p>
           </div>
          </div>
        )}

        {/* Acciones rápidas */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="secondary"
              onClick={() => {/* TODO: Implementar crear cita */}}
              disabled={isLoading}
              className="w-full justify-center"
            >
              Crear Cita
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => {/* TODO: Implementar agregar vehículo */}}
              disabled={isLoading}
              className="w-full justify-center"
            >
              Agregar Vehículo
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => {/* TODO: Implementar historial */}}
              disabled={isLoading}
              className="w-full justify-center"
            >
              Ver Historial
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Confirmar Eliminación
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar al cliente{' '}
              <span className="font-medium">{customer.firstName} {customer.lastName}</span>?
              Esta acción no se puede deshacer.
            </p>
            
            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              
              <Button
                variant="error"
                onClick={handleDelete}
                isLoading={isLoading}
                disabled={isLoading}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
