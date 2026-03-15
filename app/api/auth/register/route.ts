import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import { User } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    const { username, password, displayName } = await request.json();

    console.log('[REGISTER] Incoming request body:', {
      username,
      hasPassword: !!password,
      hasDisplayName: !!displayName,
    });

    if (!username || !password || !displayName) {
      console.log('[REGISTER] Missing required fields', {
        hasUsername: !!username,
        hasPassword: !!password,
        hasDisplayName: !!displayName,
      });
      return NextResponse.json(
        { error: 'Username, password, and display name are required' },
        { status: 400 }
      );
    }

    console.log('[REGISTER] Connecting to MongoDB...');
    await connectDB();
    console.log('[REGISTER] Connected. Checking for existing user:', username.toLowerCase());

    // Check if user already exists
    const existingUser = await User.findOne({ username: username.toLowerCase() });
    console.log('[REGISTER] Existing user lookup result:', existingUser ? {
      id: existingUser._id,
      username: existingUser.username,
      displayName: existingUser.displayName,
    } : null);

    if (existingUser) {
      console.log('[REGISTER] Username already exists:', username.toLowerCase());
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[REGISTER] Password hashed successfully');

    // Create new user
    const newUser = new User({
      username: username.toLowerCase(),
      password: hashedPassword,
      displayName,
    });

    await newUser.save();
    console.log('[REGISTER] New user saved:', {
      id: newUser._id,
      username: newUser.username,
      displayName: newUser.displayName,
      createdAt: newUser.createdAt,
    });

    const responsePayload = {
      success: true,
      user: {
        username: newUser.username,
        displayName: newUser.displayName,
      },
    };

    console.log('[REGISTER] Successful registration, response payload:', responsePayload);

    const response = NextResponse.json(responsePayload);

    // Set secure HTTP-only cookie
    response.cookies.set('auth', username.toLowerCase(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    console.log('[REGISTER] Auth cookie set for:', username.toLowerCase());

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
