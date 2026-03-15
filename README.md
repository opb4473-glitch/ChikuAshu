# 💕 Ashu & Chiku - Romantic Private Chat

A beautiful, private chat application built with Next.js and MongoDB for two best friends who want a simple, secure way to communicate with a romantic aesthetic.

## ✨ Features

- 💬 **Text & Media Messaging** - Send messages with images/GIFs
- 🔄 **Refresh-Based Chat** - No WebSockets needed, just refresh to see new messages
- 🎨 **Romantic Design** - Beautiful rose/pink theme with heart decorations
- 🔐 **Secure Authentication** - Bcrypt password hashing + HTTP-only cookies
- 💾 **Persistent Login** - Stay logged in after refreshing the page
- 🎯 **Simple & Fast** - Lightweight, no real-time complexity
- 📱 **Responsive Design** - Works on mobile and desktop
- 🗄️ **MongoDB Storage** - All messages and images stored in database

## 🚀 Quick Start

### 1. Create MongoDB Database (5 minutes)
```bash
1. Go to https://www.mongodb.com/cloud/atlas
2. Create FREE account
3. Create FREE M0 cluster
4. Get connection string (looks like: mongodb+srv://user:pass@...)
```

### 2. Add to Vercel
```
1. Click settings ⚙️ (top right)
2. Go to "Vars" tab
3. Add: MONGODB_URI = [your connection string]
4. Refresh page
```

### 3. Initialize Database
```
1. Click "Need to Setup Database?" on login page
2. Click "Initialize Database"
3. Done!
```

### 4. Login & Chat
```
Username: ashu or chiku
Password: ashu123 or chiku123 (respectively)
```

**That's it! You're ready to chat.**

## 📖 Documentation

- **`QUICK_START.txt`** - 5-minute setup guide
- **`SETUP_INSTRUCTIONS.md`** - Detailed setup with troubleshooting
- **`API_REFERENCE.md`** - Complete API endpoint documentation
- **`PROJECT_SUMMARY.md`** - Technical project overview

## 🏗️ Architecture

```
┌─────────────┐
│  Vercel     │
│  Frontend   │
│  (React)    │
└──────┬──────┘
       │
       ├─ /api/auth/login      (Login)
       ├─ /api/auth/logout     (Logout)
       ├─ /api/auth/check      (Auth check)
       ├─ /api/messages        (Get/Send/Delete messages)
       └─ /api/init            (Initialize users)
       │
       └──────────────┐
                      │
                ┌─────▼──────┐
                │  Vercel    │
                │  Backend   │
                │  (Next.js) │
                └─────┬──────┘
                      │
                ┌─────▼──────────┐
                │  MongoDB       │
                │  (chikash db)  │
                │  - Users       │
                │  - Messages    │
                └────────────────┘
```

## 🔑 Default Credentials

| User | Username | Password |
|------|----------|----------|
| Ashu | `ashu` | `ashu123` |
| Chiku | `chiku` | `chiku123` |

*Created automatically when you initialize the database*

## 📦 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB + Mongoose
- **Auth**: bcryptjs + HTTP-only cookies
- **Deployment**: Vercel

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Initialize users (local development)
npm run setup-users
```

## 📁 Project Structure

```
app/
├── api/
│   ├── auth/           # Authentication endpoints
│   ├── messages/       # Message endpoints
│   └── init/           # Database initialization
├── chat/               # Chat page
├── page.tsx            # Login/home page
└── layout.tsx          # Root layout

components/
├── LoginPage.tsx       # Login UI
└── ChatPage.tsx        # Chat UI

lib/
├── mongodb.ts          # DB connection
└── models.ts           # Mongoose schemas

