import express from "express";
import cors from "cors";
import { launchRoutes } from "./routes/launchRoutes.js";
import { launchItemRoutes } from "./routes/launchItemRoutes.js";
import { noteRouter } from "./routes/noteRoutes.js";
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("local server is running");
});

app.use("/launch", launchRoutes);
app.use("/launch-items", launchItemRoutes);
app.use("/notes", noteRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
