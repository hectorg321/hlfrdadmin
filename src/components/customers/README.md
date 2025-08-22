# 🧑‍💼 Módulo de Gestión de Clientes

Este módulo proporciona una gestión completa de clientes para el taller automotriz, incluyendo información personal, vehículos y funcionalidades avanzadas.

## 📋 Componentes

### 1. **CustomerStats** - Estadísticas de Clientes
- Muestra métricas clave como total de clientes, nuevos este mes, clientes con vehículos, etc.
- Diseño responsive con tarjetas informativas
- Estados de carga con skeleton loading

### 2. **CustomerFilters** - Filtros y Búsqueda
- Búsqueda en tiempo real con debounce
- Filtros avanzados (con/sin vehículos, con/sin citas)
- Ordenamiento por diferentes campos
- Interfaz colapsable para filtros avanzados

### 3. **CustomerModal** - Crear/Editar Cliente
- Formulario completo para información del cliente
- Gestión de vehículos integrada
- Validación de campos requeridos
- Contacto de emergencia opcional
- Manejo de errores y estados de carga

### 4. **CustomerDetails** - Vista Detallada
- Información completa del cliente
- Lista de vehículos con detalles
- Acciones rápidas (crear cita, agregar vehículo, ver historial)
- Confirmación de eliminación
- Diseño responsive y accesible

### 5. **CustomersList** - Lista Principal
- Tabla con paginación
- Selección múltiple de clientes
- Ordenamiento por columnas
- Acciones por fila (ver, editar, eliminar)
- Estados de carga y sin resultados

## 🚀 Funcionalidades

### **Gestión de Clientes**
- ✅ Crear nuevos clientes
- ✅ Editar información existente
- ✅ Eliminar clientes
- ✅ Búsqueda y filtrado avanzado
- ✅ Paginación y ordenamiento

### **Gestión de Vehículos**
- ✅ Agregar vehículos a clientes
- ✅ Editar información de vehículos
- ✅ Eliminar vehículos
- ✅ Campos: marca, modelo, año, placa, VIN, color

### **Importación/Exportación**
- ✅ Exportar a CSV/Excel
- ✅ Importar desde CSV/Excel
- ✅ Filtros aplicados en exportación

### **Estadísticas y Reportes**
- ✅ Métricas de clientes
- ✅ Clientes frecuentes
- ✅ Clientes inactivos
- ✅ Distribución de vehículos

## 🔧 Uso

### **Página Principal**
```tsx
import { CustomersPage } from '../pages/CustomersPage';

// En el router
<Route path="/customers" element={<CustomersPage />} />
```

### **Componentes Individuales**
```tsx
import { CustomerModal, CustomerStats, CustomerFilters } from '../components/customers';

// Uso de componentes
<CustomerStats stats={customerStats} />
<CustomerFilters filters={filters} onFiltersChange={handleChange} />
<CustomerModal isOpen={showModal} onSave={handleSave} />
```

## 📊 Estado (Zustand)

El módulo utiliza el store `useCustomerStore` que maneja:

- **Estado**: clientes, cliente seleccionado, filtros, estadísticas
- **Acciones**: CRUD, búsqueda, filtrado, importación/exportación
- **Utilidades**: paginación, manejo de errores, estados de carga

### **Ejemplo de Uso del Store**
```tsx
const {
  customers,
  isLoading,
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = useCustomerStore();

// Cargar clientes
useEffect(() => {
  fetchCustomers();
}, []);
```

## 🎨 Diseño

### **Paleta de Colores**
- **Primario**: Azul (#3B82F6) para elementos principales
- **Éxito**: Verde (#22C55E) para acciones positivas
- **Error**: Rojo (#EF4444) para acciones destructivas
- **Advertencia**: Amarillo (#F59E0B) para alertas
- **Neutral**: Grises para texto y bordes

### **Responsive Design**
- **Mobile First**: Diseño optimizado para dispositivos móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: Uso de CSS Grid y Flexbox para layouts adaptativos

## 🔒 Validaciones

### **Campos Requeridos**
- Nombre y apellido
- Email (formato válido)
- Teléfono (formato válido)

### **Validaciones de Formato**
- Email: regex estándar
- Teléfono: números, espacios y guiones permitidos
- Fecha de nacimiento: formato ISO

## 📱 Responsive Features

- **Mobile**: Cards apiladas, navegación simplificada
- **Tablet**: Layout híbrido con sidebar colapsable
- **Desktop**: Vista completa con todas las funcionalidades

## 🚧 Próximas Mejoras

- [ ] Integración con sistema de citas
- [ ] Historial de servicios por cliente
- [ ] Notificaciones automáticas
- [ ] Dashboard de cliente individual
- [ ] Integración con WhatsApp Business
- [ ] Sistema de fidelización
- [ ] Reportes avanzados de clientes

## 🐛 Solución de Problemas

### **Error de Carga**
- Verificar conexión a la API
- Revisar tokens de autenticación
- Comprobar permisos de usuario

### **Problemas de Validación**
- Verificar formato de email
- Comprobar formato de teléfono
- Revisar campos requeridos

### **Problemas de Rendimiento**
- Implementar virtualización para listas grandes
- Optimizar consultas de API
- Usar debounce en búsquedas

---

**Desarrollado con ❤️ para el taller automotriz**
