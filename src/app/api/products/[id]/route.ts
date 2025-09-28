import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '../../../../../lib/database';
import { initDatabase } from '../../../../../lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase();
    
    // VULNERABILITY: SQL Injection - direct parameter usage
    const product = getProductById(params.id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ product });
  } catch (error) {
    console.error('Product API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
