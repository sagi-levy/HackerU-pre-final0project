// require("dotenv").config();
const express = require("express");
const router = express.Router();
const joi = require("joi");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("invalid email");
    return;
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    res.status(400).send("invalid password");
    return;
  }
  //process
  const token = user.generateAuthToken();
  //response
  res.send({ token });
});

function validate(user) {
  const Schema = joi.object({
    email: joi.string().required().min(5).max(1000).email(),
    password: joi.string().required().min(5).max(1000),
  });

  return Schema.validate(user);
}
module.exports = router;
