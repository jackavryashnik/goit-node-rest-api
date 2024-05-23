import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user.id });

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user.id;

  try {
    const contact = await Contact.findOne({ _id: id, owner });

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
    owner: req.user.id,
  };

  try {
    const result = await Contact.create(contact);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user.id;

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,
      {
        new: true,
      }
    );

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
  const owner = req.user.id;

  try {
    const contact = await Contact.findOne({ _id: id, owner });
    if (!contact) {
      throw HttpError(404);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user.id;
  const favorite = req.body.favorite;

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      favorite,
      {
        new: true,
      }
    );

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
