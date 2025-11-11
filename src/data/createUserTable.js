import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL DEFAULT '',
        role VARCHAR(20) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
  );`;
  try {
    await pool.query(queryText);
  } catch (err) {
    console.error("Error creating users table:", err);
  }
};
export default createUserTable;

// async function createUsersTable() {
//   await pool.query(`
//       CREATE TABLE IF NOT EXISTS users (
// id SERIAL PRIMARY KEY,
// name VARCHAR(100) NOT NULL,
// email VARCHAR(100) UNIQUE NOT NULL,
// password VARCHAR(255) NOT NULL DEFAULT '',
// role VARCHAR(20) NOT NULL DEFAULT 'user',
// created_at TIMESTAMP DEFAULT NOW()
//       )
//     `);
// }

// // Initialize database table
// async function initDatabase() {
//   try {
//     await createUsersTable();
//     await createAnotherTable();
//     console.log("Database initialized");
//   } catch (err) {
//     console.error("Error initializing database:", err);
//   }
// }
