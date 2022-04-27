/* Secure Routes related to profile module => Uses Auth Middleware */
/* Related to User Details Required for Quiz Module */
const express = require("express");
const auth = require("../middleware/auth");

const {
  postProfile,
  getProfile,
  getEventDetails,
} = require("../controllers/profile");

const router = express.Router();

router.route("/").get(auth, getProfile);

router.route("/edit").post(auth, postProfile);

router.route("/event_details").get(auth, getEventDetails);
module.exports = router;
