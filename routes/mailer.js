/* Secure Routes related to mailer module => Uses Auth Middleware */

const express = require("express");
const auth = require("../middleware/auth");

const {
  addContact,
  removeContact,
  getAllContacts,
} = require("../controllers/mailer");

const router = express.Router();

router.route("/remove-contact").post(auth, removeContact);

router.route("/add-contact").post(auth, addContact);

router.route("/get-all-contacts").get(auth, getAllContacts);

module.exports = router;
