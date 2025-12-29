import express from "express";
import quizRoutes from "./src/routes/quizRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use("/api/quiz", quizRoutes);

export default app;
