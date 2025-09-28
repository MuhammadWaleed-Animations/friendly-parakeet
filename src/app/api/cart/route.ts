import { NextRequest, NextResponse } from 'next/server';
import { getCartItems, addToCart } from '../../../../lib/database';
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
    
    const cartItems = getCartItems(user.id);
    return NextResponse.json({ cartItems });
  } catch (error) {
    console.error('Cart API error:', error);
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
    
    const { productId, quantity } = await request.json();
    
    // VULNERABILITY: No input validation
    addToCart(user.id, productId, quantity);
    
    return NextResponse.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
