import React, { useState } from 'react';
import { Customer, ServiceClient, ServiceCategory } from '../types/clientTypes';

interface ClientServicesPageProps {
  customer: Customer;
}

const ClientServicesPage: React.FC<ClientServicesPageProps> = ({ customer }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'duration' | 'rating'>('name');

  // Mock data para servicios disponibles
  const mockServices: ServiceClient[] = [
    {
      id: 's1',
      name: 'Cambio de Aceite',
      description: 'Cambio de aceite y filtro de aceite del motor para mantener el rendimiento óptimo',
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
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400'
      ],
      features: ['Aceite sintético de alta calidad', 'Filtro de aceite premium', 'Inspección general del motor', 'Garantía de 6 meses'],
      requirements: ['Vehículo en buen estado', 'Aceite anterior no contaminado'],
      isPopular: true,
      rating: 4.8,
      reviewCount: 156,
      estimatedTime: '45-60 min'
    },
    {
      id: 's2',
      name: 'Revisión de Frenos',
      description: 'Inspección completa del sistema de frenos para garantizar la seguridad del vehículo',
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
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      ],
      features: ['Inspección completa del sistema', 'Verificación de pastillas', 'Prueba de frenado', 'Reporte detallado'],
      requirements: ['Vehículo estacionado en superficie plana'],
      isPopular: false,
      rating: 4.9,
      reviewCount: 89,
      estimatedTime: '30-45 min'
    },
    {
      id: 's3',
      name: 'Cambio de Batería',
      description: 'Reemplazo de batería por desgaste o fallas en el sistema de arranque',
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
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      ],
      features: ['Batería nueva de alta duración', 'Instalación profesional', 'Prueba de funcionamiento', 'Garantía de 2 años'],
      requirements: ['Vehículo apagado', 'Acceso al compartimento del motor'],
      isPopular: true,
      rating: 4.7,
      reviewCount: 203,
      estimatedTime: '20-30 min'
    },
    {
      id: 's4',
      name: 'Alineación y Balanceo',
      description: 'Alineación de las ruedas y balanceo para un manejo suave y seguro',
      shortDescription: 'Mejora el manejo y durabilidad de neumáticos',
      duration: 90,
      price: 80.00,
      category: {
        id: 'cat1',
        name: 'Mantenimiento',
        description: 'Servicios de mantenimiento preventivo',
        color: '#10B981',
        icon: '🔧'
      },
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      ],
      features: ['Alineación computarizada', 'Balanceo de ruedas', 'Ajuste de presión', 'Prueba de manejo'],
      requirements: ['Neumáticos en buen estado', 'Suspensión sin daños'],
      isPopular: true,
      rating: 4.6,
      reviewCount: 134,
      estimatedTime: '1-1.5 horas'
    },
    {
      id: 's5',
      name: 'Cambio de Filtros',
      description: 'Reemplazo de filtros de aire, combustible y cabina para mejor rendimiento',
      shortDescription: 'Mantenimiento de filtros del vehículo',
      duration: 45,
      price: 55.00,
      category: {
        id: 'cat1',
        name: 'Mantenimiento',
        description: 'Servicios de mantenimiento preventivo',
        color: '#10B981',
        icon: '🔧'
      },
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      ],
      features: ['Filtro de aire del motor', 'Filtro de combustible', 'Filtro de cabina', 'Inspección del sistema'],
      requirements: ['Vehículo limpio', 'Acceso a compartimentos'],
      isPopular: false,
      rating: 4.5,
      reviewCount: 78,
      estimatedTime: '30-45 min'
    }
  ];

  const mockCategories: ServiceCategory[] = [
    {
      id: 'cat1',
      name: 'Mantenimiento',
      description: 'Servicios de mantenimiento preventivo',
      color: '#10B981',
      icon: '🔧'
    },
    {
      id: 'cat2',
      name: 'Seguridad',
      description: 'Servicios relacionados con la seguridad',
      color: '#EF4444',
      icon: '🛡️'
    },
    {
      id: 'cat3',
      name: 'Eléctrico',
      description: 'Servicios del sistema eléctrico',
      color: '#F59E0B',
      icon: '⚡'
    }
  ];

  // Filtrar y ordenar servicios
  const filteredServices = mockServices
    .filter(service => {
      if (selectedCategory !== 'all' && service.category.id !== selectedCategory) return false;
      if (searchTerm && !service.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !service.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.duration - b.duration;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleBookService = (service: ServiceClient) => {
    // Aquí iría la lógica para reservar el servicio
    console.log('Reservando servicio:', service.name);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#2C3E50]">Servicios Disponibles</h1>
            <p className="text-[#34495E]">Explora y reserva los servicios de nuestro taller</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#34495E]">Total de servicios</p>
            <p className="text-2xl font-bold text-[#FF6B35]">{filteredServices.length}</p>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Buscar servicio</label>
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Categoría</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
            >
              <option value="all">Todas las categorías</option>
              {mockCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-2">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-colors"
            >
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
              <option value="duration">Duración</option>
              <option value="rating">Calificación</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-[#ECF0F1] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#34495E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[#2C3E50] mb-2">No se encontraron servicios</h3>
            <p className="text-[#34495E]">Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Imagen del servicio */}
              <div className="relative h-48 bg-gray-200">
                {service.gallery.length > 0 ? (
                  <img
                    src={service.gallery[0]}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: service.category.color }}
                  >
                    {service.category.icon} {service.category.name}
                  </span>
                  {service.isPopular && (
                    <span className="px-2 py-1 bg-[#FF6B35] text-white rounded-full text-xs font-medium">
                      ⭐ Popular
                    </span>
                  )}
                </div>

                {/* Calificación */}
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-lg px-2 py-1">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-[#2C3E50]">{service.rating}</span>
                    <span className="text-xs text-[#34495E]">({service.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">{service.name}</h3>
                <p className="text-[#34495E] mb-4 line-clamp-2">{service.description}</p>

                {/* Información del servicio */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-[#ECF0F1] rounded-lg">
                    <p className="text-sm text-[#34495E]">Duración</p>
                    <p className="text-lg font-semibold text-[#2C3E50]">{service.duration} min</p>
                  </div>
                  <div className="text-center p-3 bg-[#ECF0F1] rounded-lg">
                    <p className="text-sm text-[#34495E]">Precio</p>
                    <p className="text-lg font-semibold text-[#FF6B35]">${service.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Características principales */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[#2C3E50] mb-2">Características:</h4>
                  <div className="space-y-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-[#34495E]">
                        <div className="w-1.5 h-1.5 bg-[#FF6B35] rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <p className="text-xs text-[#34495E] italic">
                        +{service.features.length - 3} características más
                      </p>
                    )}
                  </div>
                </div>

                {/* Botón de reserva */}
                <button
                  onClick={() => handleBookService(service)}
                  className="w-full bg-[#FF6B35] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#FF8C69] focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-colors"
                >
                  Reservar Servicio
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientServicesPage;
