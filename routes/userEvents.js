/* Secure Routes related to Events module => Uses Auth Middleware */
/* Taking care of "events" module as seen by user -> Marking Events as interested and Adding Reviews */

const express = require("express");
const auth = require("../middleware/auth");

const {
  getFavourites,
  addToFavourites,
  getAllEvents,
  getEventById,
  createReview,
  removeFromFavourites,
} = require("../controllers/userEvents");

const router = express.Router();

// Add events to marked or view marked events
router.route("/").get(auth, getAllEvents);
router
  .route("/favourites")
  .get(auth, getFavourites)
  .post(auth, addToFavourites);

router.route("/removeFromFavourites").post(auth, removeFromFavourites);

// Get specific event by id->query parameter
router.route("/event").get(auth, getEventById);

router.route("/reviews").post(auth, createReview);

module.exports = router;
