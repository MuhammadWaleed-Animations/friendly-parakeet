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
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
