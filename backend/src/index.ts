import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/db.js";
import cors from "cors";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRoutes);

connectToDatabase().then(() => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log("Server running on localhost:" + PORT));
});