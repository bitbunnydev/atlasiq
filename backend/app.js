import express from "express";
import quizRoutes from "./src/routes/quizRoutes.js";
import noteRoutes from "./src/routes/noteRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());
//routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/note", noteRoutes);

export default app;
