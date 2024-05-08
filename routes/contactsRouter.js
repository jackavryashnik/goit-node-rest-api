import express from "express";
import ContactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", ContactsControllers.getAllContacts);
router.get("/:id", ContactsControllers.getOneContact);
router.delete("/:id", ContactsControllers.deleteContact);
router.post("/", jsonParser, validateBody(createContactSchema), ContactsControllers.createContact);
router.put("/:id", jsonParser, validateBody(updateContactSchema), ContactsControllers.updateContact);
router.patch('/:id/favorite', validateBody(updateContactSchema), jsonParser, ContactsControllers.updateStatusContact)

export default router;
