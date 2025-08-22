import React, { useState } from 'react';
import { Customer, ServiceClient, ServiceCategory } from '../types/clientTypes';

// Tipo específico para el historial de servicios del cliente
interface ServiceHistoryItem {
  id: string;
  service: ServiceClient;
  status: 'completed' | 'cancelled' | 'pending';
  completedAt: Date;
  vehicle: {
    id: string;
    customerId: string;
    brand: string;
    model: string;
    year: number;
    plate: string;
    color?: string;
    mileage?: number;
    isDefault: boolean;
    createdAt: Date;
  };
  mechanic: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    avatar: string;
  };
  notes?: string;
  rating: number;
  review?: string;
  finalPrice: number;
}

interface ClientServiceHistoryPageProps {
  customer: Customer;
}

const ClientServiceHistoryPage: React.FC<ClientServiceHistoryPageProps> = ({ customer }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'cancelled'>('all');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock data para servicios del cliente
  const mockServices: ServiceHistoryItem[] = [
    {
      id: '1',
      service: {
        id: 's1',
        name: 'Cambio de Aceite',
        description: 'Cambio de aceite y filtro de aceite',
        shortDescription: 'Mantenimiento preventivo del motor',
        duration: 60,
        price: 45.00,
        category: {
          id: 'cat1',
          name: 'Mantenimiento',
          description: 'Servicios de mantenimiento preventivo',
          color: '#10B981',
          icon: '🔧'
        },
        gallery: [],
        features: ['Aceite sintético', 'Filtro de calidad', 'Inspección general'],
        isPopular: true,
        rating: 4.8,
        reviewCount: 156,
        estimatedTime: '45-60 min'
      },
      status: 'completed',
      completedAt: new Date('2024-01-15'),
      vehicle: {
        id: '1',
        customerId: '1',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        plate: 'ABC-123',
        color: 'Blanco',
        mileage: 45000,
        isDefault: true,
        createdAt: new Date('2023-01-15')
      },
      mechanic: {
        id: 'm1',
        name: 'Carlos Méndez',
        specialty: 'Mecánica General',
        rating: 4.8,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      notes: 'Aceite sintético de alta calidad utilizado',
      rating: 5,
      review: 'Excelente servicio, muy profesional',
      finalPrice: 45.00
    },
    {
      id: '2',
      service: {
        id: 's2',
        name: 'Revisión de Frenos',
        description: 'Inspección completa del sistema de frenos',
        shortDescription: 'Verificación de seguridad del vehículo',
        duration: 45,
        price: 35.00,
        category: {
          id: 'cat2',
          name: 'Seguridad',
          description: 'Servicios relacionados con la seguridad',
          color: '#EF4444',
          icon: '🛡️'
        },
        gallery: [],
        features: ['Inspección completa', 'Verificación de pastillas', 'Prueba de frenado'],
        isPopular: false,
        rating: 4.9,
        reviewCount: 89,
        estimatedTime: '30-45 min'
      },
      status: 'completed',
      completedAt: new Date('2024-02-20'),
      vehicle: {
        id: '1',
        customerId: '1',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        plate: 'ABC-123',
        color: 'Blanco',
        mileage: 47000,
        isDefault: true,
        createdAt: new Date('2023-01-15')
      },
      mechanic: {
        id: 'm2',
        name: 'Ana Rodríguez',
        specialty: 'Sistemas de Frenos',
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
      },
      notes: 'Pastillas de freno en buen estado, no requieren cambio',
      rating: 5,
      review: 'Muy detallada la revisión, me siento seguro',
      finalPrice: 35.00
    },
    {
      id: '3',
      service: {
        id: 's3',
        name: 'Cambio de Batería',
        description: 'Reemplazo de batería por desgaste',
        shortDescription: 'Solución a problemas de arranque',
        duration: 30,
        price: 120.00,
        category: {
          id: 'cat3',
          name: 'Eléctrico',
          description: 'Servicios del sistema eléctrico',
          color: '#F59E0B',
          icon: '⚡'
        },
        gallery: [],
        features: ['Batería nueva', 'Instalación profesional', 'Prueba de funcionamiento'],
        isPopular: true,
        rating: 4.7,
        reviewCount: 203,
        estimatedTime: '20-30 min'
      },
      status: 'completed',
      completedAt: new Date('2024-03-10'),
      vehicle: {
        id: '1',
        customerId: '1',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        plate: 'ABC-123',
        color: 'Blanco',
        mileage: 48500,
        isDefault: true,
        createdAt: new Date('2023-01-15')
      },
      mechanic: {
        id: 'm3',
        name: 'Luis Torres',
        specialty: 'Sistemas Eléctricos',
        rating: 4.7,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      notes: 'Batería de 60Ah instalada, garantía de 2 años',
      rating: 4,
      review: 'Rápido y eficiente, batería funcionando perfecto',
      finalPrice: 120.00
    }
  ];

  const filteredServices = mockServices.filter(service => {
    if (selectedFilter === 'all') return true;
    return service.status === selectedFilter;
  }).filter(service => {
    return service.completedAt.getFullYear() === selectedYear;
  });

  const years = Array.from(new Set(mockServices.map(s => s.completedAt.getFullYear()))).sort((a, b) => b - a);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#2C3E50]">Historial de Servicios</h1>
            <p className="text-[#34495E]">Revisa todos los servicios que has recibido</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#34495E]">Total de servicios</p>
            <p className="text-2xl font-bold text-[#FF6B35]">{filteredServices.length}</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Estado</label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
            >
              <option value="all">Todos los estados</option>
              <option value="completed">Completados</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Año</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de servicios */}
      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-[#ECF0F1] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#34495E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#2C3E50] mb-2">No hay servicios</h3>
            <p className="text-[#34495E]">No se encontraron servicios para los filtros seleccionados</p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-[#2C3E50]">{service.service.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {getStatusText(service.status)}
                    </span>
                  </div>
                  <p className="text-[#34495E] mb-2">{service.service.description}</p>
                  <div className="flex items-center gap-4 text-sm text-[#34495E]">
                    <span>📅 {service.completedAt.toLocaleDateString('es-ES')}</span>
                    <span>💰 ${service.finalPrice.toFixed(2)}</span>
                    <span>⏱️ {service.service.duration} min</span>
                    <span>🚗 {service.vehicle.plate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < service.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-[#34495E] ml-1">({service.rating})</span>
                  </div>
                </div>
              </div>

              {/* Mecánico */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-[#ECF0F1] rounded-lg">
                <img
                  src={service.mechanic.avatar}
                  alt={service.mechanic.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-[#2C3E50]">{service.mechanic.name}</p>
                  <p className="text-sm text-[#34495E]">{service.mechanic.specialty}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-[#2C3E50]">{service.mechanic.rating}</span>
                  </div>
                </div>
              </div>

              {/* Notas y Review */}
              {service.notes && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Notas del servicio:</strong> {service.notes}
                  </p>
                </div>
              )}

              {service.review && (
                <div className="p-3 bg-[#ECF0F1] rounded-lg">
                  <p className="text-sm text-[#2C3E50]">
                    <strong>Tu reseña:</strong> "{service.review}"
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientServiceHistoryPage;
