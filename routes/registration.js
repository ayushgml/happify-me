/* Routes For Registration -> Separate Routes for Organizer and User*/

const express = require("express");
const {
  registerUser,
  registerOrganizer,
} = require("../controllers/registration");

// router middleware
const router = express.Router();

// Probably better to use a middleware and disambiguate the model
// Then from here i can post to a single controller
router.route("/").post(registerUser);

router.route("/organizer").post(registerOrganizer);

module.exports = router;
