import express from "express";

import validateBody from "../helpers/validateBody.js";
import {registerUserSchema, loginUserSchema} from '../schemas/usersSchemas.js'

import UsersController from "../controllers/usersControllers.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateBody(registerUserSchema), UsersController.register);
router.post("/login", jsonParser, validateBody(loginUserSchema), UsersController.login);
router.post("/logout", UsersController.logout);
router.post("/current", UsersController.current);

export default router;
