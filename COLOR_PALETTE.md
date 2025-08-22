# 🎨 Paleta de Colores del Admin

## Descripción General
Esta paleta está diseñada para crear una experiencia diferenciada entre cliente y administrador, manteniendo la identidad visual de la marca con un enfoque profesional y sobrio.

## Colores Principales

### 🖤 Negro Principal (#1A1A1A)
- **Uso**: Elementos principales del admin, textos importantes, headers principales
- **Clases Tailwind**: `bg-primary-500`, `text-primary-500`, `border-primary-500`
- **Ejemplos**: Títulos de página, botones principales, elementos de navegación activos

### 🟠 Naranja Acento (#FF6B35)
- **Uso**: Alertas, elementos importantes, acciones destacadas
- **Clases Tailwind**: `bg-accent-500`, `text-accent-500`, `border-accent-500`
- **Ejemplos**: Botones de acción, iconos destacados, notificaciones importantes

### 🔘 Gris Oscuro (#333333)
- **Uso**: Navegación y headers secundarios
- **Clases Tailwind**: `bg-primary-100`, `text-primary-100`, `border-primary-100`
- **Ejemplos**: Sidebar, navegación, headers de sección

### 🔘 Gris Medio (#666666)
- **Uso**: Texto secundario, descripciones
- **Clases Tailwind**: `text-gray-500`
- **Ejemplos**: Subtítulos, texto descriptivo, etiquetas

### 🔘 Gris Suave (#F5F5F5)
- **Uso**: Fondos de contenido, áreas secundarias
- **Clases Tailwind**: `bg-gray-100`
- **Ejemplos**: Fondo principal, áreas de contenido, separadores

### ⚪ Blanco (#FFFFFF)
- **Uso**: Tarjetas y formularios
- **Clases Tailwind**: `bg-white`
- **Ejemplos**: Cards, formularios, modales, contenido principal

## Uso Correcto en Componentes

### ✅ Forma Correcta
```tsx
// Usar las variables de color personalizadas
<h1 className="text-2xl font-bold text-primary-500">Dashboard</h1>
<Button variant="accent">Acción Importante</Button>
<div className="bg-gray-100 p-4">Contenido</div>
```

### ❌ Forma Incorrecta
```tsx
// NO usar colores hardcodeados
<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
<Button className="bg-orange-500">Acción</Button>
<div className="bg-gray-50 p-4">Contenido</div>
```

## Variables CSS Disponibles

### Primary (Negro Principal)
- `primary-50` → #1A1A1A
- `primary-100` → #333333
- `primary-500` → #1A1A1A
- `primary-600` → #000000
- `primary-700` → #000000
- `primary-900` → #000000

### Accent (Naranja)
- `accent-50` → #FF6B35
- `accent-100` → #FF6B35
- `accent-500` → #FF6B35
- `accent-600` → #E55A2B
- `accent-700` → #CC4A21
- `accent-900` → #B23A17

### Gray (Escala personalizada)
- `gray-50` → #FFFFFF
- `gray-100` → #F5F5F5
- `gray-200` → #E5E5E5
- `gray-300` → #D4D4D4
- `gray-400` → #A3A3A3
- `gray-500` → #666666
- `gray-600` → #525252
- `gray-700` → #404040
- `gray-800` → #333333
- `gray-900` → #1A1A1A

## Componentes que ya usan la paleta correctamente

- ✅ `Button` - Todas las variantes usan las variables correctas
- ✅ `Badge` - Todas las variantes usan las variables correctas
- ✅ `Card` - Usa `bg-white` correctamente
- ✅ `Input` - Usa `border-gray-300` y `focus:ring-primary-500`

## Componentes que necesitan actualización

- ⚠️ `AdminLayout` - Actualizado para usar `primary-100` y `primary-900`
- ⚠️ `Header` - Actualizado para usar `primary-500` y `primary-600`
- ⚠️ `DashboardPage` - Actualizado para usar `primary-500` y `gray-500`

## Reglas de Uso

1. **Siempre usar las variables de color personalizadas** en lugar de colores hardcodeados
2. **Mantener consistencia** en toda la aplicación
3. **Usar el color correcto para cada propósito** según la guía
4. **Evitar mezclar** colores de la paleta del cliente con la del admin
5. **Probar la accesibilidad** asegurando suficiente contraste

## Ejemplos de Implementación

### Header de Página
```tsx
<div>
  <h1 className="text-2xl font-bold text-primary-500">Título Principal</h1>
  <p className="text-gray-500">Descripción secundaria</p>
</div>
```

### Botón de Acción
```tsx
<Button variant="accent" size="lg">
  Crear Nuevo
</Button>
```

### Card con Estado
```tsx
<Card className="border-accent-500 bg-accent-50">
  <CardHeader>
    <CardTitle className="text-accent-700">Alerta Importante</CardTitle>
  </CardHeader>
</Card>
```

### Navegación Activa
```tsx
<button className="sidebar-item active">
  Dashboard
</button>
```
