import React, { useState, useEffect } from 'react';
import { Customer, Vehicle } from '../../types';
import { CreateCustomerData } from '../../services/customersService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  XMarkIcon, 
  PlusIcon, 
  TrashIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer | null;
  onSave: (customerData: CreateCustomerData) => Promise<void>;
  isLoading?: boolean;
}

interface VehicleFormData {
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  vin: string;
  color: string;
}

const initialVehicleData: VehicleFormData = {
  make: '',
  model: '',
  year: '',
  licensePlate: '',
  vin: '',
  color: ''
};

export const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  customer,
  onSave,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateCustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    vehicles: []
  });

  const [vehicles, setVehicles] = useState<VehicleFormData[]>([]);
  const [newVehicle, setNewVehicle] = useState<VehicleFormData>(initialVehicleData);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!customer;

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: '',
        dateOfBirth: '',
        emergencyContact: {
          name: '',
          relationship: '',
          phone: '',
          email: ''
        },
        vehicles: []
      });
      setVehicles(customer.vehicles.map(v => ({
        make: v.make,
        model: v.model,
        year: v.year.toString(),
        licensePlate: v.licensePlate,
        vin: v.vin || '',
        color: v.color
      })));
    } else {
      resetForm();
    }
  }, [customer]);

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      },
      vehicles: []
    });
    setVehicles([]);
    setNewVehicle(initialVehicleData);
    setShowVehicleForm(false);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    // Validar teléfono
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'El teléfono no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CreateCustomerData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEmergencyContactChange = (field: keyof typeof formData.emergencyContact, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value }
    }));
  };

  const addVehicle = () => {
    if (newVehicle.make && newVehicle.model && newVehicle.licensePlate) {
      setVehicles(prev => [...prev, { ...newVehicle }]);
      setNewVehicle(initialVehicleData);
      setShowVehicleForm(false);
    }
  };

  const removeVehicle = (index: number) => {
    setVehicles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const customerData: CreateCustomerData = {
        ...formData,
        vehicles: vehicles.map(v => ({
          make: v.make,
          model: v.model,
          year: parseInt(v.year) || new Date().getFullYear(),
          licensePlate: v.licensePlate,
          vin: v.vin || undefined,
          color: v.color
        }))
      };

      await onSave(customerData);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="pl-10"
                  placeholder="Nombre del cliente"
                  error={errors.firstName}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellido *
              </label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Apellido del cliente"
                error={errors.lastName}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  placeholder="email@ejemplo.com"
                  error={errors.email}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  placeholder="809-123-4567"
                  error={errors.phone}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="pl-10"
                  placeholder="Dirección completa"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Contacto de emergencia */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contacto de Emergencia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                value={formData.emergencyContact.name}
                onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                placeholder="Nombre del contacto"
                disabled={isLoading}
              />
              <Input
                type="text"
                value={formData.emergencyContact.relationship}
                onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                placeholder="Relación (esposo, hijo, etc.)"
                disabled={isLoading}
              />
              <Input
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                placeholder="Teléfono de emergencia"
                disabled={isLoading}
              />
              <Input
                type="email"
                value={formData.emergencyContact.email}
                onChange={(e) => handleEmergencyContactChange('email', e.target.value)}
                placeholder="Email de emergencia (opcional)"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Vehículos */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Vehículos</h3>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowVehicleForm(!showVehicleForm)}
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <PlusIcon className="h-4 w-4" />
                Agregar Vehículo
              </Button>
            </div>

            {/* Lista de vehículos */}
            {vehicles.length > 0 && (
              <div className="space-y-3 mb-4">
                {vehicles.map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                     <div className="flex items-center gap-3">
                   <TruckIcon className="h-5 w-5 text-gray-500" />
                   <div>
                     <p className="font-medium text-gray-900">
                       {vehicle.make} {vehicle.model} ({vehicle.year})
                     </p>
                     <p className="text-sm text-gray-600">
                       Placa: {vehicle.licensePlate} • Color: {vehicle.color}
                     </p>
                   </div>
                 </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeVehicle(index)}
                      className="text-red-600 hover:text-red-700"
                      disabled={isLoading}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Formulario para nuevo vehículo */}
            {showVehicleForm && (
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Nuevo Vehículo</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    type="text"
                    value={newVehicle.make}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, make: e.target.value }))}
                    placeholder="Marca"
                    disabled={isLoading}
                  />
                  <Input
                    type="text"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="Modelo"
                    disabled={isLoading}
                  />
                  <Input
                    type="text"
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="Año"
                    disabled={isLoading}
                  />
                  <Input
                    type="text"
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, licensePlate: e.target.value }))}
                    placeholder="Placa"
                    disabled={isLoading}
                  />
                  <Input
                    type="text"
                    value={newVehicle.vin}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, vin: e.target.value }))}
                    placeholder="VIN (opcional)"
                    disabled={isLoading}
                  />
                  <Input
                    type="text"
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="Color"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={addVehicle}
                    disabled={isLoading || !newVehicle.make || !newVehicle.model || !newVehicle.licensePlate}
                  >
                    Agregar
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowVehicleForm(false);
                      setNewVehicle(initialVehicleData);
                    }}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isEditing ? 'Actualizar' : 'Crear'} Cliente
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
