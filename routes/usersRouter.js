import express from "express";

import UsersController from "../controllers/usersControllers.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, UsersController.register);
router.post("/login", jsonParser, UsersController.login);

export default router;
