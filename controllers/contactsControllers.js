import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import {
  newContactsSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = (req, res) => {
  const contacts = contactsService.listContacts();

  res.status(200).send(contacts);
};

export const getOneContact = (req, res) => {
  const { id } = req.params;
  const contact = contactsService.getContactById(id);
  if (!contact) {
    const err = HttpError(404);
    res.status(err.status).send(err.message);
  }

  res.status(200).send(contact);
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  const deletedContact = contactsService.removeContact(id);

  if (!deletedContact) {
    const err = HttpError(404);
    res.status(err.status).send(err.message);
  }

  res.status(200).send(deletedContact);
};

export const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = contactsService.addContact(name, email, phone);
  const validateValues = validateBody(newContactsSchema);

  validateValues(newContact);

  res.status(201).send(newContact);
};

export const updateContact = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!data.length) {
    const err = HttpError(400, {
      message: "Body must have at least one field",
    });

    res.status(err.status).send(err.message);
  }

  const updatedContact = updateContact(id, data);

  if (!updateContact) {
    const err = HttpError(404);

    res.status(err.status).send(err.message);
  }

  const validateValues = validateBody(updateContactSchema);

  validateValues(updatedContact);

  res.status(200).send(updatedContact);
};
