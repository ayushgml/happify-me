const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");
require("dotenv").config();

/* Checking Status of User -> Role And UserName */
const checkUser = async (req, res) => {
  let username, role;
  if (req.user) {
    username = req.user.username;
    role = req.user.role;
  } else if (req.organizer) {
    username = req.organizer.username;
    role = req.organizer.role;
  }
  if (username) {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: { username, role } });
  }
  throw new UnauthenticatedError("Invalid Token or No such User Exists");
};

module.exports = { checkUser };
