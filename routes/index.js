import express from "express";

import authMiddle from "../middleware/auth.js";

import contactRoutes from "./contactsRouter.js";
import usersRoutes from "./usersRouter.js";

const router = express.Router();

router.use("/contacts", authMiddle, contactRoutes);
router.use("/users", usersRoutes);

export default router;
