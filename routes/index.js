import express from "express";

import contactRoutes from "./contactsRouter.js";
import usersRoutes from "./usersRouter.js";

const router = express.Router();

router.use("/contacts", contactRoutes);
router.use("/users", usersRoutes);

export default router;
