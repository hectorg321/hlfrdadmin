# 🚗 Componentes de la Aplicación Cliente

Esta carpeta contiene todos los componentes necesarios para la aplicación móvil del cliente del taller mecánico.

## 📁 Estructura de Archivos

```
client/
├── index.ts                 # Exportaciones principales
├── README.md               # Esta documentación
└── [componentes importados de otras carpetas]
```

## 🎯 Componentes Disponibles

### Layout y Navegación

- **`ClientLayout`** - Layout principal con navegación inferior
- **`PageHeader`** - Header de página con título y botón de regreso
- **`SectionHeader`** - Encabezado de sección con título y acción opcional
- **`EmptyState`** - Estado vacío para listas sin contenido
- **`LoadingSkeleton`** - Esqueleto de carga para contenido

### Componentes UI Móviles

- **`BottomSheet`** - Panel deslizable desde abajo
- **`ServiceMobileCard`** - Tarjeta de servicio optimizada para móvil
- **`ImageGallery`** - Galería de imágenes con navegación
- **`FAB`** - Botón de acción flotante
- **`TabNavigation`** - Navegación por pestañas
- **`LineClamp`** - Componente para limitar líneas de texto

### Páginas Principales

- **`HomePage`** - Página de inicio del cliente
- **`ProfilePage`** - Página de perfil del usuario

## 🚀 Uso Básico

### 1. Layout Principal

```tsx
import { ClientLayout } from '../components/client';

function App() {
  return (
    <ClientLayout showBottomNav={true} showHeader={true}>
      <div>Contenido de la aplicación</div>
    </ClientLayout>
  );
}
```

### 2. Página de Inicio

```tsx
import { HomePage } from '../components/client';

function App() {
  const customer = {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    // ... resto de datos del cliente
  };

  return <HomePage customer={customer} />;
}
```

### 3. Página de Perfil

```tsx
import { ProfilePage } from '../components/client';

function App() {
  const customer = {
    // ... datos del cliente
  };

  return <ProfilePage customer={customer} />;
}
```

### 4. Componentes UI

```tsx
import { BottomSheet, ServiceMobileCard } from '../components/client';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ServiceMobileCard
        service={serviceData}
        onSelect={() => console.log('Service selected')}
        variant="compact"
      />
      
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Detalles del Servicio"
      >
        <div>Contenido del bottom sheet</div>
      </BottomSheet>
    </>
  );
}
```

## 🎨 Personalización

### Colores

Los componentes utilizan la paleta de colores de Tailwind CSS. Puedes personalizar los colores modificando las clases CSS o creando variantes personalizadas.

### Temas

Los componentes soportan temas claro, oscuro y automático. Esto se maneja a través de las preferencias del usuario.

### Responsive Design

Todos los componentes están diseñados con un enfoque "mobile-first" y se adaptan automáticamente a diferentes tamaños de pantalla.

## 🔧 Props Comunes

### ClientLayout

- `showBottomNav?: boolean` - Mostrar/ocultar navegación inferior
- `showHeader?: boolean` - Mostrar/ocultar header
- `title?: string` - Título del header
- `onBack?: () => void` - Función para botón de regreso
- `rightAction?: React.ReactNode` - Acción adicional en el header

### BottomSheet

- `isOpen: boolean` - Estado de apertura
- `onClose: () => void` - Función de cierre
- `height?: 'auto' | 'half' | 'full'` - Altura del sheet
- `title?: string` - Título opcional
- `showHandle?: boolean` - Mostrar/ocultar manija

### ServiceMobileCard

- `service: ServiceClient` - Datos del servicio
- `onSelect: () => void` - Función de selección
- `variant: 'compact' | 'detailed' | 'featured'` - Variante de la tarjeta

## 📱 Características Móviles

### Gestos

- **BottomSheet**: Soporta gestos de deslizamiento para cerrar
- **Tarjetas**: Efectos de presión (active:scale-95)
- **Navegación**: Transiciones suaves entre secciones

### Accesibilidad

- **Screen readers**: Textos alternativos y etiquetas ARIA
- **Navegación por teclado**: Soporte completo para teclado
- **Contraste**: Colores con suficiente contraste para legibilidad

### Performance

- **Lazy loading**: Componentes se cargan solo cuando son necesarios
- **Optimización de imágenes**: Soporte para diferentes tamaños y formatos
- **Memoización**: Componentes optimizados para evitar re-renders innecesarios

## 🔗 Integración con APIs

Los componentes están diseñados para trabajar con las siguientes APIs:

- **Autenticación**: Login, registro, verificación
- **Servicios**: Catálogo, detalles, reservas
- **Citas**: Programación, gestión, historial
- **Perfil**: Información personal, vehículos, preferencias
- **Feed**: Publicaciones, comentarios, interacciones

## 🐛 Solución de Problemas

### Error: "Component not found"

Asegúrate de que todos los componentes estén correctamente exportados en `index.ts`.

### Error: "Type not found"

Verifica que los tipos estén importados desde `clientTypes.ts`.

### Problemas de estilos

Los componentes dependen de Tailwind CSS. Asegúrate de que esté configurado correctamente.

## 📚 Recursos Adicionales

- [Especificaciones Técnicas del Cliente](../especificaciones_cliente.md)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [React TypeScript Cheat Sheet](https://react-typescript-cheatsheet.netlify.app/)

## 🤝 Contribución

Para agregar nuevos componentes:

1. Crea el componente en la carpeta apropiada
2. Agrega los tipos necesarios en `clientTypes.ts`
3. Exporta el componente en `index.ts`
4. Actualiza esta documentación
5. Agrega tests si es necesario

## 📄 Licencia

Este código es parte del proyecto HLFRD y está sujeto a los términos de licencia del proyecto.
