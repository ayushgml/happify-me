const User = require("../models/user");
const { BadRequestError } = require("../errors");

/* Controllers For adding New Contact Removing Contact and Getting all Contact Details */

const addContact = async (req, res) => {
  const { _id } = req.user;

  const { friends } = await User.findByIdAndUpdate(_id, {
    $push: { friends: req.body.user },
  });

  if (!friends) {
    throw new BadRequestError("Something went wrong..!! Bad Request");
  }
  res.status(200).json({ success: "true", data: friends });
};

const removeContact = async (req, res) => {
  const { _id } = req.user;
  const { friends } = await User.findByIdAndUpdate(_id, {
    $pull: { friends: { _id: req.body.id } },
  });

  if (!friends) {
    throw new BadRequestError("Something went wrong..!! Bad Request");
  }
  res.status(200).json({ success: "true", data: friends });
};

const getAllContacts = async (req, res) => {
  const { _id } = req.user;

  const { friends } = await User.findById(_id);
  if (!friends) {
    throw new BadRequestError("Something went wrong..!! Bad Request");
  }
  res.status(200).json({ success: "true", data: friends });
};
module.exports = { addContact, removeContact, getAllContacts };
