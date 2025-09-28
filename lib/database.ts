import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';

let SQL: any = null;
let db: any = null;

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  created_at: string;
  phone?: string;
  address?: string;
  credit_card?: string; // Intentionally storing sensitive data in plain text
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  created_at: string;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  shipping_address: string;
  payment_method: string;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export async function initDatabase() {
  if (SQL && db) return db;

  try {
    SQL = await initSqlJs({
      // You can specify the path to sql-wasm.wasm if needed
    });

    const dbPath = path.join(process.cwd(), 'database.sqlite');
    
    // Check if database file exists
    if (fs.existsSync(dbPath)) {
      const filebuffer = fs.readFileSync(dbPath);
      db = new SQL.Database(filebuffer);
    } else {
      db = new SQL.Database();
    }

    // Create tables
    createTables();
    
    // Insert sample data
    insertSampleData();
    
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

function createTables() {
  // Users table - intentionally vulnerable design
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      phone TEXT,
      address TEXT,
      credit_card TEXT
    )
  `);

  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      image_url TEXT,
      category TEXT,
      stock INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Cart table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_id INTEGER,
      quantity INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      shipping_address TEXT,
      payment_method TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Order items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);
}

function insertSampleData() {
  // Check if data already exists
  const userCount = db.exec("SELECT COUNT(*) as count FROM users");
  if (userCount[0]?.values[0][0] > 0) return;

  // Insert admin user (intentionally weak password)
  db.exec(`
    INSERT INTO users (email, password, name, role, phone, address, credit_card) VALUES 
    ('admin@attackme.com', 'admin123', 'Admin User', 'admin', '1234567890', '123 Admin St', '4111111111111111')
  `);

  // Insert sample users
  db.exec(`
    INSERT INTO users (email, password, name, role, phone, address, credit_card) VALUES 
    ('john@example.com', 'password123', 'John Doe', 'user', '555-0123', '456 Main St', '4532015112830366'),
    ('jane@example.com', 'password123', 'Jane Smith', 'user', '555-0124', '789 Oak Ave', '5555555555554444'),
    ('test@test.com', 'test123', 'Test User', 'user', '555-0125', '321 Pine Rd', '4000000000000002')
  `);

  // Insert sample products
  db.exec(`
    INSERT INTO products (name, description, price, image_url, category, stock) VALUES 
    ('iPhone 15 Pro', 'Latest Apple smartphone with advanced camera system', 999.99, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', 'Electronics', 50),
    ('MacBook Pro M3', 'Powerful laptop for professionals', 1999.99, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', 'Electronics', 25),
    ('Samsung Galaxy S24', 'Android flagship with AI features', 799.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', 'Electronics', 40),
    ('Nike Air Max 270', 'Comfortable running shoes', 150.00, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'Fashion', 100),
    ('Adidas Ultraboost 22', 'Premium running shoes', 180.00, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500', 'Fashion', 75),
    ('Levi\'s 501 Jeans', 'Classic straight fit jeans', 89.99, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500', 'Fashion', 200),
    ('Nintendo Switch', 'Portable gaming console', 299.99, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500', 'Gaming', 30),
    ('PlayStation 5', 'Next-gen gaming console', 499.99, 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500', 'Gaming', 15),
    ('Sony WH-1000XM5', 'Noise-canceling headphones', 399.99, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500', 'Electronics', 60),
    ('Apple Watch Series 9', 'Smartwatch with health monitoring', 399.99, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500', 'Electronics', 35)
  `);

  // Save database to file
  saveDatabase();
}

export function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(path.join(process.cwd(), 'database.sqlite'), buffer);
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

// Vulnerable query functions (intentionally unsafe)
export function getUserByEmail(email: string): User | null {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection - direct string concatenation
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  const result = db.exec(query);
  
  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0].values[0];
    return {
      id: row[0],
      email: row[1],
      password: row[2],
      name: row[3],
      role: row[4],
      created_at: row[5],
      phone: row[6],
      address: row[7],
      credit_card: row[8]
    };
  }
  return null;
}

export function getAllProducts(): Product[] {
  const db = getDatabase();
  const result = db.exec("SELECT * FROM products ORDER BY created_at DESC");
  
  if (result.length > 0) {
    return result[0].values.map((row: any[]) => ({
      id: row[0],
      name: row[1],
      description: row[2],
      price: row[3],
      image_url: row[4],
      category: row[5],
      stock: row[6],
      created_at: row[7]
    }));
  }
  return [];
}

export function getProductById(id: string): Product | null {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection
  const query = `SELECT * FROM products WHERE id = ${id}`;
  const result = db.exec(query);
  
  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0].values[0];
    return {
      id: row[0],
      name: row[1],
      description: row[2],
      price: row[3],
      image_url: row[4],
      category: row[5],
      stock: row[6],
      created_at: row[7]
    };
  }
  return null;
}

export function searchProducts(searchTerm: string): Product[] {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection
  const query = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%'`;
  const result = db.exec(query);
  
  if (result.length > 0) {
    return result[0].values.map((row: any[]) => ({
      id: row[0],
      name: row[1],
      description: row[2],
      price: row[3],
      image_url: row[4],
      category: row[5],
      stock: row[6],
      created_at: row[7]
    }));
  }
  return [];
}

export function createUser(email: string, password: string, name: string): User | null {
  const db = getDatabase();
  try {
    // VULNERABILITY: SQL Injection
    const query = `INSERT INTO users (email, password, name) VALUES ('${email}', '${password}', '${name}')`;
    db.exec(query);
    
    return getUserByEmail(email);
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export function addToCart(userId: number, productId: number, quantity: number = 1) {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection
  const query = `INSERT INTO cart (user_id, product_id, quantity) VALUES (${userId}, ${productId}, ${quantity})`;
  db.exec(query);
  saveDatabase();
}

export function getCartItems(userId: number) {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection
  const query = `SELECT c.*, p.name, p.price, p.image_url FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ${userId}`;
  const result = db.exec(query);
  
  if (result.length > 0) {
    return result[0].values.map((row: any[]) => ({
      id: row[0],
      user_id: row[1],
      product_id: row[2],
      quantity: row[3],
      created_at: row[4],
      name: row[5],
      price: row[6],
      image_url: row[7]
    }));
  }
  return [];
}

export function removeFromCart(cartId: number) {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection
  const query = `DELETE FROM cart WHERE id = ${cartId}`;
  db.exec(query);
  saveDatabase();
}

export function createOrder(userId: number, totalAmount: number, shippingAddress: string, paymentMethod: string) {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection
  const query = `INSERT INTO orders (user_id, total_amount, shipping_address, payment_method) VALUES (${userId}, ${totalAmount}, '${shippingAddress}', '${paymentMethod}')`;
  db.exec(query);
  
  // Get the last inserted order ID
  const result = db.exec("SELECT last_insert_rowid() as id");
  const orderId = result[0].values[0][0];
  
  saveDatabase();
  return orderId;
}

export function addOrderItem(orderId: number, productId: number, quantity: number, price: number) {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection
  const query = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (${orderId}, ${productId}, ${quantity}, ${price})`;
  db.exec(query);
  saveDatabase();
}

export function getUserOrders(userId: number) {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection
  const query = `SELECT * FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC`;
  const result = db.exec(query);
  
  if (result.length > 0) {
    return result[0].values.map((row: any[]) => ({
      id: row[0],
      user_id: row[1],
      total_amount: row[2],
      status: row[3],
      shipping_address: row[4],
      payment_method: row[5],
      created_at: row[6]
    }));
  }
  return [];
}

export function getAllUsers() {
  const db = getDatabase();
  // VULNERABILITY: SQL Injection - exposes all user data
  const query = `SELECT * FROM users`;
  const result = db.exec(query);
  
  if (result.length > 0) {
    return result[0].values.map((row: any[]) => ({
      id: row[0],
      email: row[1],
      password: row[2],
      name: row[3],
      role: row[4],
      created_at: row[5],
      phone: row[6],
      address: row[7],
      credit_card: row[8]
    }));
  }
  return [];
}
