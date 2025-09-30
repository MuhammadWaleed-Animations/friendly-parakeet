import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '../../../../../lib/database';
import { initDatabase } from '../../../../../lib/database';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await initDatabase();
    
    // VULNERABILITY: SQL Injection - direct parameter usage
    const { id } = await context.params;
    const product = getProductById(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    const res = NextResponse.json({ product });
    // Cache product detail for 5 minutes on browser, 30 minutes on CDN
    res.headers.set('Cache-Control', 'public, max-age=300, s-maxage=1800, stale-while-revalidate=60');
    return res;
  } catch (error) {
    console.error('Product API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
