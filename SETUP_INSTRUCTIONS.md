# Ashu & Chiku - Romantic Chat Setup Guide

## Quick Start (5 minutes)

### Step 1: Create MongoDB Database
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a FREE account
3. Create a new project (any name)
4. Create a FREE M0 cluster (default options are fine)
5. Wait for the cluster to be created (2-3 minutes)

### Step 2: Get Connection String
1. In MongoDB Atlas, click the "Connect" button on your cluster
2. Click "Drivers" (not "Compass")
3. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster...`)
4. Save it somewhere temporarily

### Step 3: Whitelist Your IP
1. In MongoDB Atlas left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for testing) or add your IP
4. Confirm

### Step 4: Add to Vercel
1. Open your Vercel project
2. Click the settings icon (⚙️) in the top right
3. Click "Vars" tab
4. Click "Add Variable"
5. Name: `MONGODB_URI`
6. Value: Paste your MongoDB connection string
7. Click "Save"

### Step 5: Refresh and Setup Users
1. Go back to your chat app
2. Refresh the page
3. You should see a setup section asking to initialize users
4. Click "Initialize Database"

### Step 6: Login!
Use these credentials:
- **Ashu**: username `ashu`, password `ashu123`
- **Chiku**: username `chiku`, password `chiku123`

---

## How It Works

### No Real-Time Chat
- No WebSockets needed - just refresh to see new messages
- Perfect for your use case where you need to share links between messages
- Each refresh loads all messages from the database

### Message Features
- Send text messages
- Upload images/GIFs (stored as Base64 in database)
- Add emojis and special characters
- Messages show who sent them and when

### Persistent Login
- Uses secure HTTP-only cookies
- You won't need to login again after first time
- Each of you can be logged in as your own user

### Database
- All data stored in MongoDB database named "chikash"
- Messages never expire or auto-delete
- You can add more users by modifying the setup script

---

## Troubleshooting

### "MONGODB_URI is not set"
- Make sure you added the environment variable in Vercel settings
- Check that you copied the FULL connection string (including `mongodb+srv://`)
- Refresh the page after adding the variable

### "Authentication failed"
- Check your MongoDB username and password in the connection string
- Make sure your IP is whitelisted in Network Access
- Try using "Allow Access from Anywhere" temporarily

### "Cannot connect to database"
- Make sure your cluster is fully created (wait 2-3 minutes)
- Check if the connection string is correct
- Try pasting the connection string in MongoDB Compass to test it

### Database Already Has Users
- The app will check if users exist before creating them
- If they already exist, just login with the credentials above

---

## For Vercel Deployment

1. Your code is already in GitHub
2. Make sure MONGODB_URI is in your Vercel project vars
3. Deploy by pushing to GitHub or clicking Deploy in Vercel
4. Share the Vercel URL with Chiku
5. Both of you can login with your credentials

---

## Security Notes

- Passwords are hashed with bcrypt before storing
- Cookies are HTTP-only (can't be stolen by JavaScript)
- Each user can only see/send their own messages
- Images are stored as Base64 in the database

---

## Database Structure

**Users Collection:**
- username (unique, lowercase)
- password (bcrypt hashed)
- displayName (Ashu or Chiku)
- createdAt (timestamp)

**Messages Collection:**
- sender (username: "ashu" or "chiku")
- text (message content)
- image (optional Base64 encoded image)
- createdAt (timestamp)

---

Need help? Check the error message on the page - it has step-by-step instructions!
