/* Secure Routes related to QuizScore module => Uses Auth Middleware */

const express = require("express");
const auth = require("../middleware/auth");

const { postScore, getScore } = require("../controllers/quiz");

const router = express.Router();

router.route("/score").post(auth, postScore);

router.route("/statistics").get(auth, getScore);

module.exports = router;
