import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import userRouters from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(cors());

// Routes
app.use("/api", userRouters);
app.use("/api/auth", authRoutes);

// View routes (EJS pages)
app.get("/auth/signup", (req, res) => res.render("signup"));
app.get("/auth/login", (req, res) => res.render("login"));
app.get("/dashboard", (req, res) => res.render("dashboard"));
app.get("/users", (req, res) => res.render("users"));

// Error handling
app.use(errorHandling);

// initialize database
await createUserTable();

// Testing POSTGRES Connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is : ${result.rows[0].current_database}`);
});

// Start server
app.listen(port, async () => {
  console.log(`server is running on http://localhost:${port}`);
});
