import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

async function register(req, res, next) {
  const { name, email, password } = req.body;

  const emailTolowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailTolowerCase });

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: emailTolowerCase,
      password: passwordHash,
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

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );

    res.status(200).send({ token, user: { email, subscription: "starter" } });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  res.send({ message: "Logout" });
}

async function current(req, res, next) {
  res.send({ message: "Current" });
}

export default {
  register,
  login,
  logout,
  current,
};
