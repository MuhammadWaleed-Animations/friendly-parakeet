import { NextRequest, NextResponse } from 'next/server';
import { register } from '../../../../../lib/auth';
import { initDatabase } from '../../../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    
    const { email, password, name } = await request.json();
    
    // VULNERABILITY: No input validation, no rate limiting
    const result = await register(email, password, name);
    
    if (!result) {
      return NextResponse.json({ error: 'Registration failed' }, { status: 400 });
    }

    // VULNERABILITY: Setting cookie without secure flags
    const response = NextResponse.json({ 
      user: result.user,
      message: 'Registration successful' 
    });
    
    response.cookies.set('auth-token', result.token, {
      httpOnly: false, // VULNERABILITY: Should be true
      secure: false,    // VULNERABILITY: Should be true in production
      sameSite: 'lax'  // VULNERABILITY: Should be 'strict'
    });
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
