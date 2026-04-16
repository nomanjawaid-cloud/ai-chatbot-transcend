# 🤖 AI Chatbot Application

A professional, production-ready chatbot application with real authentication, built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## ✨ Features

- 🔐 **Real Authentication** - JWT token-based authentication with your backend API
- 💬 **Interactive Chat** - Beautiful chat interface with typing indicators
- 🎨 **Professional UI** - Modern design with gradients and smooth animations
- 🌙 **Dark Mode** - Full dark mode support
- 📱 **Responsive** - Works perfectly on mobile, tablet, and desktop
- 🔒 **Session Persistence** - Stay logged in across page refreshes
- ⚡ **Fast** - Built with Next.js 16 and Turbopack
- 📝 **TypeScript** - Fully typed for better development experience

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_API_BASE_URL=http://your-api-url.com
```

Or copy from the example:

```bash
cp .env.local.example .env.local
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### 4. Sign In

Use your real credentials from your backend:
- Email: Your verified user email
- Password: Your user password

## 📁 Project Structure

```
my-app/
├── src/
│   ├── components/          # UI components
│   │   ├── SignIn.tsx      # Authentication page
│   │   ├── ChatBot.tsx     # Chat interface
│   │   ├── Header.tsx      # App header
│   │   └── Icons.tsx       # SVG icons
│   └── lib/
│       └── api.ts          # API functions
├── app/
│   ├── page.tsx            # Main page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── public/                 # Static assets
└── .env.local             # Environment variables
```

## 🔐 Authentication API

The application integrates with your backend authentication endpoint:

**Endpoint**: `POST /auth/loginUser`

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200)**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "status": "Verified",
    "createdAt": "2024-12-23T10:00:00.000Z",
    "updatedAt": "2024-12-23T10:00:00.000Z"
  }
}
```

**Error Responses**:
- **401**: Invalid credentials
- **403**: Please verify your email before logging in

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 3 steps
- **[API_INTEGRATION.md](API_INTEGRATION.md)** - Complete API integration guide
- **[API_INTEGRATION_SUMMARY.md](API_INTEGRATION_SUMMARY.md)** - Quick API summary
- **[AUTHENTICATION_FLOW.md](AUTHENTICATION_FLOW.md)** - Visual flow diagrams
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[FEATURES.md](FEATURES.md)** - Complete feature list
- **[UI_GUIDE.md](UI_GUIDE.md)** - Visual design guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Full project overview

## 🛠️ Available Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Run production build
npm run lint   # Check code quality
```

## 🎨 Tech Stack

- **Next.js 16.2.4** - React framework with App Router
- **React 19.2.4** - Latest React version
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Turbopack** - Fast bundler

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Production
# NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

## 🧪 Testing

### Test Authentication

1. **Valid Credentials**: Use a verified account from your backend
2. **Invalid Credentials**: Try wrong email/password → See error message
3. **Unverified Email**: Use unverified account → See verification message

### Test Session Persistence

1. Log in successfully
2. Refresh the page
3. Should remain logged in

### Test Logout

1. Click logout button
2. Should return to sign-in page
3. Tokens should be cleared

## 🐛 Troubleshooting

### CORS Errors

Configure CORS on your backend:

```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Network Errors

1. Check API URL in `.env.local`
2. Ensure backend server is running
3. Verify API endpoint path

### Token Not Persisting

1. Check localStorage in browser DevTools
2. Ensure browser allows localStorage
3. Check for localStorage quota issues

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Set `NEXT_PUBLIC_API_BASE_URL` in your deployment platform.

## 📊 Project Stats

- **Components**: 4 main components
- **API Functions**: 8 functions
- **Documentation**: 10+ guides
- **Lines of Code**: 1,000+ lines
- **Build Time**: ~7-10 seconds
- **TypeScript**: 100% typed

## 🎯 Key Features

### Authentication
- ✅ Real API integration
- ✅ JWT token management
- ✅ Session persistence
- ✅ Error handling
- ✅ Loading states

### Chat Interface
- ✅ Real-time messaging
- ✅ Typing indicator
- ✅ Auto-scroll
- ✅ Timestamps
- ✅ Smart bot responses

### User Experience
- ✅ Professional UI
- ✅ Dark mode
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Accessible

## 🔒 Security

- JWT token authentication
- Secure token storage
- HTTPS recommended for production
- Input validation
- Error handling

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please read the documentation before contributing.

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review the API integration guide
3. Check Next.js documentation

## 🎉 Acknowledgments

Built with:
- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

**Made with ❤️ using Next.js and React**
