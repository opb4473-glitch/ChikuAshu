# API Reference - Ashu & Chiku Chat

## Available API Endpoints

All endpoints are in `/app/api/` directory.

---

## Authentication

### POST `/api/auth/login`
Login with username and password. Sets secure HTTP-only cookie.

**Request:**
```json
{
  "username": "ashu",
  "password": "ashu123"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login successful",
  "username": "ashu"
}
```

**Response (Error - 401):**
```json
{
  "error": "Invalid credentials"
}
```

**Cookie Set:**
- `auth_token`: Secure HTTP-only cookie with session token
- Expires: 7 days

---

### POST `/api/auth/logout`
Clears the authentication cookie and logs out the user.

**Response (Success - 200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### GET `/api/auth/check`
Check if user is currently authenticated.

**Response (Success - 200):**
```json
{
  "authenticated": true,
  "username": "ashu"
}
```

**Response (Not Authenticated - 401):**
```json
{
  "error": "Not authenticated"
}
```

---

### POST `/api/auth/register`
Register a new user (internal use, not called from UI).

**Request:**
```json
{
  "username": "newuser",
  "password": "password123",
  "displayName": "New User"
}
```

**Response (Success - 201):**
```json
{
  "message": "User created",
  "username": "newuser"
}
```

---

## Messages

### GET `/api/messages`
Retrieve all messages in chronological order.

**Query Parameters:** None (gets all messages)

**Response (Success - 200):**
```json
{
  "messages": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "sender": "ashu",
      "content": "Hey Chiku!",
      "image": null,
      "createdAt": "2024-03-15T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "sender": "chiku",
      "content": "Hi Ashu!",
      "image": null,
      "createdAt": "2024-03-15T10:31:00Z"
    }
  ]
}
```

**Response (Error - 401):**
```json
{
  "error": "Not authenticated"
}
```

---

### POST `/api/messages`
Send a new message (text, image, or both).

**Request:**
```json
{
  "content": "Check out this image!",
  "image": "data:image/png;base64,iVBORw0KGgo..." // optional
}
```

**Response (Success - 201):**
```json
{
  "message": "Message sent",
  "id": "507f1f77bcf86cd799439013",
  "sender": "ashu",
  "content": "Check out this image!",
  "createdAt": "2024-03-15T10:32:00Z"
}
```

**Response (Error - 400):**
```json
{
  "error": "Message content required"
}
```

**Response (Error - 401):**
```json
{
  "error": "Not authenticated"
}
```

---

### DELETE `/api/messages`
Delete a message (only sender can delete their own).

**Request:**
```json
{
  "messageId": "507f1f77bcf86cd799439013"
}
```

**Response (Success - 200):**
```json
{
  "message": "Message deleted"
}
```

**Response (Error - 403):**
```json
{
  "error": "Can only delete your own messages"
}
```

---

## Initialization

### POST `/api/init`
Initialize the database with default Ashu and Chiku users.
(Automatically skips if users already exist)

**Request:** (no body needed)

**Response (Success - 200):**
```json
{
  "status": "success",
  "message": "Users initialized successfully!",
  "credentials": {
    "ashu": "ashu123",
    "chiku": "chiku123"
  }
}
```

**Response (Already Initialized - 200):**
```json
{
  "status": "already_initialized",
  "message": "Users already exist. Please login."
}
```

---

## Database Models

### User Schema
```typescript
{
  username: string (unique, lowercase, required),
  password: string (bcrypt hashed, required),
  displayName: string (required),
  createdAt: Date (default: now)
}
```

### Message Schema
```typescript
{
  sender: string (username of sender),
  content: string (message text),
  image: string (optional, Base64 encoded),
  createdAt: Date (default: now)
}
```

---

## Authentication Flow

```
LOGIN PAGE
    ↓
User enters username/password
    ↓
POST /api/auth/login
    ↓
Validate credentials
    ↓
Create HTTP-only cookie
    ↓
CHAT PAGE
    ↓
GET /api/auth/check (validates cookie)
    ↓
GET /api/messages (loads all messages)
    ↓
POST /api/messages (send new message)
    ↓
Repeat: Refresh to load new messages
    ↓
POST /api/auth/logout (clear cookie)
    ↓
LOGIN PAGE
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Not logged in |
| 403 | Forbidden - Not allowed |
| 500 | Server Error - Database issue |

---

## Cookie Security

The `auth_token` cookie is:
- **HTTP-only**: Cannot be accessed by JavaScript
- **Secure**: Only sent over HTTPS
- **SameSite**: Strict (prevents CSRF attacks)
- **Expires**: 7 days from login

---

## Rate Limiting

Currently no rate limiting. In production, consider adding:
- Message limit per user per minute
- Login attempt limits
- Image upload size limits

---

## File Upload (Images/GIFs)

Images and GIFs are:
1. Converted to Base64 in the browser
2. Sent as JSON in the `image` field
3. Stored as Base64 string in MongoDB
4. Decoded and displayed on message fetch

**File size limit**: ~5MB (MongoDB document limit)

**Supported formats**: PNG, JPG, GIF, WebP, etc.

---

## Testing Endpoints

Use these curl commands to test (replace with your domain):

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ashu","password":"ashu123"}'

# Get messages
curl -X GET http://localhost:3000/api/messages

# Send message
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello world!"}'

# Check auth
curl -X GET http://localhost:3000/api/auth/check
```

---

## Future Enhancements

- Add read receipts (seen/unseen messages)
- Typing indicators
- Message reactions/emojis
- Voice notes
- Video calls (integrate Twilio/Agora)
- Message search
- Export chat history
