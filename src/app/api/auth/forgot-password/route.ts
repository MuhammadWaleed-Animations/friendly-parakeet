import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '../../../../../lib/database';
import { initDatabase } from '../../../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    await initDatabase();
    
    const { email } = await request.json();
    
    // VULNERABILITY: No input validation
    // VULNERABILITY: Information disclosure - reveals if email exists
    const user = getUserByEmail(email);
    
    if (!user) {
      // VULNERABILITY: Different response times and messages for existing vs non-existing users
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // VULNERABILITY: No rate limiting
    // VULNERABILITY: No actual email sending (just simulation)
    // VULNERABILITY: Weak reset token (predictable)
    const resetToken = Buffer.from(`${user.id}-${Date.now()}`).toString('base64');
    
    // In a real application, you would:
    // 1. Generate a secure random token
    // 2. Store it in database with expiration
    // 3. Send actual email with reset link
    // 4. Implement rate limiting
    
    console.log(`Password reset requested for ${email}. Token: ${resetToken}`);
    
    return NextResponse.json({ 
      message: 'Password reset instructions sent',
      // VULNERABILITY: Exposing reset token in response (for demo purposes)
      resetToken: resetToken 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
