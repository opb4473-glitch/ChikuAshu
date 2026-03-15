import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  displayName: string;
  createdAt: Date;
}

export interface IMessage extends Document {
  sender: string;
  content: string;
  image?: string; // Base64 encoded image
  createdAt: Date;
}

// User Schema
const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Message Schema
const MessageSchema: Schema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Base64 encoded
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
