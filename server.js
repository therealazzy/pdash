import express from "express";
import cors from "cors";
import { launchRoutes } from "./routes/launchRoutes.js";
import { launchItemRoutes } from "./routes/launchItemRoutes.js";
import { noteRouter } from "./routes/noteRoutes.js";
const PORT = 3001;
const app = express();

// Enable CORS with specific options
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Updated for Vite's default port
    credentials: true
}));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.get("/", (req, res) => {
    res.send("local server is running");
});

app.use("/launch", launchRoutes);
app.use("/launch-items", launchItemRoutes);
app.use("/notes", noteRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`CORS enabled for: http://localhost:5173`);
});
