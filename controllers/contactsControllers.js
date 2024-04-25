import contactsService from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
  const contacts = contactsService.listContacts();

  res.send(contacts);
};

export const getOneContact = (req, res) => {
  const id = req.query[id];
  const contact = contactsService.getContactById(id);

  res.send(contact);
};

export const deleteContact = (req, res) => {
  const id = req.query[id];
  const deletedContact = contactsService.removeContact(id);

  res.send(deletedContact);
};

export const createContact = (req, res) => {
  const data = req.query;
  const newContact = contactsService.addContact(data);

  res.send(newContact);
};

export const updateContact = (req, res) => {
    const updatedContact = contactsService.

  res.send(newContact);
};
