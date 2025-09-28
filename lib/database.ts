import fs from 'fs';
import path from 'path';

// Simple JSON-based database for easier setup
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
  if (db) return db;

  try {
    const dbPath = path.join(process.cwd(), 'database.json');
    
    // Check if database file exists
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      db = JSON.parse(data);
    } else {
      // Create new database with sample data
      db = {
        users: [],
        products: [],
        cart: [],
        orders: [],
        order_items: [],
        nextId: { users: 1, products: 1, cart: 1, orders: 1, order_items: 1 }
      };
      
      // Insert sample data
      insertSampleData();
      saveDatabase();
    }
    
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

function insertSampleData() {
  // Insert admin user (intentionally weak password)
  db.users.push({
    id: db.nextId.users++,
    email: 'admin@attackme.com',
    password: 'admin123', // VULNERABILITY: Plain text password
    name: 'Admin User',
    role: 'admin',
    created_at: new Date().toISOString(),
    phone: '1234567890',
    address: '123 Admin St',
    credit_card: '4111111111111111' // VULNERABILITY: Plain text credit card
  });

  // Insert sample users
  db.users.push(
    {
      id: db.nextId.users++,
      email: 'john@example.com',
      password: 'password123',
      name: 'John Doe',
      role: 'user',
      created_at: new Date().toISOString(),
      phone: '555-0123',
      address: '456 Main St',
      credit_card: '4532015112830366'
    },
    {
      id: db.nextId.users++,
      email: 'jane@example.com',
      password: 'password123',
      name: 'Jane Smith',
      role: 'user',
      created_at: new Date().toISOString(),
      phone: '555-0124',
      address: '789 Oak Ave',
      credit_card: '5555555555554444'
    },
    {
      id: db.nextId.users++,
      email: 'test@test.com',
      password: 'test123',
      name: 'Test User',
      role: 'user',
      created_at: new Date().toISOString(),
      phone: '555-0125',
      address: '321 Pine Rd',
      credit_card: '4000000000000002'
    }
  );

  // Insert sample products
  db.products.push(
    {
      id: db.nextId.products++,
      name: 'iPhone 15 Pro',
      description: 'Latest Apple smartphone with advanced camera system',
      price: 999.99,
      image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      category: 'Electronics',
      stock: 50,
      created_at: new Date().toISOString()
    },
    {
      id: db.nextId.products++,
      name: 'MacBook Pro M3',
      description: 'Powerful laptop for professionals',
      price: 1999.99,
      image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      category: 'Electronics',
      stock: 25,
      created_at: new Date().toISOString()
    },
    {
      id: db.nextId.products++,
      name: 'Samsung Galaxy S24',
      description: 'Android flagship with AI features',
      price: 799.99,
      image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      category: 'Electronics',
      stock: 40,
      created_at: new Date().toISOString()
    },
    {
      id: db.nextId.products++,
      name: 'Nike Air Max 270',
      description: 'Comfortable running shoes',
      price: 150.00,
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      category: 'Fashion',
      stock: 100,
      created_at: new Date().toISOString()
    },
    {
      id: db.nextId.products++,
      name: 'Adidas Ultraboost 22',
      description: 'Premium running shoes',
      price: 180.00,
      image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
      category: 'Fashion',
      stock: 75,
      created_at: new Date().toISOString()
    },
    {
      id: db.nextId.products++,
      name: 'Levi\'s 501 Jeans',
      description: 'Classic straight fit jeans',
      price: 89.99,
      image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
      category: 'Fashion',
      stock: 200,
      created_at: new Date().toISOString()
    },
    {
      id: db.nextId.products++,
      name: 'Nintendo Switch',
      description: 'Portable gaming console',
      price: 299.99,
      image_url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
      category: 'Gaming',
      stock: 30,
      created_at: new Date().toISOString()
    },
    {
      id: db.nextId.products++,
      name: 'PlayStation 5',
      description: 'Next-gen gaming console',
      price: 499.99,
      image_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
      category: 'Gaming',
      stock: 15,
      created_at: new Date().toISOString()
    },
    {
      id: db.nextId.products++,
      name: 'Sony WH-1000XM5',
      description: 'Noise-canceling headphones',
      price: 399.99,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
      category: 'Electronics',
      stock: 60,
      created_at: new Date().toISOString()
    },
    {
      id: db.nextId.products++,
      name: 'Apple Watch Series 9',
      description: 'Smartwatch with health monitoring',
      price: 399.99,
      image_url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
      category: 'Electronics',
      stock: 35,
      created_at: new Date().toISOString()
    }
  );
}

