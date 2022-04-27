const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/user");

const getProfile = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id });

  if (!user) {
    throw new BadRequestError("No Such User");
  }
  const profile = {
    BirthDay: user.birthday,
    Gender: user.gender,
    Hobbies: user.hobbies,
    Keywords: user.keywords,
    UserName: user.username,
    EmailID: user.email,
    Phone: user.phone,
    Interests: user.interests,
    About: user.about,
  };

  return res.status(StatusCodes.OK).json({ status: "success", data: profile });
};

const postProfile = async (req, res) => {
  const { BirthDay, Gender, Hobbies, Interests, Phone, About } = req.body;
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, {
    $set: {
      birthday: BirthDay,
      gender: Gender,
      hobbies: Hobbies,
      interests: Interests,
      phone: Phone,
      about: About,
    },
  });
  res.status(StatusCodes.OK).json({
    status: "success",
    data: { BirthDay, Gender, Hobbies, Interests, Phone, About },
  });
};

const getEventDetails = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    throw new BadRequestError("No Such User Exists");
  }

  const favEventsList = user.favouriteEvents;

  res.status(200).json({ success: "true", data: favEventsList });
};

module.exports = { postProfile, getProfile, getEventDetails };
