/*  Taking care of "events" module as seen by organizer */
/*  Module For Organizers -> Creating and Managing events */
const express = require("express");
const auth = require("../middleware/auth");

const {
  createEvent,
  getAllEvents,
  getEventById,
  removeEventById,
  patchEventById,
  createAnnouncement,
} = require("../controllers/organizer");

const router = express.Router();

router.route("/").get(auth, getAllEvents);

router.route("/create-event").post(auth, createEvent);

// router.route("/create-event/uploads").post(auth, createEvent);

router.route("/event").get(auth, getEventById);

router.route("/modify-event").patch(auth, patchEventById);

router.route("/remove-event").post(auth, removeEventById);

router.route("/announcements").post(auth, createAnnouncement);

module.exports = router;
