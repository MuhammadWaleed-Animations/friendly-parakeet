import { NextRequest, NextResponse } from 'next/server';
import { login } from '../../../../../lib/auth';
import { initDatabase } from '../../../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    
    const { email, password } = await request.json();
    
    // VULNERABILITY: No input validation
    const result = await login(email, password);
    
    if (!result) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // VULNERABILITY: Setting cookie without secure flags
    const response = NextResponse.json({ 
      user: result.user,
      message: 'Login successful' 
    });
    
    response.cookies.set('auth-token', result.token, {
      httpOnly: false, // VULNERABILITY: Should be true
      secure: false,    // VULNERABILITY: Should be true in production
      sameSite: 'lax'  // VULNERABILITY: Should be 'strict'
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
