# 🛠️ Taller Admin - Panel Administrativo

Panel administrativo completo para talleres automotrices, construido con React, TypeScript y Tailwind CSS.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y responsive con Tailwind CSS
- 🔐 **Autenticación**: Sistema de login seguro con JWT
- 📊 **Dashboard**: Estadísticas en tiempo real del taller
- 📅 **Gestión de Citas**: Calendario y programación de citas
- 🛠️ **Servicios**: Administración de servicios y precios
- 👥 **Clientes**: Base de datos de clientes y vehículos
- 📱 **Feed Social**: Gestión de contenido social
- 📈 **Reportes**: Analytics y métricas del negocio
- 👤 **Usuarios**: Gestión de roles y permisos
- ⚙️ **Configuración**: Personalización del sistema

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd taller-admin
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tus configuraciones:
   ```env
   VITE_API_URL=http://localhost:3010/api
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3010
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (Button, Modal, etc.)
│   ├── layout/         # Layout principal y navegación
│   ├── auth/           # Componentes de autenticación
│   ├── dashboard/      # Componentes del dashboard
│   ├── services/       # Gestión de servicios
│   ├── appointments/   # Gestión de citas
│   ├── users/          # Gestión de usuarios
│   ├── customers/      # Gestión de clientes
│   ├── feed/           # Gestión del feed social
│   ├── reports/        # Reportes y analytics
│   └── settings/       # Configuraciones
├── pages/              # Páginas principales
├── hooks/              # Custom hooks
├── services/           # Servicios API
├── store/              # Estado global (Zustand)
├── utils/              # Utilidades y helpers
├── types/              # Tipos de TypeScript
└── constants/          # Constantes del sistema
```

## 🎨 Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod
- **Routing**: React Router DOM
- **UI Components**: Headless UI + Heroicons
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion

## 📱 Responsive Design

El panel está completamente optimizado para:
- 📱 Móviles (320px+)
- 💻 Tablets (768px+)
- 🖥️ Desktop (1024px+)
- 🖥️ Pantallas grandes (1280px+)

## 🔐 Autenticación

### Credenciales de Demo
- **Email**: admin@taller.com
- **Password**: password123

### Roles de Usuario
- **Super Admin**: Acceso completo al sistema
- **Admin**: Gestión de operaciones diarias
- **Employee**: Acceso limitado a funciones básicas
- **Mechanic**: Gestión de citas y servicios

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Verificación de tipos
npm run type-check
```

## 🌐 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL de la API backend | `http://localhost:3000/api` |

## 📦 Dependencias Principales

### Core
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `typescript`: ^5.0.0
- `vite`: ^4.4.0

### UI & Styling
- `tailwindcss`: ^3.3.0
- `@headlessui/react`: ^1.7.17
- `@heroicons/react`: ^2.0.18
- `framer-motion`: ^10.16.4

### State & Data
- `zustand`: ^4.4.1
- `axios`: ^1.5.0
- `@tanstack/react-query`: ^4.32.6
- `react-hook-form`: ^7.45.4

## 🔧 Configuración

### Tailwind CSS
El proyecto incluye una configuración personalizada de Tailwind con:
- Paleta de colores personalizada
- Breakpoints responsive
- Componentes predefinidos
- Animaciones personalizadas

### TypeScript
Configuración estricta con:
- Path mapping para imports
- Configuración de módulos ES
- Verificación de tipos estricta

## 📱 Características Responsive

- **Sidebar colapsable** en dispositivos móviles
- **Grid adaptativo** para diferentes tamaños de pantalla
- **Navegación optimizada** para touch
- **Tablas responsive** con scroll horizontal

## 🎯 Próximas Funcionalidades

- [ ] Calendario de citas interactivo
- [ ] Sistema de notificaciones en tiempo real
- [ ] Exportación de reportes a PDF/Excel
- [ ] Integración con WhatsApp Business
- [ ] Dashboard con gráficos interactivos
- [ ] Sistema de inventario
- [ ] Gestión de proveedores
- [ ] API REST completa

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@taller.com
- 💬 Discord: [Servidor de la comunidad]
- 📖 Documentación: [Enlace a la documentación]

---

**¡Construido con ❤️ para talleres automotrices!** # hlfrdadmin