scripts/
└── setup-users.js      # Setup script
```

## 🔒 Security

✅ Passwords hashed with bcrypt (salted 10 times)
✅ HTTP-only cookies (can't be accessed by JavaScript)
✅ HTTPS on Vercel (encrypted in transit)
✅ Server-side database connection only
✅ Environment variables never exposed to client

## 🐛 Troubleshooting

### "MONGODB_URI is not set"
Make sure you added the variable in Vercel Vars and refreshed the page.

### "Cannot connect to database"
- Check MongoDB cluster is fully deployed (takes 2-3 minutes)
- Verify connection string is correct
- Make sure your IP is whitelisted in Network Access

### "Login failed"
- Check username/password are correct
- Try initializing database again
- Verify users exist in MongoDB

See **`SETUP_INSTRUCTIONS.md`** for more help.

## 💡 How It Works

### Sending a Message
```
1. You type message in chat box
2. Click "Send"
3. Message sent to /api/messages via POST
4. Stored in MongoDB with your username
5. You see it appear immediately
```

### Receiving a Message
```
1. Chiku sends a message
2. It's stored in MongoDB
3. You click "Refresh" button
4. GET /api/messages fetches all messages
5. You see Chiku's message appear
```

### Images & GIFs
```
1. Click camera icon
2. Select image file
3. Converted to Base64 in browser
4. Sent with message to API
5. Stored in MongoDB as Base64 string
6. Displayed when message loads
```

## 🌟 Features Explained

### No Real-Time Updates
- No WebSockets needed
- Perfect for sharing links between messages
- Lower server cost
- Simpler architecture

### Persistent Login
- HTTP-only cookie stores session
- Won't re-prompt for password
- 7-day session duration
- Secure against XSS attacks

### Base64 Images
- Images stored in database as text
- No separate file storage needed
- Easy backups
- Simple to manage

### Romantic Theme
- Rose & pink color palette
- Heart decorations (♡)
- Serif fonts for elegance
- Personalized with both names

## 📝 Message Format

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "sender": "ashu",
  "content": "Hey Chiku!",
  "image": null,
  "createdAt": "2024-03-15T10:30:00Z"
}
```

## 🚢 Deployment

This app is configured for Vercel:

1. **Connect GitHub** - Your code is already there
2. **Add Environment** - MONGODB_URI in Vercel Vars
3. **Auto Deploy** - Pushes to GitHub deploy automatically
4. **Get URL** - Vercel provides your unique URL
5. **Share** - Send URL to Chiku

## 🎯 Use Cases

- Private chats between close friends
- Couple's communication space
- Backup communication when other apps fail
- Share links and media without app expiration
- Simple group chat for 2 people

## 🔄 Message Flow

```
┌────────────────────────┐
│  Ashu sends message    │
│  "Let's use this"      │
└────────────┬───────────┘
             │
             ▼
    ┌────────────────┐
    │ /api/messages  │
    │     POST       │
    └────────┬───────┘
             │
             ▼
    ┌────────────────┐
    │  MongoDB       │
    │  Stores msg    │
    └────────────────┘

┌────────────────────────┐
│  Chiku refreshes       │
└────────────┬───────────┘
             │
             ▼
    ┌────────────────┐
    │ /api/messages  │
    │     GET        │
    └────────┬───────┘
             │
             ▼
    ┌────────────────┐
    │  MongoDB       │
    │  Returns all   │
    │  messages      │
    └────────┬───────┘
             │
             ▼
┌────────────────────────┐
│  Chiku sees message    │
│  "Let's use this"      │
└────────────────────────┘
```

## 📞 Support

If you encounter issues:
1. Read the error message on the page (has hints)
2. Check **`SETUP_INSTRUCTIONS.md`**
3. Verify MONGODB_URI in Vercel Vars
4. Check MongoDB cluster status
5. Try initializing database again

## 🎉 You're All Set!

Everything is ready to go. Just:
1. Add MONGODB_URI to Vercel Vars
2. Click Initialize Database
3. Login with your credentials
4. Start chatting!

Made with ♡ for Ashu & Chiku

---

**Happy chatting! 💕**
#   C h i k u A s h u  
 