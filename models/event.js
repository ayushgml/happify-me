const mongoose = require("mongoose");

const announcement = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
  },
});

const event = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "Organizer Name is required"],
    },
    subtitle: {
      type: String,
      required: [true, "subtitle is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    date: {
      type: Date,
      required: [true, "Date of event is required"],
    },
    platform: {
      type: String,
    },
    eventImage: {
      type: String,
    },
    announcements: [announcement],
    organizer: {
      type: mongoose.Schema.ObjectId,
      ref: "organization",
      required: true,
    },
    contactNo: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    status: {
      type: String,
      enum: ["Completed", "Not Completed"],
      default: "Not Completed",
    },
    link: {
      type: String,
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
/* Collecting Reviews Belonging to each event using mongoose virtuals */

event.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "event",
  justOne: false,
});

module.exports = mongoose.model("event", event);
