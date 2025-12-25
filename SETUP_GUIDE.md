# Care.xyz Project Setup Guide

## 🎉 Project Structure Created Successfully!

Your **Care.xyz** Next.js project has been scaffolded based on the completed **Car Cleanify** project template. Here's what has been set up:

---

## 📁 Project Structure

```
care/
├── src/
│   ├── app/
│   │   ├── (withCommonLayout)/        # Public pages with Navbar & Footer
│   │   │   ├── page.jsx               # Homepage
│   │   │   ├── login/                 # Login page
│   │   │   ├── signup/                # Signup page
│   │   │   ├── aboutUs/               # About Us page
│   │   │   ├── reviews/               # Reviews listing & creation
│   │   │   ├── services/              # Services listing
│   │   │   ├── adminRoute/            # Protected admin route
│   │   │   ├── userRoute/             # Protected user route
│   │   │   └── layout.jsx             # Common layout wrapper
│   │   ├── (withDashboardLayout)/     # Dashboard pages with sidebar
│   │   │   ├── dashboard/             # Main dashboard
│   │   │   │   ├── page.jsx
│   │   │   │   └── my-bookings/       # My bookings page
│   │   │   └── layout.jsx             # Dashboard layout wrapper
│   │   ├── api/                       # API routes
│   │   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   │   ├── users/                 # User registration endpoint
│   │   │   ├── reviews/               # Review CRUD operations
│   │   │   └── route.js               # Health check endpoint
│   │   ├── loading.jsx                # Global loading state
│   │   ├── not-found.jsx              # 404 page
│   │   ├── layout.jsx                 # Root layout
│   │   └── globals.css                # Global styles with Tailwind
│   ├── components/
│   │   └── shared/
│   │       ├── Navbar.jsx             # Navigation bar with auth
│   │       ├── Footer.jsx             # Footer component
│   │       ├── Container.jsx          # Max-width container
│   │       └── DashboardSidebar.jsx   # Dashboard sidebar
│   ├── context/
│   │   ├── user.context.jsx           # User context for auth
│   │   └── booking.context.jsx        # Bookings state management
│   ├── lib/
│   │   ├── dbConnect.js               # MongoDB connection
│   │   └── providers/
│   │       └── index.js               # React providers wrapper
│   ├── services/
│   │   ├── users.service.js           # User API calls (signup)
│   │   ├── reviews.service.js         # Review API calls
│   │   └── services.service.js        # Services API calls
│   └── proxy.js                       # Middleware for route protection
├── public/                            # Static assets
├── .env.example                       # Environment variables template
├── package.json                       # Dependencies
├── next.config.mjs                    # Next.js configuration
├── postcss.config.mjs                 # Tailwind CSS configuration
├── jsconfig.json                      # JS path aliases
├── eslint.config.mjs                  # ESLint configuration
└── .gitignore                         # Git ignore rules
```

---

## 🔧 Installation & Setup

### 1. Install Dependencies
```bash
cd care
npm install
```

### 2. Setup Environment Variables
Create a `.env.local` file in the root directory:

```
# MongoDB Configuration
NEXT_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
NEXT_MONGO_NAME=care_database

# NextAuth Configuration
NEXT_AUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (Optional)
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (MongoDB)

### Collections Required:
1. **users** - User accounts with authentication
2. **reviews** - Customer reviews
3. **services** - Service listings (optional, based on your API)

### MongoDB Schema Examples:

**Users Collection:**
```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "phone": "+1234567890",
  "image": "profile_url",
  "role": "user",
  "createdAt": Date
}
```

**Reviews Collection:**
```json
{
  "_id": ObjectId,
  "name": "Jane Smith",
  "rating": 5,
  "comment": "Excellent service!",
  "createdAt": Date
}
```

---

## 🔐 Authentication Setup

The project uses **NextAuth.js** with multiple providers:

### Configured Providers:
1. **Credentials** - Email/Password login
2. **Google OAuth** - Google sign-in
3. **GitHub OAuth** - GitHub sign-in

### Test Credentials (for local testing):
- Email: `user@example.com`
- Password: `1234`

---

## 📋 Key Features Implemented

### ✅ Completed
- [x] User authentication system with NextAuth.js
- [x] Database connection with MongoDB
- [x] User registration & login pages
- [x] Reviews system (CRUD operations)
- [x] Protected routes for admin & user
- [x] Dashboard with sidebar
- [x] Responsive design with Tailwind CSS
- [x] Loading states & error pages
- [x] API routes for authentication & data management

### ⚠️ Requires Configuration
- [ ] MongoDB connection URI (in `.env.local`)
- [ ] NextAuth secret key
- [ ] Google OAuth credentials
- [ ] GitHub OAuth credentials
- [ ] Services API endpoint integration

---

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start           # Start production server

# Linting
npm run lint        # Run ESLint
```

---

## 🚀 Key Endpoints (API Routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | Health check |
| POST | `/api/users` | User registration |
| GET/POST | `/api/reviews` | Get/Create reviews |
| GET/PATCH/DELETE | `/api/reviews/[id]` | Get/Update/Delete specific review |
| GET/POST | `/api/auth/[...nextauth]` | Authentication endpoints |

---

## 🔒 Protected Routes

Routes requiring authentication:
- `/adminRoute` - Admin-only access
- `/userRoute` - User-only access
- `/dashboard/*` - User dashboard

---

## 📚 Project Files Reference

### Main Components
- **Navbar**: [src/components/shared/Navbar.jsx](./src/components/shared/Navbar.jsx)
- **Container**: [src/components/shared/Container.jsx](./src/components/shared/Container.jsx)
- **DashboardSidebar**: [src/components/shared/DashboardSidebar.jsx](./src/components/shared/DashboardSidebar.jsx)

### API Routes
- **Auth**: [src/app/api/auth/[...nextauth]/route.js](./src/app/api/auth/[...nextauth]/route.js)
- **Users**: [src/app/api/users/route.js](./src/app/api/users/route.js)
- **Reviews**: [src/app/api/reviews/route.js](./src/app/api/reviews/route.js)

### Services
- **Users Service**: [src/services/users.service.js](./src/services/users.service.js)
- **Reviews Service**: [src/services/reviews.service.js](./src/services/reviews.service.js)

---

## 🎨 Styling

The project uses **Tailwind CSS v4** for styling with:
- Pre-configured utility classes
- Custom `.primary-button` class
- Responsive breakpoints
- Dark mode support ready

---

## 🤝 Next Steps

1. **Add MongoDB URI** to `.env.local`
2. **Set NEXTAUTH_SECRET** to a secure value
3. **Configure OAuth** providers (optional)
4. **Customize** homepage and services content
5. **Test** authentication flows
6. **Deploy** to Vercel or preferred hosting

---

## 📌 Important Notes

⚠️ **Before going to production:**
- [ ] Remove test credentials
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Configure MongoDB encryption at rest
- [ ] Enable HTTPS
- [ ] Set up environment variables properly
- [ ] Test all authentication flows
- [ ] Configure CORS if needed

---

## 🐛 Troubleshooting

### Common Issues:

**MongoDB Connection Error**
- Ensure MongoDB URI is correct in `.env.local`
- Check network access in MongoDB Atlas
- Verify database name matches

**NextAuth Errors**
- Ensure `NEXTAUTH_SECRET` is set
- Check callback URLs in OAuth providers
- Verify session configuration

**Port Already in Use**
```bash
# Use different port
npm run dev -- -p 3001
```

---

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org)
- [MongoDB Official Docs](https://docs.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 📧 Support

For issues or questions, refer to the documentation or check your console for detailed error messages.

**Happy Coding! 🚀**
