import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import AppRoutes from "./routes";
import connectDB from "./lib/connectDB";

connectDB();
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
AppRoutes(app);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
