# 📡 API Reference Guide

Complete documentation for the portfolio backend API.

---

## Base URL

```
Development:  http://localhost:3000/api
Production:   https://yourdomain.com/api
```

---

## Authentication

Currently, no authentication is required. All endpoints are public read/list.

**Note:** For production, consider adding authentication for POST endpoints if you want admin-only access to create/modify projects.

---

## Projects Endpoints

### List All Projects

```http
GET /api/projects
```

**Parameters:**
- `category` (optional) - Filter by category: `dev`, `vfx`, `cybersec`, `other`

**Example Requests:**

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Get only dev projects
curl "http://localhost:3000/api/projects?category=dev"

# Get only VFX projects
curl "http://localhost:3000/api/projects?category=vfx"
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Arch Linux Dotfiles",
      "description": "Fully configured Arch Linux environment...",
      "category": "dev",
      "tags": ["Linux", "Arch", "Shell"],
      "imageUrl": null,
      "liveUrl": null,
      "repoUrl": "https://github.com/...",
      "featured": true,
      "createdAt": "2024-05-10T12:34:56.789Z",
      "updatedAt": "2024-05-10T12:34:56.789Z"
    },
    // ... more projects
  ]
}
```

---

### Get Single Project

```http
GET /api/projects/:id
```

**Parameters:**
- `id` (required) - MongoDB ObjectId of project

**Example Request:**

```bash
curl http://localhost:3000/api/projects/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Arch Linux Dotfiles",
    "description": "Fully configured Arch Linux environment...",
    "category": "dev",
    "tags": ["Linux", "Arch", "Shell"],
    "imageUrl": null,
    "liveUrl": null,
    "repoUrl": "https://github.com/...",
    "featured": true,
    "createdAt": "2024-05-10T12:34:56.789Z",
    "updatedAt": "2024-05-10T12:34:56.789Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Project not found"
}
```

---

### Create Project

```http
POST /api/projects
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "My New Project",
  "description": "Project description...",
  "category": "dev",
  "tags": ["Tag1", "Tag2"],
  "imageUrl": "https://example.com/image.jpg",
  "liveUrl": "https://project.example.com",
  "repoUrl": "https://github.com/username/project",
  "featured": false
}
```

**Validation Rules:**
- `title` (required) - String, max 120 chars
- `description` (required) - String, max 500 chars
- `category` (required) - One of: `dev`, `vfx`, `cybersec`, `other`
- `tags` (optional) - Array of strings
- `imageUrl` (optional) - Valid URL or null
- `liveUrl` (optional) - Valid URL or null
- `repoUrl` (optional) - Valid URL or null
- `featured` (optional) - Boolean, default false

**Example Request (cURL):**

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Portfolio Website",
    "description": "Full-stack personal portfolio with dark purple theme",
    "category": "dev",
    "tags": ["JavaScript", "Node.js", "MongoDB", "CSS"],
    "repoUrl": "https://github.com/username/portfolio",
    "featured": true
  }'
```

**Example Request (JavaScript/Fetch):**

```javascript
const newProject = {
  title: "Portfolio Website",
  description: "Full-stack personal portfolio with dark purple theme",
  category: "dev",
  tags: ["JavaScript", "Node.js", "MongoDB"],
  repoUrl: "https://github.com/username/portfolio",
  featured: true
};

fetch('http://localhost:3000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newProject)
})
  .then(res => res.json())
  .then(data => console.log(data));
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Portfolio Website",
    "description": "Full-stack personal portfolio with dark purple theme",
    "category": "dev",
    "tags": ["JavaScript", "Node.js", "MongoDB"],
    "imageUrl": null,
    "liveUrl": null,
    "repoUrl": "https://github.com/username/portfolio",
    "featured": true,
    "createdAt": "2024-05-10T12:34:56.789Z",
    "updatedAt": "2024-05-10T12:34:56.789Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    "Title is required",
    "Description is required",
    "Invalid category"
  ]
}
```

---

## Messages Endpoints

### Submit Contact Message

```http
POST /api/messages
Content-Type: application/json
```

**Rate Limit:** 5 messages per 1 hour per IP address

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "body": "I'm interested in collaborating on a project..."
}
```

**Validation Rules:**
- `name` (required) - String, 1-100 chars, trimmed
- `email` (required) - Valid email format
- `subject` (optional) - String, max 200 chars
- `body` (required) - String, 1-3000 chars, trimmed

**Example Request (cURL):**

```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "VFX Collaboration",
    "body": "Hi! I loved your portfolio and would like to discuss collaboration opportunities on upcoming projects."
  }'
```

**Example Request (JavaScript/Fetch):**

```javascript
const contactData = {
  name: "Jane Smith",
  email: "jane@example.com",
  subject: "VFX Collaboration",
  body: "Hi! I loved your portfolio..."
};

