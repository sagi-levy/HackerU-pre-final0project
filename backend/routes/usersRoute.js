const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/users");
const authMW = require("../middlewares/auth");
// router.set("view engine", "ejs");
router.use(express.urlencoded({ extended: false }));
const { JWTSecretToken } = require("../configs/config");
const nodemailer = require("nodemailer");

router.get("/me", authMW, async (req, res) => {
  const user = await User.findById(req.user._id, { password: 0 });
  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    console.log(error.details[0].message);
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    console.log("user is already registed");
    res.status(400).send("user is already registed");
    return;
  }
  user = await new User({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 12),
  }).save();
  res.send({ name: user.name, _id: user._id });
});

module.exports = router;
