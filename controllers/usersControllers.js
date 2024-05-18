import User from "../models/user.js";

async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    console.log({ user });

    res.send("Register");
  } catch (error) {
    next(error);
  }
}

async function login(req, res, nex) {
  res.send("Logged in");
}

export default {
  register,
  login,
};
