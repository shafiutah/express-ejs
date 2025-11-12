# Express EJS - User Authentication & Management System

A full-stack web application built with **Express.js**, **EJS**, and **PostgreSQL**. This project demonstrates a complete authentication system with user management, form validation, and session-based flash messaging.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Validation Rules](#validation-rules)
- [Flash Message System](#flash-message-system)
- [Middleware](#middleware)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Authentication

- ✅ User signup with email & password validation
- ✅ Secure password hashing with bcryptjs
- ✅ Login with session management
- ✅ Logout with session destruction
- ✅ Session-based user authentication (no JWT needed for UI)

### User Management

- ✅ View all users in a responsive table
- ✅ Edit user information (name & email) with inline forms
- ✅ Delete users with confirmation dialog
- ✅ Real-time user data display

### Form Validation

- ✅ Joi schema validation for signup
- ✅ Custom, user-friendly error messages
- ✅ Client & server-side validation ready
- ✅ Email uniqueness check

### UI/UX

- ✅ Server-side rendered views with EJS
- ✅ Session-based flash messages (no external library)
- ✅ Responsive table design
- ✅ Inline edit forms with toggle visibility
- ✅ Delete confirmation dialogs
- ✅ Minimal JavaScript (progressive enhancement)

### Database

- ✅ PostgreSQL integration with pg driver
- ✅ User table with timestamps
- ✅ Connection pooling for better performance

---

## 🛠 Tech Stack

| Layer              | Technology                | Purpose                               |
| ------------------ | ------------------------- | ------------------------------------- |
| **Frontend**       | EJS, CSS                  | Server-side templating & styling      |
| **Backend**        | Express.js                | Web framework & routing               |
| **Database**       | PostgreSQL                | Data persistence                      |
| **Authentication** | bcryptjs, express-session | Password hashing & session management |
| **Validation**     | Joi                       | Input schema validation               |
| **Environment**    | dotenv                    | Configuration management              |
| **Dev Tools**      | Nodemon                   | Auto-reload during development        |

---

## 📁 Project Structure

```
express-ejs/
├── src/
│   ├── app.js                          # Express app initialization
│   ├── config/
│   │   └── db.js                       # PostgreSQL connection pool
│   ├── controllers/
│   │   ├── authController.js           # Authentication logic (signup, login, logout)
│   │   └── userController.js           # CRUD operations for users
│   ├── data/
│   │   └── createUserTable.js          # Database table creation script
│   ├── middlewares/
│   │   ├── errorHandling.js            # Global error handler
│   │   ├── inputValidate.js            # Joi validation middleware
│   │   └── tokenVerifier.js            # JWT verification (optional)
│   ├── models/
│   │   └── userModel.js                # Database query functions
│   └── routers/
│       ├── auth.js                     # Authentication routes
│       └── userRoutes.js               # User management routes
├── views/
│   ├── home.ejs                        # Dashboard (after login)
│   ├── login.ejs                       # Login form
│   ├── signup.ejs                      # Signup form
│   └── users.ejs                       # User management page
├── public/
│   └── styles.css                      # Global styles
├── .env                                # Environment variables (not in repo)
├── .gitignore                          # Git ignore rules
├── package.json                        # Project dependencies
├── package-lock.json                   # Dependency lock file
└── README.md                           # This file
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shafiutah/express-ejs.git
cd express-ejs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create PostgreSQL Database

Open PostgreSQL command line or use a tool like pgAdmin:

```sql
CREATE DATABASE express_ejs_db;
```

### 4. Create Environment File

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=express_ejs_db

# JWT Secret (for session & potential token auth)
JWT_SECRET=your_secret_key_here_use_a_strong_key

# Server Port
PORT=5000
```

**⚠️ Security Note:** Never commit `.env` file to version control. It contains sensitive credentials.

### 5. Create Database Tables

Run the table creation script:

```bash
node src/data/createUserTable.js
```

Expected output:

```
User table created successfully (or already exists)
```

---

## ▶️ Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start on `http://localhost:5000` and automatically reload when you make changes.

### Production Mode

```bash
node src/app.js
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint  | Description         | Auth Required |
| ------ | --------- | ------------------- | ------------- |
| GET    | `/`       | Home/dashboard page | ❌            |
| GET    | `/signup` | Signup form page    | ❌            |
| POST   | `/signup` | Create new user     | ❌            |
| GET    | `/login`  | Login form page     | ❌            |
| POST   | `/login`  | Authenticate user   | ❌            |
| GET    | `/logout` | Logout user         | ✅            |

### User Management Routes

| Method | Endpoint            | Description                    | Auth Required | Format |
| ------ | ------------------- | ------------------------------ | ------------- | ------ |
| GET    | `/users`            | Display all users (table view) | ✅            | HTML   |
| GET    | `/users/:id`        | Get user by ID                 | ✅            | JSON   |
| POST   | `/users/:id/update` | Update user (form submission)  | ✅            | Form   |
| PUT    | `/users/:id`        | Update user (REST API)         | ✅            | JSON   |
| POST   | `/users/:id/delete` | Delete user (form submission)  | ✅            | Form   |
| DELETE | `/users/:id`        | Delete user (REST API)         | ✅            | JSON   |

---

## 📖 Usage Guide

### 1. Sign Up

1. Navigate to `http://localhost:5000/signup`
2. Enter your details:
   - **Name:** Alphanumeric with spaces (3-30 characters)
   - **Email:** Valid email format
   - **Password:** 6-30 characters with at least one special character (!@#$%^&\*)
3. Click "Sign Up"
4. On success, you'll be redirected to login with a success message
5. On error, validation error messages will display on the form

### 2. Log In

1. Navigate to `http://localhost:5000/login`
2. Enter your email and password
3. Click "Login"
4. On success, you'll be redirected to home (`/`) with a welcome message
5. On error, error message will display on the login form
6. Your session is stored server-side (secure, HTTP-only cookie)

### 3. View All Users

1. After logging in, navigate to "Manage Users" or visit `/users`
2. See a table with all registered users
3. Each user shows: ID, Name, Email, Role, Created Date

### 4. Edit a User

1. On `/users`, click the **Edit** button next to a user
2. An inline form will appear with editable fields
3. Modify name and/or email
4. Click "Save Changes"
5. Success message displays at the top of the page
6. Page refreshes with updated user data

### 5. Delete a User

1. On `/users`, click the **Delete** button
2. A confirmation dialog appears: "Are you sure?"
3. Click "OK" to confirm deletion
4. Success message displays
5. User is removed from the table

### 6. Log Out

1. Click "Logout" button (on home or user management page)
2. Session is destroyed
3. Redirected to login page
4. Session data is cleared

---

## 🗄️ Database Schema

### users table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**

- `id` - Auto-incrementing primary key
- `name` - User's display name (required)
- `email` - Unique email address (required)
- `password` - Hashed password (bcryptjs)
- `role` - User role (default: 'user')
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

---

## 🔐 Authentication Flow

### Signup Flow

```
1. User visits /signup
2. User submits form (POST /signup)
   ↓
3. Server validates input with Joi schema
   ↓
4. If validation fails → Render signup.ejs with error message
   ↓
5. If validation passes, check if email exists in database
   ↓
6. If email exists → Render signup.ejs with "User already exists" error
   ↓
7. If email is new:
   - Hash password with bcryptjs (salt rounds: 10)
   - Insert user into database
   - Set session flash message
   - Redirect to /login
   ↓
8. User sees success message on login page
```

### Login Flow

```
1. User visits /login
2. User submits form (POST /login)
   ↓
3. Find user by email in database
   ↓
4. If user not found → Render login.ejs with "Invalid email or password"
   ↓
5. If user found, compare submitted password with hashed password
   ↓
6. If password doesn't match → Render login.ejs with error
   ↓
7. If password matches:
   - Store user object in req.session.user
   - Set session flash message
   - Redirect to / (home)
   ↓
8. User is logged in and sees home page with success message
```

### Session Management

```
Browser Cookie (HTTP-only, secure)
         ↓
Express-session middleware
         ↓
req.session object (server memory/store)
         ↓
req.session.user → User info
req.session.successMessage → Flash messages
req.session.errorMessage → Error messages
```

---

## ✔️ Validation Rules

### Signup Form Validation (Joi Schema)

**Name Field**

- Pattern: `/^[a-zA-Z0-9 ]+$/` (letters, numbers, spaces only)
- Length: 3-30 characters
- Required: Yes
- Error message: "Name must be 3-30 characters and contain only letters, numbers, and spaces"

**Email Field**

- Format: Valid email format
- Required: Yes
- Unique: Checked against database
- Error message: "Please provide a valid email address"

**Password Field**

- Length: 6-30 characters
- Special character: At least one of `!@#$%^&*` required
- Cannot match email: Password cannot be same as email
- Required: Yes
- Error messages:
  - "Password must be 6-30 characters"
  - "Password must contain at least one special character (!@#$%^&\*)"
  - "Password cannot be the same as email"

---

## 💬 Flash Message System

The application uses a **custom session-based flash message system** (no external library like connect-flash).

### How It Works

```javascript
// 1. Controller sets message
req.session.successMessage = "User updated successfully";
res.redirect("/users");

// 2. Middleware exposes to views
res.locals.messages = {
  success: req.session.successMessage || null,
  error: req.session.errorMessage || null
};

// 3. Middleware clears after render
req.session.successMessage = null;
req.session.errorMessage = null;

// 4. View displays message
<% if (messages && messages.success) { %>
  <div class="alert alert-success"><%= messages.success %></div>
<% } %>
```

### Message Types

| Type             | Set By                 | Display     | Color   |
| ---------------- | ---------------------- | ----------- | ------- |
| `successMessage` | Controllers on success | Green alert | #d4edda |
| `errorMessage`   | Controllers on error   | Red alert   | #f8d7da |

### Usage Examples

```javascript
// Signup success
req.session.successMessage = "User created successfully. Please login.";

// Login success
req.session.successMessage = "Login successful. Welcome!";

// Update success
req.session.successMessage = "User updated successfully";

// Delete success
req.session.successMessage = "User deleted successfully";

// Validation error
req.session.errorMessage = "Name and email are required";
```

---

## 🔧 Middleware

### Session Middleware

```javascript
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
```

- Initializes express-session for user sessions
- Stores session data server-side

### Flash Message Middleware

```javascript
app.use((req, res, next) => {
  res.locals.messages = {
    success: req.session.successMessage || null,
    error: req.session.errorMessage || null,
  };
  req.session.successMessage = null;
  req.session.errorMessage = null;
  next();
});
```

- Exposes flash messages to all views
- Auto-clears messages after each request

### Input Validation Middleware (`/signup`)

```javascript
router.post("/signup", inputValidate, signupUser);
```

- Validates signup form using Joi schema
- Renders form with error on validation failure

### Error Handling Middleware

```javascript
app.use(errorHandling);
```

- Catches all errors
- Logs errors for debugging

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**

1. Verify PostgreSQL is running
2. Check `.env` file has correct database credentials
3. Ensure database `express_ejs_db` exists:
   ```bash
   psql -U postgres -c "SELECT datname FROM pg_database WHERE datname='express_ejs_db';"
   ```

### Issue: "User table does not exist"

**Solution:**
Run the table creation script:

```bash
node src/data/createUserTable.js
```

### Issue: "Port 5000 already in use"

**Solution:**

1. Change PORT in `.env` file
2. Or kill the process using the port:

   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

   # macOS/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

### Issue: "Password hashing takes too long"

**Solution:**
This is normal on first signup. bcryptjs uses 10 salt rounds by default for security.

### Issue: "Session not persisting across requests"

**Solution:**

1. Ensure cookies are enabled in browser
2. Verify `httpOnly` and `secure` cookie settings in `app.js`
3. Check browser's Application > Cookies for `connect.sid` cookie

### Issue: "Flash messages not displaying"

**Solution:**

1. Verify middleware is in correct order in `app.js`
2. Check views have the flash message code:
   ```ejs
   <% if (messages && messages.success) { %>
   ```
3. Ensure controllers are setting `req.session.successMessage`

---

## 🚀 Future Enhancements

- [ ] Email verification on signup
- [ ] Password reset functionality
- [ ] User profile page
- [ ] Role-based access control (RBAC)
- [ ] Admin panel for user management
- [ ] Audit logging for user actions
- [ ] Two-factor authentication (2FA)
- [ ] OAuth integration (Google, GitHub)
- [ ] API documentation with Swagger
- [ ] Unit and integration tests with Jest/Mocha
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Password strength meter
- [ ] User search and pagination
- [ ] CSV export of users
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add comments for complex logic
- Update README if adding new features
- Test thoroughly before submitting PR

---

## 📄 License

This project is licensed under the **ISC License** - see the `package.json` file for details.

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review existing GitHub issues
3. Create a new GitHub issue with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs. actual behavior
   - Environment details (Node version, OS, etc.)

---

## 👨‍💻 Author

**Shafi Utah** - [@shafiutah](https://github.com/shafiutah)

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [express-session Documentation](https://github.com/expressjs/session)
- [Joi Validation Documentation](https://joi.dev/)

---

## 🎯 Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Create PostgreSQL database
- [ ] Create `.env` file with credentials
- [ ] Run table creation script
- [ ] Start dev server (`npm run dev`)
- [ ] Visit `http://localhost:5000`
- [ ] Sign up a test user
- [ ] Log in
- [ ] Manage users

---

**Last Updated:** November 11, 2025  
**Version:** 1.0.0

---

Made with ❤️ using Express.js, EJS, and PostgreSQL
