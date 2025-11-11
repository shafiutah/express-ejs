import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {Pool} from "pg";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function createUsersTable() {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL DEFAULT '',
        role VARCHAR(20) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
}
async function createTodosTable() {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (  
        id SERIAL PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
}

// Initialize database table
async function initDatabase() {
  try {
    await createUsersTable();
    await createTodosTable();
    console.log("Database initialized");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

app.get("/add", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY created_at DESC");
    const todos = result.rows.map((row) => ({task: row.task, id: row.id}));
    const data = {
      name: "Task Manager",
      todos: todos,
    };
    res.render("index.ejs", data);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).send("Error fetching todos");
  }
});

app.post("/set", async (req, res) => {
  try {
    const {task} = req.body;
    if (!task || task.trim() === "") {
      return res.redirect("/add");
    }
    await pool.query("INSERT INTO todos (task) VALUES ($1)", [task.trim()]);
    res.redirect("/add");
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).send("Error adding todo");
  }
});

app.get("/todos", async (req, res) => {
  try {
    const {task} = req.query;
    const result = await pool.query("INSERT INTO todos (task) VALUES ($1) RETURNING *", [task.trim()]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).send("Error fetching todos");
  }
});

app.listen(port, async () => {
  await initDatabase();
  console.log(`server is running on http://localhost:${port}`);
});
