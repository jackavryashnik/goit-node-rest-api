import express from "express";
import path from "node:path";
import morgan from "morgan";
import cors from "cors";

import router from "./routes/index.js";

import "./db/db.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/avatars", express.static(path.resolve("public/avatars")));

app.use("/api", router);

app.use((_, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});

export default app;
