# GrapesJS Builder Backend API

A REST API backend for the GrapesJS Website Builder, built with Node.js, Express, and MongoDB.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB ODM |
| CORS | Cross-origin requests |
| Dotenv | Environment variables |

---

## 📁 Project Structure
```
learn_grapesjs_backend/
├── src/
│   ├── models/
│   │   └── Page.js          ← MongoDB page schema
│   ├── routes/
│   │   └── pageRoutes.js    ← API route handlers
│   └── index.js             ← Entry point
├── .env                     ← Environment variables
├── .gitignore               ← Git ignore file
├── package.json             ← Dependencies
└── README.md                ← This file
```

---

## ⚙️ Environment Variables

Create a `.env` file in root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/grapesjs-builder
```

| Variable | Description |
|---|---|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB Atlas connection string |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/learn_grapesjs_backend.git

# Navigate to project folder
cd learn_grapesjs_backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI

# Start development server
npm run dev
```

---

## 📡 API Endpoints

### Pages

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/pages` | Get all pages |
| GET | `/api/pages/:id` | Get single page |
| POST | `/api/pages` | Create new page |
| PUT | `/api/pages/:id` | Update page |
| DELETE | `/api/pages/:id` | Delete page |

---

### Request & Response Examples

#### Create Page
```http
POST /api/pages
Content-Type: application/json

{
  "name": "My Landing Page",
  "projectData": {
    "pages": [...],
    "styles": [...],
    "assets": []
  }
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "_id": "64abc123...",
    "name": "My Landing Page",
    "projectData": {...},
    "slug": "my-landing-page",
    "published": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get All Pages
```http
GET /api/pages
```

#### Response
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64abc123...",
      "name": "My Landing Page",
      "published": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Update Page
```http
PUT /api/pages/:id
Content-Type: application/json

{
  "name": "Updated Page Name",
  "projectData": {...}
}
```

#### Delete Page
```http
DELETE /api/pages/:id
```

---

## 📦 Data Models

### Page Schema
```javascript
{
  name: String,          // Page title
  projectData: Object,   // GrapesJS JSON data
  slug: String,          // URL-friendly name (unique)
  published: Boolean,    // Publication status
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

---

## 🔒 Environment Setup

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free M0 cluster
3. Create database user with password
4. Allow network access from anywhere (development)
5. Get connection string and add to `.env`

---

## 📝 Scripts
```bash
# Start production server
npm start

# Start development server with auto-reload
npm run dev
```

---

## 🔗 Related Projects

- [GrapesJS Frontend](https://github.com/Jakaria030/learn_grapesjs)

---