# 🔑 Environment Variables Setup

## Required Environment Variables

Add these to your `.env.local` file:

### 📦 Database Configuration
```
NEXT_MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
NEXT_MONGO_NAME=care
```

**How to get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a project and cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` and `<dbname>` with your actual values

---

### 🔐 NextAuth Configuration
```
NEXT_AUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here
```

**How to generate NEXTAUTH_SECRET:**
```bash
# Using openssl (on Mac/Linux)
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

### 🌐 Google OAuth (Optional)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**How to get Google OAuth credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Go to "Credentials" → "Create OAuth Client ID"
5. Select "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret

---

### 🐙 GitHub OAuth (Optional)
```
GITHUB_ID=your-github-app-id
GITHUB_SECRET=your-github-app-secret
```

**How to get GitHub OAuth credentials:**
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in application details:
   - Application name: Care.xyz
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and generate Client Secret

---

## 📝 Complete .env.local Template

```
# MongoDB
NEXT_MONGO_URI=
NEXT_MONGO_NAME=care

# NextAuth
NEXT_AUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth (optional)
GITHUB_ID=
GITHUB_SECRET=
```

---

## ✅ Verification

After setting up environment variables:

1. **Test MongoDB Connection:**
```bash
# The app will show MongoDB error if connection fails
npm run dev
```

2. **Test NextAuth:**
- Visit `http://localhost:3000/api/auth/signin`
- Try login with credentials provider

3. **Check Console:**
- Look for "MongoDB connected!" message
- No authentication errors should appear

---

## 🚨 Production Deployment

### For Vercel:
1. Go to Project Settings → Environment Variables
2. Add all the same variables
3. Ensure `NEXT_AUTH_URL` matches your production domain

### For other platforms:
- Set environment variables in your hosting platform's dashboard
- Always use production MongoDB cluster
- Use a strong, unique `NEXTAUTH_SECRET`
- Update OAuth callback URIs to production domain

---

## 🔒 Security Tips

⚠️ **NEVER commit `.env.local` to Git!**

✅ **DO:**
- Add `.env.local` to `.gitignore` (already done)
- Use strong secrets in production
- Rotate secrets periodically
- Keep credentials secure and private

❌ **DON'T:**
- Share environment variables in public repositories
- Commit `.env.local` files
- Use test credentials in production
- Commit actual secret values

---

## 📞 Need Help?

If you encounter any errors:

1. **Check that all required variables are set**
2. **Verify credentials are correct**
3. **Look at console error messages**
4. **Visit documentation links provided above**

---

**You're all set! Ready to code! 🚀**
