import contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    if (contact === null) {
      throw HttpError(404);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const contact = await Contact.create(contact);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, contact, {
      new: true,
    });

    if (updatedContact === null) {
      throw HttpError(404);
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (contact === null) {
      throw HttpError(404);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const favorite = req.body.favorite;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, favorite, {
      new: true,
    });

    if (updatedContact === null) {
      throw HttpError(404);
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
