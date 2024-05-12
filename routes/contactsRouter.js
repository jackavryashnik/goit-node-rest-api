import express from "express";
import ContactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import { validateId } from "../helpers/validateId.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", ContactsControllers.getAllContacts);
router.get("/:id", validateId, ContactsControllers.getOneContact);
router.delete("/:id", validateId, ContactsControllers.deleteContact);
router.post(
  "/",
  jsonParser,
  validateBody(createContactSchema),
  ContactsControllers.createContact
);
router.put(
  "/:id",
  jsonParser,
  validateId,
  validateBody(updateContactSchema),
  ContactsControllers.updateContact
);
router.patch(
  "/:id/favorite",
  validateId,
  validateBody(updateFavoriteSchema),
  jsonParser,
  ContactsControllers.updateStatusContact
);

export default router;
