import * as fs from "node:fs/promises";
import path from "path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) return null;

  const [result] = data.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return result;
}

async function addContact(name, email, phone) {
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  const allContacts = await listContacts();

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

async function updateContact(contactId, data) {
  const contact = getContactById(contactId);

  if (typeof contact === "undefined") return null;

  const updatedContact = { ...contact, ...data };
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  allContacts[contactIndex] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return updatedContact;
}

async function updateStatusContact(contactId, body) {}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
