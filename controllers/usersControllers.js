import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

async function register(req, res, next) {
  const { email, password } = req.body;

  const emailTolowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailTolowerCase });

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
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

export default {
  register,
  login,
  logout,
  current,
};
