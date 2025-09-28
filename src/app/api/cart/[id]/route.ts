import { NextRequest, NextResponse } from 'next/server';
import { removeFromCart } from '../../../../../lib/database';
import { getCurrentUser } from '../../../../../lib/auth';
import { initDatabase } from '../../../../../lib/database';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // VULNERABILITY: SQL Injection - direct parameter usage
    removeFromCart(parseInt(params.id));
    
    return NextResponse.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Cart API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
