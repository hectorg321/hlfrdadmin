-- Esquema de la base de datos para el taller automotriz
-- Tabla de categorías de servicios
CREATE TABLE IF NOT EXISTS service_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL DEFAULT '#3B82F6',
    icon TEXT NOT NULL DEFAULT 'wrench',
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de servicios
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration INTEGER NOT NULL, -- en minutos
    category_id INTEGER NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES service_categories(id)
);

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT NOT NULL,
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de vehículos
CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    license_plate TEXT NOT NULL,
    vin TEXT,
    color TEXT,
    mileage INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Tabla de citas
CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    vehicle_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, in_progress, completed, cancelled
    notes TEXT,
    total_price DECIMAL(10,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Insertar categorías por defecto
INSERT OR IGNORE INTO service_categories (name, color, icon, description) VALUES
('Mantenimiento', '#3B82F6', 'wrench', 'Servicios de mantenimiento preventivo'),
('Reparación', '#EF4444', 'hammer', 'Reparaciones y diagnósticos'),
('Limpieza', '#10B981', 'sparkles', 'Servicios de limpieza y detallado'),
('Diagnóstico', '#F59E0B', 'search', 'Diagnósticos y evaluaciones'),
('Electrónica', '#8B5CF6', 'chip', 'Sistemas electrónicos y computadoras'),
('Frenos', '#DC2626', 'brake', 'Sistema de frenos y seguridad'),
('Suspensión', '#059669', 'car', 'Suspensión y dirección'),
('Motor', '#B45309', 'engine', 'Motor y transmisión');

-- Insertar servicios por defecto
INSERT OR IGNORE INTO services (name, description, price, duration, category_id) VALUES
('Cambio de aceite', 'Cambio de aceite y filtro del motor', 2500.00, 30, 1),
('Cambio de filtros', 'Cambio de filtros de aire, combustible y cabina', 1500.00, 45, 1),
('Revisión general', 'Revisión completa del vehículo', 5000.00, 60, 1),
('Cambio de frenos', 'Cambio de pastillas y discos de freno', 8000.00, 90, 6),
('Alineación', 'Alineación de las ruedas', 3000.00, 45, 7),
('Diagnóstico computarizado', 'Lectura de códigos de error', 2000.00, 30, 4),
('Limpieza de inyectores', 'Limpieza del sistema de inyección', 6000.00, 60, 8),
('Cambio de bujías', 'Cambio de bujías del motor', 4000.00, 45, 8);
