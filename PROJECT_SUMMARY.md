# Ashu & Chiku Romantic Chat App - Project Summary

## Project Overview

A beautiful, private, refresh-based chat application for two best friends (Ashu and Chiku) with a romantic rose/pink theme. No real-time WebSockets - just refresh to see new messages. Perfect for sharing links and media between conversations.

**Database:** MongoDB (chikash database)
**Framework:** Next.js 16
**Styling:** Tailwind CSS with romantic color palette
**Authentication:** Secure bcrypt hashing + HTTP-only cookies
**Media:** Base64 encoded images and GIFs in database

---

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts          # Login endpoint
│   │   │   ├── logout/route.ts         # Logout endpoint
│   │   │   ├── check/route.ts          # Auth check
│   │   │   └── register/route.ts       # User registration
│   │   ├── messages/route.ts            # GET/POST/DELETE messages
│   │   └── init/route.ts                # Database initialization
│   ├── chat/
│   │   └── page.tsx                     # Chat interface page
│   ├── page.tsx                         # Login/home page
│   ├── layout.tsx                       # Root layout
│   └── globals.css                      # Tailwind styles + theme
├── components/
│   ├── ui/                              # shadcn UI components
│   ├── LoginPage.tsx                    # Login component with setup guide
│   └── ChatPage.tsx                     # Chat interface component
├── lib/
│   ├── mongodb.ts                       # MongoDB connection
│   └── models.ts                        # User & Message schemas
├── types/
│   └── global.d.ts                      # Global types
├── scripts/
│   └── setup-users.js                   # Script to initialize users
├── public/                              # Static files
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript config
├── next.config.mjs                      # Next.js config
├── QUICK_START.txt                      # Quick setup guide (THIS FILE!)
├── SETUP_INSTRUCTIONS.md                # Detailed setup guide
├── API_REFERENCE.md                     # API documentation
└── PROJECT_SUMMARY.md                   # This file
```

---

## Key Files Explained

### Frontend Components

**`components/LoginPage.tsx`**
- Beautiful login UI with romantic rose/pink gradient
- Heart decorations (♡)
- Setup guide section with step-by-step instructions
- Error display with helpful messages
- Initialize Database button for first-time setup

**`components/ChatPage.tsx`**
- Main chat interface
- Message display with sender info and timestamps
- Message input with text and image support
- Image preview before sending
- Manual refresh button to load new messages
- Separate message bubbles for Ashu (rose) and Chiku (white)
- Logout button

### Backend APIs

**`app/api/auth/login/route.ts`**
- Validates username/password against database
- Uses bcrypt to verify hashed passwords
- Sets secure HTTP-only cookie
- Returns 7-day session token

**`app/api/auth/logout/route.ts`**
- Clears authentication cookie
- Redirects to login page

**`app/api/auth/check/route.ts`**
- Verifies if user is authenticated
- Returns current username

**`app/api/messages/route.ts`**
- GET: Returns all messages in chronological order
- POST: Sends new text or image message
- DELETE: Deletes user's own message

**`app/api/init/route.ts`**
- Initializes Ashu and Chiku users if they don't exist
- Creates bcrypt-hashed passwords
- Idempotent (safe to call multiple times)

### Database

**`lib/mongodb.ts`**
- MongoDB connection with retry logic
- Lazy connection (connects only when needed)
- Automatically appends "chikash" to database name
- Error handling with helpful setup instructions

**`lib/models.ts`**
- User Schema: username, password, displayName, createdAt
- Message Schema: sender, content, image (Base64), createdAt

### Configuration

**`app/globals.css`**
- Tailwind CSS v4 configuration
- Romantic color palette:
  - Primary: Rose (#d946ef or similar)
  - Background: Soft cream/white
  - Accent: Pink/Rose shades
  - Neutral: Warm grays

**`tsconfig.json`**
- TypeScript configuration
- Path aliases for clean imports

**`package.json`**
- Dependencies:
  - `next`: ^15.0.0
  - `react`: ^19.0.0
  - `mongoose`: ^8.0.0 (MongoDB ODM)
  - `bcryptjs`: ^2.4.3 (Password hashing)
  - `cookie`: ^0.6.0 (Cookie handling)
  - `@hookform/resolvers`: Form validation
  - shadcn/ui components

---

## Setup Checklist

- [ ] Create MongoDB Atlas account (free)
- [ ] Create M0 cluster (takes 2-3 minutes)
- [ ] Get connection string
- [ ] Add IP whitelist (or "Allow from Anywhere")
- [ ] Copy connection string
- [ ] Click settings ⚙️ in Vercel
- [ ] Go to "Vars" tab
- [ ] Add MONGODB_URI variable
- [ ] Paste connection string
- [ ] Refresh chat app
- [ ] Click "Need to Setup Database?"
- [ ] Click "Initialize Database"
- [ ] Login with credentials:
  - Ashu: ashu123
  - Chiku: chiku123
- [ ] Start chatting!

---

## How to Use

### For Ashu:
1. Go to the deployed URL
2. Click "Need to Setup Database?" (first time only)
3. Follow steps to add MONGODB_URI
4. Click "Initialize Database"
5. Login with username: `ashu`, password: `ashu123`
6. Type message and send
7. Chiku clicks refresh to see your message

### For Chiku:
1. Get the URL from Ashu
2. Go to the same URL
3. Click "Need to Setup Database?" (if first time)
4. Login with username: `chiku`, password: `chiku123`
5. Click refresh to see messages from Ashu
6. Type reply and send
7. Ashu refreshes to see your message

### Features You Can Use:
- **Text messages**: Just type and send
- **Images/GIFs**: Click camera icon, select file, confirm preview, send
- **Links**: Share URLs directly in text
- **Emojis**: Include any emoji in text
- **Delete messages**: Only you can delete your own
- **See timestamp**: Every message shows when it was sent
- **Stay logged in**: Refresh the page without re-entering password
- **Logout**: Click logout button anytime

---

## Security Features

✅ **Password Security**
- Bcrypt hashing (industry standard)
- 10 salt rounds (very secure)
- Passwords never stored in plain text

✅ **Cookie Security**
- HTTP-only (can't be stolen by JavaScript)
- Secure (only over HTTPS)
- SameSite Strict (prevents CSRF)
- 7-day expiration

✅ **HTTPS**
- All traffic encrypted (Vercel provides HTTPS)
- Environment variables never exposed to client

✅ **Database**
- Connection string stored server-side only
- Never sent to browser
- Direct server-to-database connection

---

## Deployment to Vercel

1. **Code is in GitHub** - Already connected
2. **Auto-deploy** - Pushes automatically deploy
3. **Environment Variables** - MONGODB_URI in Vars
4. **DNS** - Get your Vercel URL
5. **Share with Chiku** - Send her the URL
6. **Login** - Both of you login with your credentials

---

## Customization Ideas

### Change Usernames
Edit `lib/models.ts` and `scripts/setup-users.js`

### Change Passwords
Edit the setup script with new passwords

### Change Theme Colors
Edit `app/globals.css` and update the color variables

### Change Database Name
Edit `lib/mongodb.ts` (currently "chikash")

### Add More Users
Call the register API or manually add to setup script

### Add Typing Indicators
Implement with a separate "typing" collection

### Add Message Reactions
Add emoji reactions to messages

### Add Voice Messages
Use Vercel Blob for audio storage

---

## Files You Might Need to Edit

**To change usernames:**
- `scripts/setup-users.js`
- `components/LoginPage.tsx` (placeholder text)

**To change passwords:**
- `scripts/setup-users.js`

**To change theme colors:**
- `app/globals.css` (color variables)
- `components/LoginPage.tsx` (if you want to update UI)
- `components/ChatPage.tsx` (if you want to update UI)

**To add more users:**
- Call `POST /api/auth/register` or modify setup script

**To change database name:**
- `lib/mongodb.ts` (line with "chikash")

---

## Troubleshooting

**Can't login?**
- Make sure you ran database initialization
- Check MONGODB_URI is in Vercel Vars
- Try initializing again

**Messages not appearing?**
- Click refresh button in chat
- Check MongoDB is connected (no error on page)

**Upload not working?**
- Check file size (should be < 5MB)
- Try different image format (PNG, JPG, GIF)

**See SETUP_INSTRUCTIONS.md for more help**

---

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/check | Check if logged in |
| POST | /api/auth/register | Create user |
| GET | /api/messages | Get all messages |
| POST | /api/messages | Send message |
| DELETE | /api/messages | Delete message |
| POST | /api/init | Initialize database |

---

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcryptjs + HTTP-only cookies
- **Media**: Base64 encoding (in database)
- **Deployment**: Vercel
- **Environment**: Node.js runtime

---

## Performance Notes

- **No real-time** = lower server cost
- **Base64 images** = keeps everything in one database
- **HTTP-only cookies** = secure session management
- **Lazy MongoDB connection** = faster initial load
- **Refresh-based** = simple, no WebSocket overhead

---

## Next Steps

1. Follow QUICK_START.txt for setup
2. Initialize database
3. Login and start chatting!
4. Share URL with Chiku
5. Enjoy your private chat space!

Made with ♡ for Ashu & Chiku
