import bcrypt from "bcrypt";
import crypto from "node:crypto";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import mail from "../mail.js";

async function register(req, res, next) {
  const { email, password } = req.body;

  const emailTolowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailTolowerCase });

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();

    await User.create({
      email: emailTolowerCase,
      password: passwordHash,
      verificationToken,
    });

    mail.sendMail({
      to: emailTolowerCase,
      from: "vryasha@meta.ua",
      subject: "Welcome to contact app",
      html: `To confirm Your email please click on the <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a>`,
      text: "To confirm Your email please click on the link",
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

async function verify(req, res, next) {
  const { verificationToken } = req.body;

  try {
    const user = await User.findOne({ verificationToken });

    if (user === null) {
      req.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    req.status(200).send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  logout,
  current,
  verify,
};
