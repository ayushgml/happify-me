const mongoose = require("mongoose");
const validator = require("validator");

const organizer = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Organizer Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

/* Virtual Field containing all events with _id Matching given Organizer */

organizer.virtual("events", {
  ref: "event",
  localField: "_id",
  foreignField: "organizer",
  justOne: false,
});

module.exports = mongoose.model("organizer", organizer);
