# Ashu & Chiku - Private Chat Setup Guide

A beautiful, romantic private chat website for two close friends. Messages persist on refresh - no WebSocket needed!

## ✨ Features

- 🔐 **Secure Authentication** - Simple username/password with HTTP-only cookies for persistent login
- 💬 **Refresh-Based Chat** - No WebSockets, just reload to see new messages
- 📸 **Media Sharing** - Send images and GIFs encoded as Base64
- 💝 **Romantic UI** - Rose and pink theme designed for intimate conversations
- 📱 **Responsive Design** - Works beautifully on mobile and desktop
- 🔄 **Manual Refresh Button** - Quickly update messages without page reload

## 🚀 Quick Start

### 1. Set Up MongoDB

You need a MongoDB database. Here are your options:

**Option A: MongoDB Atlas (Recommended - Free)**
- Go to https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a new cluster
- Create a database user and get your connection string
- It will look like: `mongodb+srv://username:password@cluster.mongodb.net/ashu-chiku?retryWrites=true&w=majority`

**Option B: Local MongoDB**
- Install MongoDB locally
- Connection string: `mongodb://localhost:27017/ashu-chiku`

### 2. Set Environment Variables

Create a `.env.local` file in the project root:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/ashu-chiku?retryWrites=true&w=majority
```

Replace with your actual MongoDB connection string.

### 3. Initialize Users

Run the setup script to create the two user accounts:

```bash
npm run setup-users
```

This creates:
- **Ashu** - Username: `ashu`, Password: `ashu123`
- **Chiku** - Username: `chiku`, Password: `chiku123`

### 4. Start the Dev Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Add the `MONGODB_URI` environment variable in the Vercel dashboard
5. Deploy!

## 📖 How to Use

### For Ashu:
1. Enter username: `ashu`
2. Enter password: `ashu123`
3. Click "Enter Our Chat"
4. Stay logged in (the cookie persists!)

### For Chiku:
1. Open the same website in another browser/device
2. Enter username: `chiku`
3. Enter password: `chiku123`
4. Click "Enter Our Chat"

### Sending Messages:
1. Type your message in the input field
2. Click "Send" or press Enter
3. Share with your friend
4. They can refresh the page to see your message
5. Use the "Refresh" button to update the chat feed

### Sharing Media:
1. Click the camera icon (📸)
2. Select an image or GIF
3. The preview appears above the input
4. Click "X" to remove it
5. Click "Send" to share it

### Getting a New Link:
1. One of you can share the message link by taking a screenshot
2. Or copy-paste the URL from the browser
3. The other person just visits and logs in

## 🔒 Security

- Passwords are hashed with bcrypt
- Authentication uses secure HTTP-only cookies
- Cookies persist for 30 days
- No plaintext passwords stored
- MongoDB handles data safely

## 🛠️ Tech Stack

- **Next.js 16** - React framework for production
- **MongoDB + Mongoose** - Document database
- **Tailwind CSS** - Beautiful styling
- **bcryptjs** - Password hashing
- **shadcn/ui** - Component library

## ✏️ Customizing

### Change Passwords:
Edit `/scripts/setup-users.js` and change the default passwords before running the setup.

### Change Usernames:
Edit `/scripts/setup-users.js` to use different names than "ashu" and "chiku".

### Change Colors:
Edit `/app/globals.css` to modify the romantic rose/pink theme. The color tokens are defined at the top.

### Change Login Greeting:
Edit `/components/LoginPage.tsx` to customize the welcome message.

## 📱 Using on Different Devices

**Same Device (Different Browsers):**
- Open in Chrome and Firefox
- Ashu logs in to Chrome
- Chiku logs in to Firefox
- They can chat back and forth!

**Different Devices:**
- Deploy to Vercel
- Share the URL with your friend
- Both visit the same site
- Log in with your own credentials

## 🐛 Troubleshooting

**"MONGODB_URI is not set"**
- Add MONGODB_URI to your `.env.local` file
- Restart the dev server

**"Username already exists"**
- The users were already created
- Just log in with the existing credentials

**Messages not showing up**
- Click the "Refresh" button
- Or reload the page
- Check that you're logged in correctly

**Login keeps redirecting to login page**
- Make sure MONGODB_URI is set correctly
- Check MongoDB Atlas connection is allowed (IP whitelist)

## 💡 Pro Tips

1. **No Real-Time?** That's the feature! Refresh gives you privacy
2. **Share Links Easily** - Screenshot a message with a link and send via another app
3. **Mobile Friendly** - Works great on phones, perfect for cozy chats
4. **Persistent Login** - You won't need to re-enter password every time
5. **Save Images** - Download shared images before they're lost

---

Made with ♡ for two best friends!
