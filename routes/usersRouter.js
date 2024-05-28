import express from "express";

import authMiddle from "../middleware/auth.js";
import validateBody from "../helpers/validateBody.js";
import {registerUserSchema, loginUserSchema, emailSchema} from '../schemas/usersSchemas.js'

import UsersController from "../controllers/usersControllers.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateBody(registerUserSchema), UsersController.register);
router.post("/login", jsonParser, validateBody(loginUserSchema), UsersController.login);
router.post("/logout", authMiddle, UsersController.logout);
router.post("/current", authMiddle, UsersController.current);
router.get("/verify/:verificationToken", UsersController.verify)
router.post("/verify", validateBody(emailSchema), UsersController.resend)

export default router;
