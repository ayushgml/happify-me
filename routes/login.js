/* Routes For Login -> Separate Routes for Organizer and User*/

const express = require("express");
const { postLogin, postLoginOrganizer } = require("../controllers/login");
// router middleware
const router = express.Router();

router.route("/").post(postLogin);

router.route("/organizer").post(postLoginOrganizer);

module.exports = router;
