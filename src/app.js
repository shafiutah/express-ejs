import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/userRoutes.js";
import createUserTable from "./data/createUserTable.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");

// Custom flash message middleware
app.use((req, res, next) => {
  // Pass flash messages to all views
  res.locals.messages = {
    success: req.session.successMessage || null,
    error: req.session.errorMessage || null,
  };

  // Clear flash messages after displaying them
  req.session.successMessage = null;
  req.session.errorMessage = null;

  next();
});

app.use("/", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler); // Error handling

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await createUserTable();
  console.log(`Server running on http://localhost:${PORT}`);
});
