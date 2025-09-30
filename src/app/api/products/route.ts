import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, searchProducts } from '../../../../lib/database';
import { initDatabase } from '../../../../lib/database';

export async function GET(request: NextRequest) {
  try {
    await initDatabase();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    let products;
    if (search) {
      // VULNERABILITY: SQL Injection in search
      products = searchProducts(search);
    } else {
      products = getAllProducts();
    }
    
    const res = NextResponse.json({ products });
    // Cache for 1 minute on browser, 10 minutes on CDN
    res.headers.set('Cache-Control', 'public, max-age=60, s-maxage=600, stale-while-revalidate=60');
    return res;
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
