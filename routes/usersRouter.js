import express from "express";

import authMiddle from "../middleware/auth.js";
import avatarMiddle from "../middleware/upload.js"
import validateBody from "../helpers/validateBody.js";
import {registerUserSchema, loginUserSchema} from '../schemas/usersSchemas.js'

import UsersController from "../controllers/usersControllers.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateBody(registerUserSchema), UsersController.register);
router.post("/login", jsonParser, validateBody(loginUserSchema), UsersController.login);
router.post("/logout", authMiddle, UsersController.logout);
router.post("/current", authMiddle, UsersController.current);
router.patch("/avatars", authMiddle, avatarMiddle.single("avatar"), UsersController.changeAvatar);

export default router;
