#!/usr/bin/env node

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

console.log('🚀 Inicializando base de datos SQLite...');

// Crear directorio de base de datos si no existe
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✅ Directorio de base de datos creado');
}

const dbPath = path.join(dbDir, 'taller.db');
const db = new Database(dbPath);

// Habilitar foreign keys
db.pragma('foreign_keys = ON');

try {
  // Leer y ejecutar el esquema SQL
  const schemaPath = path.join(process.cwd(), 'src', 'database', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  // Ejecutar el esquema
  db.exec(schema);
  
  console.log('✅ Base de datos inicializada correctamente');
  console.log(`📁 Ubicación: ${dbPath}`);
  
  // Verificar que las tablas se crearon
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('📋 Tablas creadas:', tables.map(t => t.name).join(', '));
  
  // Verificar datos de ejemplo
  const servicesCount = db.prepare("SELECT COUNT(*) as count FROM services").get();
  const categoriesCount = db.prepare("SELECT COUNT(*) as count FROM service_categories").get();
  
  console.log(`🛠️  Servicios de ejemplo: ${servicesCount.count}`);
  console.log(`🏷️  Categorías de ejemplo: ${categoriesCount.count}`);
  
} catch (error) {
  console.error('❌ Error al inicializar la base de datos:', error);
  process.exit(1);
} finally {
  db.close();
}

console.log('🎉 ¡Base de datos lista para usar!');
