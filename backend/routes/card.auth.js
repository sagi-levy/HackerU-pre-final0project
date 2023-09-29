const express = require("express");
const router = express.Router();
const {
  ActivityCard,
  generateBuisnessNumber,
  validateCard,
} = require("../models/cards.model");
const authCheckMiddleWare = require("../middlewares/auth");
const { User } = require("../models/users");

router.get("/my-activity-cards", authCheckMiddleWare, async (req, res) => {
  if (!req.user.biz) {
    res.status(401).send("Access good");
    return;
  }
  const cards = await ActivityCard.find({ user_id: req.user._id });

  res.send(cards);
});

router.get("/my-activity-cards/:id", authCheckMiddleWare, async (req, res) => {
  const activityCard = await ActivityCard.findById({
    _id: req.params.id,
    user_id: req.user._id,
  });
  res.send(activityCard);
});

router.delete(
  "/delete-activity-cards/:id",
  authCheckMiddleWare,
  async (req, res) => {
    const activityCard = await ActivityCard.findByIdAndRemove({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!activityCard) {
      res.status(404).send("their is not such a card with this specific id");
      return;
    }
    res.send(activityCard);
  }
);

router.post("/create-activity-card", authCheckMiddleWare, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const activityCard = await new ActivityCard({
    ...req.body,
    activityImage:
      req.body.activityImage ||
      "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png",
    activityNumber: await generateBuisnessNumber(),
    user_id: req.user._id,
  }).save();
  res.send(activityCard);
});

router.put(
  "/edit-activity-cards/:id",
  authCheckMiddleWare,
  async (req, res) => {
    const { error } = validateCard(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    let activityCard = await ActivityCard.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user._id,
      },
      req.body
    );
    if (!activityCard)
      return res
        .status(404)
        .send("could not find a card with this specific id");
    activityCard = await ActivityCard.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });
    res.send(activityCard);
  }
);
router.get("/all-activity-cards", authCheckMiddleWare, async (req, res) => {
  if (!req.user.biz) {
    const cardsNotBiz = await ActivityCard.find({});
    res.status(200).send(cardsNotBiz);
    return;
  }
  const cards = await ActivityCard.find({});

  res.send(cards);
});

module.exports = router;
