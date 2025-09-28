import { NextRequest, NextResponse } from 'next/server';
import { getUserOrders, createOrder, addOrderItem, getCartItems } from '../../../../lib/database';
import { getCurrentUser } from '../../../../lib/auth';
import { initDatabase } from '../../../../lib/database';

export async function GET(request: NextRequest) {
  try {
    await initDatabase();
    
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = getCurrentUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const orders = getUserOrders(user.id);
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = getCurrentUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const { shippingAddress, paymentMethod } = await request.json();
    
    // VULNERABILITY: No input validation
    const cartItems = getCartItems(user.id);
    
    if (cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    
    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // VULNERABILITY: SQL Injection in order creation
    const orderId = createOrder(user.id, totalAmount, shippingAddress, paymentMethod);
    
    // Add order items
    for (const item of cartItems) {
      addOrderItem(orderId, item.product_id, item.quantity, item.price);
    }
    
    return NextResponse.json({ 
      message: 'Order created successfully',
      orderId 
    });
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
