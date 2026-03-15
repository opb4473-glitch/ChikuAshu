import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Check if users already exist
    const ashuExists = await User.findOne({ username: 'ashu' });
    const chikuExists = await User.findOne({ username: 'chiku' });

    if (ashuExists && chikuExists) {
      return NextResponse.json({
        status: 'already_initialized',
        message: 'Users already exist. Please login.',
      });
    }

    // Create Ashu
    if (!ashuExists) {
      const hashedPassword = await bcrypt.hash('ashu123', 10);
      await User.create({
        username: 'ashu',
        password: hashedPassword,
        displayName: 'Ashu',
      });
    }

    // Create Chiku
    if (!chikuExists) {
      const hashedPassword = await bcrypt.hash('chiku123', 10);
      await User.create({
        username: 'chiku',
        password: hashedPassword,
        displayName: 'Chiku',
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Users initialized successfully!',
      credentials: {
        ashu: 'ashu123',
        chiku: 'chiku123',
      },
    });
  } catch (error: any) {
    console.error('[v0] Init error:', error);
    return NextResponse.json(
      { error: error.message || 'Initialization failed' },
      { status: 500 }
    );
  }
}