export function saveDatabase() {
  if (db) {
    const dbPath = path.join(process.cwd(), 'database.json');
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
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
  const database = getDatabase();
  // VULNERABILITY: No input validation, direct search
  return database.users.find((user: User) => user.email === email) || null;
}

export function getAllProducts(): Product[] {
  const database = getDatabase();
  return database.products.sort((a: Product, b: Product) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getProductById(id: string): Product | null {
  const database = getDatabase();
  // VULNERABILITY: No input validation
  const productId = parseInt(id);
  return database.products.find((product: Product) => product.id === productId) || null;
}

export function searchProducts(searchTerm: string): Product[] {
  const database = getDatabase();
  // VULNERABILITY: No input sanitization, direct string matching
  return database.products.filter((product: Product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function createUser(email: string, password: string, name: string): User | null {
  const database = getDatabase();
  try {
    // VULNERABILITY: No input validation, no duplicate checking
    const newUser: User = {
      id: database.nextId.users++,
      email,
      password, // VULNERABILITY: Stored in plain text
      name,
      role: 'user',
      created_at: new Date().toISOString()
    };
    
    database.users.push(newUser);
    saveDatabase();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export function addToCart(userId: number, productId: number, quantity: number = 1) {
  const database = getDatabase();
  // VULNERABILITY: No validation of user/product existence
  const cartItem: CartItem = {
    id: database.nextId.cart++,
    user_id: userId,
    product_id: productId,
    quantity,
    created_at: new Date().toISOString()
  };
  
  database.cart.push(cartItem);
  saveDatabase();
}

export function getCartItems(userId: number) {
  const database = getDatabase();
  // VULNERABILITY: No authorization check
  const cartItems = database.cart.filter((item: CartItem) => item.user_id === userId);
  
  return cartItems.map((item: CartItem) => {
    const product = database.products.find((p: Product) => p.id === item.product_id);
    return {
      id: item.id,
      user_id: item.user_id,
      product_id: item.product_id,
      quantity: item.quantity,
      created_at: item.created_at,
      name: product?.name || 'Unknown Product',
      price: product?.price || 0,
      image_url: product?.image_url || ''
    };
  });
}

export function removeFromCart(cartId: number) {
  const database = getDatabase();
  // VULNERABILITY: No authorization check
  const index = database.cart.findIndex((item: CartItem) => item.id === cartId);
  if (index > -1) {
    database.cart.splice(index, 1);
    saveDatabase();
  }
}

export function createOrder(userId: number, totalAmount: number, shippingAddress: string, paymentMethod: string) {
  const database = getDatabase();
  // VULNERABILITY: No validation
  const order: Order = {
    id: database.nextId.orders++,
    user_id: userId,
    total_amount: totalAmount,
    status: 'pending',
    shipping_address: shippingAddress,
    payment_method: paymentMethod,
    created_at: new Date().toISOString()
  };
  
  database.orders.push(order);
  saveDatabase();
  return order.id;
}

export function addOrderItem(orderId: number, productId: number, quantity: number, price: number) {
  const database = getDatabase();
  // VULNERABILITY: No validation
  const orderItem: OrderItem = {
    id: database.nextId.order_items++,
    order_id: orderId,
    product_id: productId,
    quantity,
    price
  };
  
  database.order_items.push(orderItem);
  saveDatabase();
}

export function getUserOrders(userId: number) {
  const database = getDatabase();
  // VULNERABILITY: No authorization check
  return database.orders.filter((order: Order) => order.user_id === userId)
    .sort((a: Order, b: Order) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getAllUsers() {
  const database = getDatabase();
  // VULNERABILITY: No authorization check - exposes all user data
  return database.users;
}