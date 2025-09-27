# MERN-CHAT - Real-Time Chat Application 🚀

A modern, full-stack real-time chat application built with the MERN stack and Socket.IO. MERN-CHAT enables instant messaging, secure user authentication, profile management, and provides a seamless communication experience across all devices.

## 🌐 Live Demo

**🚀 [MERN-CHAT Live Application](https://mern-chat-5dg4.onrender.com)**

*Experience real-time messaging with secure authentication and modern UI*

## ✨ Core Features

- 💬 **Real-Time Messaging** - Instant one-to-one chat powered by Socket.IO
- 🔐 **JWT Authentication** - Secure signup, login, and session management
- 👤 **Profile Management** - Update profile pictures with Cloudinary integration
- 📱 **Responsive Design** - Seamless experience on mobile and desktop
- 🎨 **Dynamic Themes** - Light and dark modes with gradient-based themes
- ⚡ **Live User Status** - See who's online in real-time
- 🔒 **Secure Communication** - Password hashing and encrypted sessions

## 🛠️ Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React.js** - Component-based UI library
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS** - Utility-first CSS framework
- ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) **DaisyUI** - Semantic component classes for Tailwind
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) **React Router** - Client-side routing
- ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) **Socket.io Client** - Real-time communication
- 🐻 **Zustand** - Lightweight state management

### Backend
- ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) **Node.js & Express.js** - Server framework
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB & Mongoose** - Database and ODM
- ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) **Socket.io** - Real-time WebSocket server
- ![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink) **JWT** - Token-based authentication
- 🔐 **Bcryptjs** - Password hashing and security
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white) **Cloudinary** - Profile image management

### Deployment
- ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white) **Render** - Cloud hosting
- ![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB Atlas** - Database hosting

### Development Tools
- ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) **Git** - Version control
- ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) **GitHub** - Code repository
- ![VS Code](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white) **VS Code** - Code editor
- ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) **Postman** - API testing

## 📁 Project Structure

```
MERN-CHAT/
├── 📂 backend/
│   ├── 📂 controllers/          # Business logic
│   │   ├── auth.controller.js
│   │   └── message.controller.js
│   ├── 📂 db/
│   │   └── connectDB.js         # Database connection
│   ├── 📂 middleware/
│   │   └── auth.middleware.js   # JWT authentication
│   ├── 📂 models/               # Database schemas
│   │   ├── message.model.js
│   │   └── user.model.js
│   ├── 📂 routes/               # API endpoints
│   │   ├── auth.routes.js
│   │   └── message.routes.js
│   ├── 📂 seeds/
│   │   └── seedUsers.js         # Test data seeding
│   ├── 📂 socket/
│   │   └── socket.js            # Socket.IO configuration
│   ├── 📂 utils/
│   │   └── cloudinary.js        # Image upload utility
│   ├── constants.js             # DB name file
│   └── server.js                # Main server file
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/       # Reusable components
│   │   │   ├── AuthImagePattern.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── 📂 pages/           # Main pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── 📂 store/           # State management
│   │   │   ├── useAuthStore.js
│   │   │   ├── useChatStore.js
│   │   │   └── useThemeStore.js
│   │   ├── 📂 utils/           # Utilities
│   │   │   └── utils.js
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # App entry point
│   └── vite.config.js
├──  package.json
├──  LICENSE
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account

### 1. Clone Repository
```bash
git clone https://github.com/MrDivyanshAgrawal/MERN-CHAT.git
cd MERN-CHAT
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-chat

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
# API Configuration
VITE_API_URL=http://localhost:5001/api
```

### 4. Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🌐 Production Environment Variables

### Backend (.env)
```env
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-chat
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```env
VITE_API_URL=https://mern-chat-5dg4.onrender.com/api
```

## 🎯 Key API Endpoints

### Authentication
```
POST   /api/auth/signup          # User registration
POST   /api/auth/login           # User login
POST   /api/auth/logout          # User logout
PUT    /api/auth/update-profile  # Update user profile
GET    /api/auth/check           # Check authentication status
```

### Messages
```
GET    /api/messages/users       # Get all chat users
GET    /api/messages/:id         # Get messages with specific user
POST   /api/messages/send/:id    # Send message to user
```

### Users
```
GET    /api/users                # Get all users (for sidebar)
```

## 🧪 Testing

### Manual Testing
1. Create multiple user accounts
2. Login with different users in different browser tabs
3. Test real-time messaging between users
4. Test profile picture upload functionality
5. Test theme switching

### API Testing
```bash
# Test server health
curl http://localhost:5001/api/auth/check

# Test user registration
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123"}'
```

## 📦 Build & Deploy

### Build Commands
```bash
# Frontend build
npm run build

# Production start
npm run start
```

### Deployment Scripts
```json
{
  "scripts": {
    "build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend",
    "start": "npm run start --prefix backend",
    "dev": "npm run dev --prefix backend"
  }
}
```

## 🔒 Security Features

- **JWT Authentication** with secure token management
- **Password Hashing** using bcrypt with salt rounds
- **Input Validation** and sanitization
- **CORS Protection** for cross-origin requests
- **Environment Variable Protection**
- **Secure Cookie Handling**

## 📊 Project Metrics

- **15+ API Endpoints**
- **20+ React Components**
- **3 Database Models**
- **Real-time Socket Events**
- **10,000+ Lines of Code**

## 🎨 UI/UX Features

- **Modern Design** with gradient themes
- **Responsive Layout** for all screen sizes
- **Dark/Light Mode** toggle
- **Toast Notifications** for user feedback
- **Loading States** and smooth animations
- **Emoji Support** in messages
- **Online Status Indicators**

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open Pull Request

## 👨‍💻 Developer

**Divyansh Agrawal**
- GitHub: [@MrDivyanshAgrawal](https://github.com/MrDivyanshAgrawal)
- LinkedIn: [Divyansh Agrawal](https://www.linkedin.com/in/divyansh-agrawal-673420257/)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**⭐ Star this repository if you found it helpful!**

**🚀 [Live Demo](https://mern-chat-5dg4.onrender.com) | 📚 [Documentation](#) | 🐛 [Report Bug](https://github.com/MrDivyanshAgrawal/MERN-CHAT/issues)**

*Built with ❤️ using the MERN Stack*

---
