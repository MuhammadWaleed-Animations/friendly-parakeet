import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser, User } from './database';

const JWT_SECRET = 'attackme_secret_key_123'; // Intentionally weak secret

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  // VULNERABILITY: Using weak salt rounds
  return await bcrypt.hash(password, 5);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: AuthUser): string {
  // VULNERABILITY: No expiration time, weak secret
  return jwt.sign(user, JWT_SECRET);
}

export function verifyToken(token: string): AuthUser | null {
  try {
    // VULNERABILITY: No expiration validation
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (error) {
    return null;
  }
}

export async function login(email: string, password: string): Promise<{ user: AuthUser; token: string } | null> {
  const user = getUserByEmail(email);
  
  if (!user) {
    return null;
  }

  // VULNERABILITY: Timing attack - different response times for existing vs non-existing users
  const isValid = await verifyPassword(password, user.password);
  
  if (!isValid) {
    return null;
  }

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };

  const token = generateToken(authUser);
  
  return { user: authUser, token };
}

export async function register(email: string, password: string, name: string): Promise<{ user: AuthUser; token: string } | null> {
  // VULNERABILITY: No input validation, no rate limiting
  const hashedPassword = await hashPassword(password);
  const user = createUser(email, hashedPassword, name);
  
  if (!user) {
    return null;
  }

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };

  const token = generateToken(authUser);
  
  return { user: authUser, token };
}

export function getCurrentUser(token: string): AuthUser | null {
  return verifyToken(token);
}
