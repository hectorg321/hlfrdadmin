import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

class DatabaseService {
  private db: Database.Database;
  private static instance: DatabaseService;

  private constructor() {
    // Crear directorio de base de datos si no existe
    const dbDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const dbPath = path.join(dbDir, 'taller.db');
    this.db = new Database(dbPath);
    
    // Habilitar foreign keys
    this.db.pragma('foreign_keys = ON');
    
    // Inicializar la base de datos
    this.initializeDatabase();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private initializeDatabase(): void {
    try {
      // Leer y ejecutar el esquema SQL
      const schemaPath = path.join(process.cwd(), 'src', 'database', 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Ejecutar el esquema
      this.db.exec(schema);
      
      console.log('✅ Base de datos inicializada correctamente');
    } catch (error) {
      console.error('❌ Error al inicializar la base de datos:', error);
      throw error;
    }
  }

  public getDatabase(): Database.Database {
    return this.db;
  }

  public close(): void {
    if (this.db) {
      this.db.close();
    }
  }

  // Métodos para servicios
  public getAllServices() {
    const stmt = this.db.prepare(`
      SELECT 
        s.*,
        sc.name as category_name,
        sc.color as category_color,
        sc.icon as category_icon
      FROM services s
      JOIN service_categories sc ON s.category_id = sc.id
      WHERE s.is_active = 1
      ORDER BY s.name
    `);
    return stmt.all();
  }

  public getServiceById(id: number) {
    const stmt = this.db.prepare(`
      SELECT 
        s.*,
        sc.name as category_name,
        sc.color as category_color,
        sc.icon as category_icon
      FROM services s
      JOIN service_categories sc ON s.category_id = sc.id
      WHERE s.id = ? AND s.is_active = 1
    `);
    return stmt.get(id);
  }

  public createService(service: {
    name: string;
    description: string;
    price: number;
    duration: number;
    category_id: number;
  }) {
    const stmt = this.db.prepare(`
      INSERT INTO services (name, description, price, duration, category_id)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      service.name,
      service.description,
      service.price,
      service.duration,
      service.category_id
    );
    
    return result.lastInsertRowid;
  }

  public updateService(id: number, service: {
    name: string;
    description: string;
    price: number;
    duration: number;
    category_id: number;
  }) {
    const stmt = this.db.prepare(`
      UPDATE services 
      SET name = ?, description = ?, price = ?, duration = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = stmt.run(
      service.name,
      service.description,
      service.price,
      service.duration,
      service.category_id,
      id
    );
    
    return result.changes > 0;
  }

  public deleteService(id: number) {
    const stmt = this.db.prepare(`
      UPDATE services 
      SET is_active = 0, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Métodos para categorías
  public getAllCategories() {
    const stmt = this.db.prepare(`
      SELECT * FROM service_categories 
      WHERE is_active = 1 
      ORDER BY name
    `);
    return stmt.all();
  }

  public getCategoryById(id: number) {
    const stmt = this.db.prepare(`
      SELECT * FROM service_categories 
      WHERE id = ? AND is_active = 1
    `);
    return stmt.get(id);
  }

  public createCategory(category: {
    name: string;
    color: string;
    icon: string;
    description?: string;
  }) {
    const stmt = this.db.prepare(`
      INSERT INTO service_categories (name, color, icon, description)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      category.name,
      category.color,
      category.icon,
      category.description || null
    );
    
    return result.lastInsertRowid;
  }

  public updateCategory(id: number, category: {
    name: string;
    color: string;
    icon: string;
    description?: string;
  }) {
    const stmt = this.db.prepare(`
      UPDATE service_categories 
      SET name = ?, color = ?, icon = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = stmt.run(
      category.name,
      category.color,
      category.icon,
      category.description || null,
      id
    );
    
    return result.changes > 0;
  }

  public deleteCategory(id: number) {
    // Verificar si hay servicios usando esta categoría
    const servicesStmt = this.db.prepare(`
      SELECT COUNT(*) as count FROM services WHERE category_id = ? AND is_active = 1
    `);
    const servicesCount = servicesStmt.get(id) as { count: number };
    
    if (servicesCount.count > 0) {
      throw new Error('No se puede eliminar la categoría porque tiene servicios asociados');
    }
    
    const stmt = this.db.prepare(`
      UPDATE service_categories 
      SET is_active = 0, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = stmt.run(id);
    return result.changes > 0;
  }
}

export default DatabaseService;
