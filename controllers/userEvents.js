const { BadRequestError } = require("../errors");

// models required
const Event = require("../models/event");
const User = require("../models/user");
const Review = require("../models/review");

const getFavourites = async (req, res) => {
  const { _id } = req.user;
  const favEvents = await User.findById(_id).populate("favouriteEvents");

  if (!favEvents) {
    throw new BadRequestError("There is No Such User");
  }
  res.status(200).json({
    success: "true",
    data: favEvents.toJSON({ virtuals: true }).favouriteEvents,
  });
};

const addToFavourites = async (req, res) => {
  const { eventId } = req.body;
  const { _id } = req.user;
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError("No Such Event");
  }
  const eventAddedToFavourites = await User.findByIdAndUpdate(_id, {
    $push: { favouriteEvents: eventId },
  });

  if (!eventAddedToFavourites) {
    throw new BadRequestError("There Was Some Error");
  }

  //   Return on a test basis
  res.status(200).json({ success: "true", data: eventAddedToFavourites });
};

const removeFromFavourites = async (req, res) => {
  const { eventId } = req.body;
  const { _id } = req.user;
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError("No Such Event");
  }
  const eventAddedToFavourites = await User.findByIdAndUpdate(_id, {
    $pull: { favouriteEvents: eventId },
  });

  if (!eventAddedToFavourites) {
    throw new BadRequestError("There Was Some Error");
  }

  //   Return on a test basis
  res.status(200).json({ success: "true", data: eventAddedToFavourites });
};

const getAllEvents = async (req, res) => {
  const allEvents = await Event.find({});

  res.status(200).json({ success: "true", data: allEvents });
};

const getEventById = async (req, res) => {
  // Very Important Controller -> Example for multilevel selective
  // population

  const { eventId } = req.query;
  const event = await Event.findOne({ _id: eventId }).populate({
    path: "reviews",
    populate: { path: "user", select: "username" },
  });
  if (!event) {
    throw new BadRequestError("There Exists No Such Event. Please Check Again");
  }
  res.status(200).json({
    success: "true",
    data: event.toJSON({ virtuals: true }),
  });
};

const createReview = async (req, res) => {
  const { eventId, content } = req.body;
  const { _id } = req.user;

  const event = await Event.findById(eventId);
  if (!event || !_id) {
    throw new BadRequestError("There Exists No Such Event. Please Check Again");
  }

  const exists = await Review.find({ user: _id, event: eventId });
  if (exists.length != 0) {
    throw new BadRequestError("There Already Exists A Review From You.");
  }

  const newReview = { content, user: _id, event: eventId };

  await Review.create(newReview);
  res.status(200).json({ success: "true", data: newReview });
};
module.exports = {
  createReview,
  getFavourites,
  addToFavourites,
  getAllEvents,
  getEventById,
  removeFromFavourites,
};
