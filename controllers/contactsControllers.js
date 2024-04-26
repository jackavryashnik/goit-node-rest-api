import contactsService from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
  const contacts = contactsService.listContacts();

  res.status(200).send(contacts);
};

export const getOneContact = (req, res) => {
  const { id } = req.params;
  const contact = contactsService.getContactById(id);

  res.status(200).send(contact);
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  const deletedContact = contactsService.removeContact(id);

  res.status(200).send(deletedContact);
};

export const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = contactsService.addContact(name, email, phone);

  res.status(201).send(newContact);
};

export const updateContact = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updatedContact = updateContact(id, data);
  res.status(200).send(updatedContact);
};
