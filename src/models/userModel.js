import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUserFunc = async (name, email, password, role = "user") => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at",
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
};

export const getUserByEmailFunc = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

export const getAllUsersFunc = async () => {
  const result = await pool.query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC");
  return result.rows;
};

export const getUserByIdFunc = async (id) => {
  const result = await pool.query("SELECT id, name, email, role, created_at FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateUserFunc = async (id, name, email) => {
  const result = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, role, created_at", [
    name,
    email,
    id,
  ]);
  return result.rows[0];
};

export const deleteUserFunc = async (id) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, email", [id]);
  return result.rows[0];
};
