import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/index.js";
import HttpError from "./helpers/HttpError.js";

import "./db/db.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use('/api/contacts/:id', (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    next(HttpError(400, "Invalid Id"));
  }
  next()
});

app.use("/api", contactsRouter);

app.use((_, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
