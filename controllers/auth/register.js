const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(user) {
    throw HttpError(409, "Email already in use");
  }

  const hachPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({...req.body, password: hachPassword, avatarURL});
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
}

module.exports = register;