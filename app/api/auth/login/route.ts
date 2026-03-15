import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import { User } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const usernameLower = username?.toLowerCase();

    console.log('[LOGIN] Incoming request body:', { username, hasPassword: !!password });

    if (!username || !password) {
      console.log('[LOGIN] Missing username or password');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    console.log('[LOGIN] Connecting to MongoDB...');
    await connectDB();
    console.log('[LOGIN] Connected. Looking for user:', usernameLower);

    let user = await User.findOne({ username: usernameLower });
    console.log('[LOGIN] User lookup result:', user ? {
      id: user._id,
      username: user.username,
      displayName: user.displayName,
    } : null);

    // Auto-create default users ashu / chiku in chikash DB if missing
    if (!user && (usernameLower === 'ashu' || usernameLower === 'chiku')) {
      console.log(`[LOGIN] No user found for ${usernameLower}. Auto-creating default user in chikash DB.`);

      const defaultPassword = usernameLower === 'ashu' ? 'ashu123' : 'chiku123';
      const displayName = usernameLower === 'ashu' ? 'Ashu' : 'Chiku';

      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      user = await User.create({
        username: usernameLower,
        password: hashedPassword,
        displayName,
      });

      console.log('[LOGIN] Auto-created user:', {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        createdAt: user.createdAt,
      });
    }

    if (!user) {
      console.log('[LOGIN] No user found for username (and not auto-created):', usernameLower);

      const allUsers = await User.find({}, { username: 1, displayName: 1, createdAt: 1 });
      console.log('[LOGIN] Current users in DB:', allUsers);

      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('[LOGIN] Password comparison result:', { isPasswordValid });

    if (!isPasswordValid) {
      console.log('[LOGIN] Invalid password for username:', user.username);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const responsePayload = {
      success: true,
      user: {
        username: user.username,
        displayName: user.displayName,
      },
    };

    console.log('[LOGIN] Successful login, response payload:', responsePayload);

    const response = NextResponse.json(responsePayload);

    // Set secure HTTP-only cookie
    response.cookies.set('auth', usernameLower, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    console.log('[LOGIN] Auth cookie set for:', username.toLowerCase());

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
