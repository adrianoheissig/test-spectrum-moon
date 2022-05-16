import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserInformation = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) res.sendStatus(404);
    const users = await Users.findAll(
      { attributes: ["id", "name", "email"] },
      { where: { id: userId } }
    );
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match!" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({ where: { email: req.body.email } });
    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match) {
      throw new Error();
    }

    const userId = user[0].id;

    const payload = {
      userId,
      name: user[0].name,
      email: user[0].email,
    };

    console.log(payload);

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    await Users.update(
      { access_token: accessToken },
      { where: { id: userId } }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email/Password not found!" });
  }
};

export const Logout = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      id: userId,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  await Users.update({ refresh_token: null }, { where: { id: userId } });
  return res.sendStatus(200);
};
