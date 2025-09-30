import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '../../../../../lib/database';
import { initDatabase } from '../../../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    
    const { token, password } = await request.json();
    
    // VULNERABILITY: No input validation
    // VULNERABILITY: No token validation or expiration check
    // VULNERABILITY: Predictable token format
    
    if (!token) {
      return NextResponse.json({ error: 'Reset token is required' }, { status: 400 });
    }

    // VULNERABILITY: Weak token validation - just checks if it's base64
    try {
      const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
      const [userId, timestamp] = decodedToken.split('-');
      
      // VULNERABILITY: No expiration check
      // VULNERABILITY: No rate limiting
      
      const db = getDatabase();
      const user = db.users.find((u: any) => u.id === parseInt(userId));
      
      if (!user) {
        return NextResponse.json({ error: 'Invalid reset token' }, { status: 400 });
      }

      // VULNERABILITY: Password stored in plain text
      // VULNERABILITY: No password strength validation
      user.password = password;
      
      saveDatabase();
      
      return NextResponse.json({ 
        message: 'Password reset successfully' 
      });
    } catch (error) {
      return NextResponse.json({ error: 'Invalid reset token format' }, { status: 400 });
    }
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
