import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import tripRoutes from "./routes/trip.js";
import contentRoutes from "./routes/content.js"
import { connectToDatabase } from "./db/db.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/trip", tripRoutes);
app.use("/api/v1/content", contentRoutes);

// DB connection
connectToDatabase().then(() => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log("Server running on localhost:" + PORT));
});