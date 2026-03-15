import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Message } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const messages = await Message.find()
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCookie = request.cookies.get('auth')?.value;

    if (!authCookie) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { content, image } = await request.json();

    if (!content && !image) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const newMessage = new Message({
      sender: authCookie,
      content,
      image: image || null,
    });

    await newMessage.save();

    return NextResponse.json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error('Create message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
