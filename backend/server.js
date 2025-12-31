import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 Server started on PORT:", PORT);
  });
});
