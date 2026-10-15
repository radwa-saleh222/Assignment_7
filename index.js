import express from "express";
import authController from "./Modules/Auth/auth.controller.js";
import userController from "./Modules/User/user.controller.js";
// import blogController from "./Modules/Blog/blog.controller.js";
import { database_connect } from "./DB/db.connection.js";
const app = express();

//Global Middleware
app.use(express.json());

// Routers
app.use("/api/auth", authController);
app.use("/api/users", userController);
// app.use("/api/blogs", blogController);

// database connection
database_connect();

// Sample API for demonstration
app.get("/", (req, res) => {});

// Not found middleware
app.use((req, res, next) => {});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error", error: err });
});

app.listen(3000, () => {
  console.log("Server connected on port 3000");
});
