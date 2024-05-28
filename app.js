import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./routes/index.js";

const app = express();

export default app;

import "./db/db.js";

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use((_, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

