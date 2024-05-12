import mongoose from "mongoose";
import HttpError from "./HttpError.js";

export const validateId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    next(HttpError(400, "Invalid Id"));
  }
  next();
};
