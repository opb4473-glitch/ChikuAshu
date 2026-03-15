import mongoose from 'mongoose';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Explicitly point to the "chikash" database instead of MongoDB's default "test"
  const MONGODB_URI =
    'mongodb+srv://ashrd2905:07Q80BtVF547UCIo@avrclustor.yhzrr77.mongodb.net/chikash?retryWrites=true&w=majority&appName=AVRclustor';

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('[v0] Connected to MongoDB database: chikash');
      console.log('[v0] Full URI (without credentials): mongodb+srv://<user>:<password>@avrclustor.yhzrr77.mongodb.net/chikash');
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('[v0] MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