fetch('http://localhost:3000/api/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(contactData)
})
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('Message sent!', data.data);
    } else {
      console.error('Error:', data.error);
    }
  });
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "createdAt": "2024-05-10T12:34:56.789Z"
  }
}
```

**Error Response (400 Bad Request - Validation):**
```json
{
  "success": false,
  "errors": [
    "Name is required",
    "A valid email is required",
    "Message body is required"
  ]
}
```

**Error Response (429 Too Many Requests - Rate Limited):**
```json
{
  "success": false,
  "error": "Too many messages sent, please try again later"
}
```

---

## Health Check Endpoint

### Check API Status

```http
GET /api/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2024-05-10T12:34:56.789Z"
}
```

---

## Error Responses

### Common Error Codes

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Bad Request | Invalid input or validation failed |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Unexpected server error |

### Error Response Format

```json
{
  "success": false,
  "error": "Error description",
  "errors": ["Error 1", "Error 2"]  // Only for validation errors
}
```

---

## Rate Limiting

### Limits per IP Address

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/projects` | 100 requests | 15 minutes |
| `/api/messages` | 5 requests | 1 hour |
| `/api/health` | No limit | — |

**Rate Limit Headers:**

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 85
X-RateLimit-Reset: 1620656096
```

**Rate Limit Exceeded:**
```
HTTP/1.1 429 Too Many Requests

{
  "success": false,
  "error": "Too many requests, please try again later"
}
```

---

## CORS Policy

**Allowed Origins:**
- Development: `http://localhost:3000`
- Production: `https://yourdomain.com` (configure in `.env`)

**Allowed Methods:**
- GET
- POST

**Allowed Headers:**
- Content-Type

**Response Headers:**
```http
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET,POST
Access-Control-Allow-Headers: Content-Type
```

---

## Testing the API

### Using cURL

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Get projects by category
curl "http://localhost:3000/api/projects?category=dev"

# Get single project
curl http://localhost:3000/api/projects/PROJECT_ID

# Create project
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test","category":"dev"}'

# Send message
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","body":"Test"}'
```

### Using Postman

1. **Import Collection:** Use the example requests below
2. **Set Variables:** `{{base_url}}` = `http://localhost:3000/api`
3. **Test Endpoints:** Run requests

### Using JavaScript Fetch

```javascript
// Get projects
fetch('http://localhost:3000/api/projects')
  .then(res => res.json())
  .then(data => console.log(data));

// Post project
fetch('http://localhost:3000/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Project',
    description: 'Description',
    category: 'dev'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Using Thunder Client (VS Code)

Install "Thunder Client" extension:
1. Open Thunder Client
2. Create new request
3. Set method and URL
4. Add body/headers as needed
5. Send request

---

## Response Examples

### Success Response Structure

```json
{
  "success": true,
  "count": 6,
  "data": [ /* ... */ ]
}
```

### Error Response Structure

```json
{
  "success": false,
  "error": "Descriptive error message",
  "errors": ["Error 1", "Error 2"]  // Optional: for validation
}
```

---

## Database Field Reference

### Project Schema

```javascript
{
  _id: ObjectId,
  title: String,              // 1-120 chars
  description: String,        // 1-500 chars
  category: String,           // 'dev' | 'vfx' | 'cybersec' | 'other'
  tags: [String],            // Array of tags
  imageUrl: String|null,     // Optional URL
  liveUrl: String|null,      // Optional URL
  repoUrl: String|null,      // Optional URL
  featured: Boolean,         // Default: false
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

### Message Schema

```javascript
{
  _id: ObjectId,
  name: String,              // 1-100 chars
  email: String,             // Valid email format
  subject: String,           // 0-200 chars
  body: String,              // 1-3000 chars
  read: Boolean,             // Default: false
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **CORS error** | Verify `CORS_ORIGIN` in backend `.env` matches frontend URL |
| **401 Unauthorized** | Check CORS headers and origin |
| **429 Rate Limited** | Wait for rate limit window to reset |
| **Empty projects list** | Ensure database is seeded: `npm run seed` |
| **Connection refused** | Verify backend is running: `npm run dev` |

---

## Development Tips

1. **Test locally first** before deploying to production
2. **Use Postman** for testing complex requests
3. **Check browser console** for frontend errors
4. **Check terminal logs** for backend errors
5. **Monitor rate limits** if building custom clients

---

## Production Checklist

Before deploying to production:

- [ ] Update `CORS_ORIGIN` to your domain
- [ ] Set `NODE_ENV=production`
- [ ] Verify MongoDB connection
- [ ] Test all endpoints
- [ ] Set up monitoring/logging
- [ ] Consider adding authentication for POST endpoints
- [ ] Set up backups for MongoDB
- [ ] Monitor rate limits and adjust if needed

---

**Happy API Testing! 🚀**
