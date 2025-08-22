import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useClientAuthStore } from '../store/useClientAuthStore';
import { RegisterForm } from '../types/clientTypes';
import { useRedirectIfAuthenticated } from '../hooks/useClientAuth';

const ClientRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useClientAuthStore();
  
  // Redirigir si ya está autenticado
  useRedirectIfAuthenticated();
  
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    vehicle: {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      plate: '',
      color: ''
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<RegisterForm>>({});

  // Limpiar error cuando se monta el componente
  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = (): boolean => {
    const errors: Partial<RegisterForm> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
    }

    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    if (!formData.vehicle.brand.trim()) {
      errors.vehicle = { ...errors.vehicle, brand: 'La marca del vehículo es requerida' };
    }

    if (!formData.vehicle.model.trim()) {
      errors.vehicle = { ...errors.vehicle, model: 'El modelo del vehículo es requerido' };
    }

    if (!formData.vehicle.plate.trim()) {
      errors.vehicle = { ...errors.vehicle, plate: 'La placa del vehículo es requerida' };
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('vehicle.')) {
      const vehicleField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [vehicleField]: type === 'number' ? parseInt(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors[name as keyof RegisterForm]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = await register(formData);
    if (success) {
      navigate('/cliente', { replace: true });
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-[#FF6B35] rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#2C3E50]">
            Crear cuenta nueva
          </h2>
          <p className="mt-2 text-sm text-[#34495E]">
            Únete a nuestro taller mecánico
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
                         {/* Información Personal */}
             <div>
               <h3 className="text-lg font-medium text-[#2C3E50] mb-4">Información Personal</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="firstName" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Nombre *
                   </label>
                   <input
                     id="firstName"
                     name="firstName"
                     type="text"
                     required
                     value={formData.firstName}
                     onChange={handleInputChange}
                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors ${
                       formErrors.firstName ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="Juan"
                   />
                   {formErrors.firstName && (
                     <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                   )}
                 </div>

                                 <div>
                   <label htmlFor="lastName" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Apellido *
                   </label>
                   <input
                     id="lastName"
                     name="lastName"
                     type="text"
                     required
                     value={formData.lastName}
                     onChange={handleInputChange}
                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors ${
                       formErrors.lastName ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="Pérez"
                   />
                   {formErrors.lastName && (
                     <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                   )}
                 </div>
              </div>
            </div>

                         {/* Contacto */}
             <div>
               <h3 className="text-lg font-medium text-[#2C3E50] mb-4">Información de Contacto</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Correo electrónico *
                   </label>
                   <input
                     id="email"
                     name="email"
                     type="email"
                     autoComplete="email"
                     required
                     value={formData.email}
                     onChange={handleInputChange}
                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors ${
                       formErrors.email ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="tu@email.com"
                   />
                   {formErrors.email && (
                     <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                   )}
                 </div>

                                 <div>
                   <label htmlFor="phone" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Teléfono *
                   </label>
                   <input
                     id="phone"
                     name="phone"
                     type="tel"
                     autoComplete="tel"
                     required
                     value={formData.phone}
                     onChange={handleInputChange}
                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors ${
                       formErrors.phone ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="+1 234 567 890"
                   />
                   {formErrors.phone && (
                     <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                   )}
                 </div>
              </div>
            </div>

                         {/* Contraseña */}
             <div>
               <h3 className="text-lg font-medium text-[#2C3E50] mb-4">Seguridad</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="password" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Contraseña *
                   </label>
                   <div className="relative">
                     <input
                       id="password"
                       name="password"
                       type={showPassword ? 'text' : 'password'}
                       autoComplete="new-password"
                       required
                       value={formData.password}
                       onChange={handleInputChange}
                       className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors ${
                         formErrors.password ? 'border-red-300' : 'border-gray-300'
                       }`}
                       placeholder="••••••••"
                     />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                  )}
                </div>

                                 <div>
                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Confirmar contraseña *
                   </label>
                   <div className="relative">
                     <input
                       id="confirmPassword"
                       name="confirmPassword"
                       type={showConfirmPassword ? 'text' : 'password'}
                       autoComplete="new-password"
                       required
                       value={formData.confirmPassword}
                       onChange={handleInputChange}
                       className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors ${
                         formErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                       }`}
                       placeholder="••••••••"
                     />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

                         {/* Vehículo */}
             <div>
               <h3 className="text-lg font-medium text-[#2C3E50] mb-4">Información del Vehículo</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="vehicle.brand" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Marca *
                   </label>
                   <input
                     id="vehicle.brand"
                     name="vehicle.brand"
                     type="text"
                     required
                     value={formData.vehicle.brand}
                     onChange={handleInputChange}
                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors ${
                       formErrors.vehicle?.brand ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="Toyota"
                   />
                   {formErrors.vehicle?.brand && (
                     <p className="mt-1 text-sm text-red-600">{formErrors.vehicle.brand}</p>
                   )}
                 </div>

                                 <div>
                   <label htmlFor="vehicle.model" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Modelo *
                   </label>
                   <input
                     id="vehicle.model"
                     name="vehicle.model"
                     type="text"
                     required
                     value={formData.vehicle.model}
                     onChange={handleInputChange}
                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors ${
                       formErrors.vehicle?.model ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="Corolla"
                   />
                   {formErrors.vehicle?.model && (
                     <p className="mt-1 text-sm text-red-600">{formErrors.vehicle.model}</p>
                   )}
                 </div>

                                 <div>
                   <label htmlFor="vehicle.year" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Año *
                   </label>
                   <select
                     id="vehicle.year"
                     name="vehicle.year"
                     required
                     value={formData.vehicle.year}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
                   >
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                                 <div>
                   <label htmlFor="vehicle.plate" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Placa *
                   </label>
                   <input
                     id="vehicle.plate"
                     name="vehicle.plate"
                     type="text"
                     required
                     value={formData.vehicle.plate}
                     onChange={handleInputChange}
                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors ${
                       formErrors.vehicle?.plate ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="ABC-123"
                   />
                   {formErrors.vehicle?.plate && (
                     <p className="mt-1 text-sm text-red-600">{formErrors.vehicle.plate}</p>
                   )}
                 </div>

                                 <div>
                   <label htmlFor="vehicle.color" className="block text-sm font-medium text-[#2C3E50] mb-2">
                     Color
                   </label>
                   <input
                     id="vehicle.color"
                     name="vehicle.color"
                     type="text"
                     value={formData.vehicle.color}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
                     placeholder="Blanco"
                   />
                 </div>
              </div>
            </div>

                         {/* Términos */}
             <div>
               <label className="flex items-start">
                 <input
                   type="checkbox"
                   name="acceptTerms"
                   checked={formData.acceptTerms}
                   onChange={handleInputChange}
                   className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded mt-1"
                 />
                 <span className="ml-2 text-sm text-[#34495E]">
                   Acepto los{' '}
                   <Link to="/cliente/terms" className="text-[#FF6B35] hover:text-[#FF8C69]">
                     términos y condiciones
                   </Link>{' '}
                   y la{' '}
                   <Link to="/cliente/privacy" className="text-[#FF6B35] hover:text-[#FF8C69]">
                     política de privacidad
                   </Link>
                   *
                 </span>
               </label>
              {formErrors.acceptTerms && (
                <p className="mt-1 text-sm text-red-600">{formErrors.acceptTerms}</p>
              )}
            </div>

            {/* Error general */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Botón de registro */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF6B35] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#FF8C69] focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creando cuenta...
                </div>
              ) : (
                'Crear cuenta'
              )}
            </button>
          </form>

          {/* Separador */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">¿Ya tienes cuenta?</span>
              </div>
            </div>
          </div>

          {/* Botón de login */}
          <div className="mt-6">
            <Link
              to="/cliente/login"
              className="w-full bg-[#ECF0F1] text-[#2C3E50] py-3 px-4 rounded-xl font-medium hover:bg-gray-200 focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientRegisterPage;
