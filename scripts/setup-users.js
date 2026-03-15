import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set in .env.local');
  console.error('Please set it first before running setup');
  process.exit(1);
}

// Ensure database name is 'chikash'
const mongoDBURI = MONGODB_URI.includes('chikash') 
  ? MONGODB_URI 
  : `${MONGODB_URI}${MONGODB_URI.endsWith('/') ? '' : '/'}chikash`;

console.log('🔄 Connecting to MongoDB database: chikash');
console.log(`📍 URI: ${mongoDBURI.split('//')[1]?.split('@')[1] || 'localhost'}`);

async function setupUsers() {
  try {
    await mongoose.connect(mongoDBURI);
    console.log('✅ Connected to MongoDB\n');

    // Define User schema
    const userSchema = new mongoose.Schema({
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

    // Drop existing collection to ensure clean setup
    try {
      await mongoose.connection.collection('users').drop();
      console.log('🗑️  Cleared existing users collection');
    } catch (e) {
      // Collection might not exist yet
    }

    const User = mongoose.model('User', userSchema);

    // Create Ashu user
    const ashuHashedPassword = await bcrypt.hash('ashu123', 10);
    const ashuUser = await User.create({
      username: 'ashu',
      password: ashuHashedPassword,
      displayName: 'Ashu',
    });
    console.log('✅ Created user: Ashu');
    console.log('   Username: ashu');
    console.log('   Password: ashu123');

    // Create Chiku user
    const chikuHashedPassword = await bcrypt.hash('chiku123', 10);
    const chikuUser = await User.create({
      username: 'chiku',
      password: chikuHashedPassword,
      displayName: 'Chiku',
    });
    console.log('✅ Created user: Chiku');
    console.log('   Username: chiku');
    console.log('   Password: chiku123');

    console.log('\n' + '='.repeat(50));
    console.log('✨ SETUP COMPLETE! ✨');
    console.log('='.repeat(50));
    console.log('\nYou can now login with:\n');
    console.log('👤 ASHU:');
    console.log('   Username: ashu');
    console.log('   Password: ashu123\n');
    console.log('👤 CHIKU:');
    console.log('   Username: chiku');
    console.log('   Password: chiku123\n');
    console.log('Database: chikash');
    console.log('='.repeat(50));

    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

setupUsers();
