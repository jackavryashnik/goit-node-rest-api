import contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsServices.listContacts();

  res.json(contacts);
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.getContactById(id);

    if (!contact) {
      throw HttpError(404);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.removeContact(id);

    if (!contact) {
      throw HttpError(404);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {
  const contact = req.body;
  const newContact = await contactsServices.addContact(contact);

  res.status(201).json(newContact);
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await modifyContact(id, req.body);

    if (!updatedContact) {
      throw HttpError(404);
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};
