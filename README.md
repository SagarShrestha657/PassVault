# PassVault 🔐

A secure, modern password management application built with React, Node.js, and MongoDB. PassVault allows users to safely store, manage, and organize their login credentials in one centralized location.

## ✨ Features

### 🔒 Security Features
- **End-to-end encryption** for all stored passwords
- **JWT-based authentication** with secure token management
- **Password hashing** using bcrypt
- **Automatic session management** with periodic auth checks
- **CORS protection** with whitelisted origins

### 📱 User Experience
- **Modern, responsive UI** built with React and Tailwind CSS
- **Real-time password visibility toggle** for easy verification
- **One-click copy** functionality for usernames, passwords, and websites
- **Toast notifications** for user feedback
- **Loading indicators** with NProgress
- **Mobile-friendly design**

### 🗂️ Password Management
- **Add, edit, and delete** login credentials
- **Organize by website/app** with custom naming
- **Trash system** with 30-day auto-cleanup
- **Export functionality** for data backup

### 🔐 Account Security
- **Email verification** for new accounts
- **Password reset** functionality
- **Change password** feature
- **User activity tracking**
- **Secure logout** with token invalidation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Radix UI** - Accessible UI components

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email functionality
- **Crypto-js** - Encryption utilities

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Mongo Express** - Database administration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- MongoDB (or use Docker)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PassVault
   ```

2. **Set up environment variables**
   ```bash
   # Create backend environment file
   touch backend/.env
   # Edit backend/.env with your configuration
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001
   - MongoDB Express: http://localhost:8081

### Option 2: Local Development

1. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   cd ..
   ```

2. **Set up environment variables**
   ```bash
   # Create and configure backend/.env file
   touch backend/.env
   ```

3. **Start MongoDB** (if not using Docker)
   ```bash
   # Install and start MongoDB locally
   # Or use MongoDB Atlas cloud service
   ```

4. **Run the application**
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm start
   
   # Terminal 2: Start frontend
   npm run dev
   ```

## 📁 Project Structure

```
PassVault/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── store/             # Zustand state management
│   ├── lib/               # Utility libraries
│   └── assets/            # Static assets
├── backend/               # Node.js backend application
│   ├── Controller/        # Route controllers
│   ├── Models/            # MongoDB schemas
│   ├── Routes/            # API routes
│   ├── Middleware/        # Custom middleware
│   └── lib/               # Utility functions
├── public/                # Public assets
├── docker-compose.yml     # Docker orchestration
└── Dockerfile            # Frontend container
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/passvault
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:5173
```

### Database Configuration

The application uses MongoDB with the following collections:
- `users` - User accounts and authentication
- `logins` - Stored password entries (embedded in user documents)



## 🔒 Security Considerations

- All passwords are encrypted before storage
- JWT tokens have expiration times
- CORS is configured with specific allowed origins
- Input validation on all endpoints
- Automatic cleanup of expired trash items

## 🧪 Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
cd backend
npm start           # Start production server
npm run dev         # Start development server (if nodemon is configured)
```

### Code Style

The project uses ESLint for code linting and follows React best practices. Run `npm run lint` to check for code style issues.

## 🚀 Deployment

### Vercel Deployment

The project includes a `vercel.json` configuration for easy deployment to Vercel:

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build -d

# Or build individual containers
docker build -t passvault-frontend .
docker build -t passvault-backend ./backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Express.js](https://expressjs.com/) for the backend framework

---

**Made with ❤️ for secure password management**
