const mongoose = require("mongoose");
const joi = require("joi");
const JWT = require("jsonwebtoken");
const { JWTSecretToken } = require("../configs/config");
const userShcema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 1000, required: true },
  email: { type: String, minLength: 5, maxLength: 1000, required: true },
  password: { type: String, minLength: 5, maxLength: 1000, required: true },
  createdAt: { type: Date, default: Date.now },
  biz: { type: Boolean, required: true },
});
userShcema.methods.generateAuthToken = function () {
  return JWT.sign({ _id: this._id, biz: this.biz }, JWTSecretToken);
};
const User = mongoose.model("User", userShcema, "users");

const validateUser = (user) => {
  const Schema = joi.object({
    name: joi.string().required().max(1000).min(2),
    email: joi.string().required().min(5).max(1000).email(),
    password: joi.string().required().min(5).max(1000),
    biz: joi.boolean().required(),
  });
  return Schema.validate(user);
};

module.exports = {
  User,
  validateUser,
};
