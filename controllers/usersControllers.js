import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import * as fs from "node:fs/promises";
import path from "node:path";
import Jimp from "jimp";

async function register(req, res, next) {
  const { email, password } = req.body;

  const emailTolowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailTolowerCase });

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(emailTolowerCase);

    await User.create({
      email: emailTolowerCase,
      password: passwordHash,
      avatarURL,
    });

    res.status(201).send({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const emailToLowercase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailToLowercase });

    if (user === null) {
      res.status(401).send({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      res.status(401).send({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).send({ token, user: { email, subscription: "starter" } });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user._id, { token });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
  res.send({ message: "Logout" });
}

async function current(req, res, next) {
  const { token } = req.body.authorization;

  try {
    const user = await User.findOne({ token });

    if (token !== user.token) {
      res.status(401).send({ message: "Not authorized" });
    }

    res
      .status(200)
      .send({ email: user.email, subscription: user.subscription });
  } catch (error) {
    next(error);
  }
  res.send({ message: "Current" });
}

async function changeAvatar(req, res, next) {
  try {
    if (!req.file) {
      throw HttpError(400, "No file uploaded");
    }

    const publicPath = path.resolve("public/avatars", req.file.filename);

    await fs.rename(req.file.path, publicPath);

    const image = await Jimp.read(publicPath);
    await image.resize(250, 250).writeAsync(publicPath);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: `/avatars/${req.file.filename}` },
      { new: true }
    );

    if (user === null) {
      res.status(404).send({ message: "User not found" });
    }

    if (user.avatarURL === null) {
      res.status(404).send({ message: "Avatar not found" });
    }

    res.send({ avatarURL });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  logout,
  current,
  changeAvatar,
};
