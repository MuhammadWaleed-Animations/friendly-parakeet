import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers } from '../../../../../lib/database';
import { getCurrentUser } from '../../../../../lib/auth';
import { initDatabase } from '../../../../../lib/database';

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
    
    // VULNERABILITY: No authorization check - any authenticated user can access
    const users = getAllUsers();
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Admin users API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
