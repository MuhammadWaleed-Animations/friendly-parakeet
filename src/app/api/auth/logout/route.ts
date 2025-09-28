import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  // VULNERABILITY: Not properly clearing the cookie
  response.cookies.set('auth-token', '', {
    expires: new Date(0),
    httpOnly: false,
    secure: false,
    sameSite: 'lax'
  });
  
  return response;
}