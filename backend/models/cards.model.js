const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const activityCardSchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  bizUserName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  activityDescription: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 1024,
  },
  activityAddress: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 400,
  },
  bizUserPhone: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 10,
  },
  activityImage: {
    type: String,
    required: true,
    minLength: 11,
    maxLength: 1024,
  },
  activityNumber: {
    type: Number,
    required: true,
    min: 100,
    max: 9_999_999_999_999,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  activityDate: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
    min: 0,
    max: 255,
  },
});

const ActivityCard = mongoose.model(
  "Card",
  activityCardSchema,
  "activity-cards"
);

const validateCard = (activityCard) => {
  const schema = Joi.object({
    activityName: Joi.string().min(2).max(255).required(),
    bizUserName: Joi.string().min(2).max(255).required(),
    activityDescription: Joi.string().min(2).max(1024).required(),
    activityAddress: Joi.string().min(2).max(400).required(),
    bizUserPhone: Joi.string()
      .allow("")
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    activityImage: Joi.string().allow("").min(11).max(1024),
    activityDate: Joi.date().allow(""),
    customerId: Joi.string().min(0).max(255).required().allow(""),
  });

  return schema.validate(activityCard);
};
const generateBuisnessNumber = async () => {
  while (true) {
    let random = _.random(100, 99999999);
    let card = await ActivityCard.findOne({ activityNumber: random });
    if (!card) {
      return random;
    }
  }
};
module.exports = {
  ActivityCard,
  validateCard,
  generateBuisnessNumber,
};
