import express from "express";
import { createUser, getUsers } from "./controllers/user.controller.js";
import cors from "cors";
const app = express();
app.use(cors(
{ origin: "https://node-task.pages.dev" }
));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>You are on Ajay's server</h1>");
});
app.post("/", async (req, res) => {
  const data = req.body;
  try {
    const user = await createUser(data);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    if (error.name === "ValidatorError" || error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Server Error" });
  }
});
app.get("/viewusers", async (req, res) => {
  try {
    const users = await getUsers();
    if (users.length === 0) {
      return res.status(200).json({ message: "No users found" });
      // throw new Error({message:"Users Not Found"});
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default app;
