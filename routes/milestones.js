/* Secure Routes related to Milestones module => Uses Auth Middleware */

const express = require("express");
const auth = require("../middleware/auth");

const {
  createNewMilestone,
  editMilestone,
  getAllMilestones,
  getMilestone,
  deleteMilestone,
} = require("../controllers/milestones");

const router = express.Router();

router.route("/").get(auth, getAllMilestones);

router.route("/create").post(auth, createNewMilestone);

router.route("/edit").patch(auth, editMilestone);

router.route("/delete").post(auth, deleteMilestone);
// Probably Not Gonna Use in this Release
router.route("/milestone").get(auth, getMilestone);

module.exports = router;
