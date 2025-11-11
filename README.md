# Express EJS Todo & User Management API

A full-stack Node.js application built with **Express**, **EJS**, and **PostgreSQL** for managing users and tasks. Features user authentication with JWT, password hashing with bcrypt, and CORS support.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [User Management](#user-management)
  - [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **User Management**: Create, read, update, and delete users
- **Authentication**: JWT-based signin/signup with token verification
- **Password Security**: bcryptjs for password hashing
- **Database**: PostgreSQL for persistent data storage
- **View Engine**: EJS templates for server-side rendering
- **CORS**: Cross-Origin Resource Sharing support for API calls
- **Error Handling**: Centralized error middleware
- **Environment Configuration**: dotenv for secure environment variable management
- **Development**: Nodemon for hot-reloading during development

---

## 🛠 Tech Stack

- **Runtime**: Node.js v24+
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL
- **Template Engine**: EJS 3.1.10
- **Authentication**: jsonwebtoken 9.0.2
- **Password Hashing**: bcryptjs 3.0.3
- **CORS**: cors 2.8.5
- **Validation**: joi 18.0.1
- **Environment Management**: dotenv 17.2.3
- **Body Parser**: body-parser 2.2.0
- **Development**: nodemon 3.1.10

---

## 📁 Project Structure

```
mern-api2/
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection pool
│   ├── controllers/
│   │   ├── userController.js     # User CRUD operations
│   │   └── authController.js     # Authentication (signup, signin)
│   ├── middlewares/
│   │   ├── errorHandler.js       # Centralized error handling
│   │   ├── inputValidator.js     # Input validation middleware
│   │   └── tokenVerifier.js      # JWT token verification
│   ├── models/
│   │   └── userModel.js          # Database query functions
│   ├── routes/
│   │   ├── userRoutes.js         # User API routes
│   │   └── authRoutes.js         # Authentication routes
│   ├── data/
│   │   └── createUserTable.js    # Database table initialization
│   └── index.js                  # Application entry point
├── views/
│   └── (EJS templates would go here)
├── package.json
├── package-lock.json
├── .env                          # Environment variables (not in repo)
├── .gitignore
└── README.md
```

---

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js**: v20 or higher
- **npm**: v9 or higher
- **PostgreSQL**: v12 or higher
- **Git**: For version control

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shafiutah/express-ejs.git
cd express-ejs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5002

# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=express_ejs_db
DB_PASSWORD=your_password
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
```

### 4. Create PostgreSQL Database

```sql
CREATE DATABASE express_ejs_db;
```

The application will automatically create the `users` table on startup.

### 5. Verify Setup

```bash
npm run dev
```

You should see:
```
Connection pool established with Database
Users table created successfully IF NOT EXISTS
server is running on http://localhost:5002
```

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5002` |
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_HOST` | Database host | `localhost` |
| `DB_NAME` | Database name | `express_ejs_db` |
| `DB_PASSWORD` | Database password | `mypassword` |
| `DB_PORT` | Database port | `5432` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |

---

## ▶️ Running the Application

### Development Mode (with Hot Reload)

```bash
npm run dev
```

The server will start on `http://localhost:5002` and automatically reload on file changes.

### Production Mode

```bash
node src/index.js
```

---

## 📡 API Endpoints

### User Management

#### Create User
- **Method**: `POST`
- **Endpoint**: `/api/user`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "status": 201,
    "message": "User created successfully",
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "created_at": "2025-11-11T10:30:00.000Z"
    }
  }
  ```

#### Get All Users
- **Method**: `GET`
- **Endpoint**: `/api/user`
- **Response** (200 OK):
  ```json
  {
    "status": 200,
    "message": "Users retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "created_at": "2025-11-11T10:30:00.000Z"
      }
    ]
  }
  ```

#### Get User by ID
- **Method**: `GET`
- **Endpoint**: `/api/user/:id`
- **Response** (200 OK):
  ```json
  {
    "status": 200,
    "message": "User retrieved successfully",
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "created_at": "2025-11-11T10:30:00.000Z"
    }
  }
  ```

#### Update User
- **Method**: `PUT`
- **Endpoint**: `/api/user/:id`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "status": 200,
    "message": "User updated successfully",
    "data": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "user",
      "created_at": "2025-11-11T10:30:00.000Z"
    }
  }
  ```

#### Delete User
- **Method**: `DELETE`
- **Endpoint**: `/api/user/:id`
- **Response** (200 OK):
  ```json
  {
    "status": 200,
    "message": "User deleted successfully",
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```

### Authentication

#### Sign Up
- **Method**: `POST`
- **Endpoint**: `/api/auth/signup`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "status": 201,
    "message": "User registered successfully",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      }
    }
  }
  ```

#### Sign In
- **Method**: `POST`
- **Endpoint**: `/api/auth/signin`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "status": 200,
    "message": "User logged in successfully",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      }
    }
  }
  ```

#### Protected Dashboard
- **Method**: `GET`
- **Endpoint**: `/api/auth/dashboard`
- **Headers**: 
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Response** (200 OK):
  ```json
  {
    "status": 200,
    "message": "Dashboard data",
    "data": {
      "id": 1,
      "email": "john@example.com"
    }
  }
  ```

---

## 💾 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL DEFAULT '',
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Fields**:
- `id`: Unique user identifier (auto-incremented)
- `name`: User's full name
- `email`: User's email (unique constraint)
- `password`: Hashed password (bcryptjs)
- `role`: User role (default: 'user')
- `created_at`: Account creation timestamp

---

## 🚨 Error Handling

The application includes a centralized error handling middleware that returns consistent error responses:

```json
{
  "status": 500,
  "message": "Something went wrong!",
  "error": "Detailed error message"
}
```

**Common HTTP Status Codes**:
- `200`: OK - Request successful
- `201`: Created - Resource created successfully
- `400`: Bad Request - Invalid input
- `401`: Unauthorized - Missing or invalid token
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server-side error

---

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds 10
- **JWT Authentication**: Secure token-based authentication
- **CORS**: Enabled for cross-origin requests
- **Environment Variables**: Sensitive data stored in `.env`
- **SQL Parameterization**: Uses parameterized queries to prevent SQL injection

---

## 👨‍💻 Development

### Code Style

The project follows standard JavaScript conventions:
- 2-space indentation
- Consistent naming conventions
- Modular code structure
- Separation of concerns

### Adding New Features

1. Create controllers in `src/controllers/`
2. Add routes in `src/routes/`
3. Create database functions in `src/models/`
4. Add middleware in `src/middlewares/` if needed
5. Update this README with new endpoints

### Testing Endpoints

Use tools like:
- **Postman**: https://www.postman.com/
- **Thunder Client**: VS Code extension
- **curl**: Command-line tool

Example with curl:
```bash
curl -X POST http://localhost:5002/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Notes

- The application automatically creates the `users` table on startup via `createUserTable.js`
- JWT tokens expire after 1 hour (configurable in `tokenVerifier.js`)
- Passwords are hashed before storage using bcryptjs
- The application uses PostgreSQL connection pooling for better performance

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub:
https://github.com/shafiutah/express-ejs/issues

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👤 Author

**Shafi Utah**
- GitHub: [@shafiutah](https://github.com/shafiutah)
- Email: shafiutah@gmail.com

---

## 🔄 Version History

- **v1.0.0** (2025-11-11): Initial release with user management and authentication
  - User CRUD operations
  - JWT-based authentication
  - PostgreSQL integration
  - Error handling middleware
  - CORS support

---

**Last Updated**: November 11, 2025
