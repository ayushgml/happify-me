const Event = require("../models/event");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllEvents = async (req, res) => {
  const { _id } = req.organizer;
  if (!_id) {
    throw new BadRequestError("No Id was recieved");
  }
  const events = await Event.find({ organizer: _id });
  if (!events) {
    throw new BadRequestError("No events created by the organization");
  }

  res.status(200).json({ success: "true", data: events });
};

const getEventById = async (req, res) => {
  const { _id } = req.organizer;
  const { eventId } = req.query;
  if (!_id || !eventId) {
    throw new BadRequestError("No Such Item Exists");
  }
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError("No Such Event Exists");
  }
  if (event.organizer != _id) {
    throw new UnauthenticatedError(
      "You Are Not Authorized to Access This Event."
    );
  }

  res.status(200).json({ success: "true", data: event });
};

const removeEventById = async (req, res) => {
  const { _id } = req.organizer;
  const { eventId } = req.body;
  if (!_id || !eventId) {
    throw new BadRequestError("No Such Item Exists");
  }
  const event = await Event.findById(eventId);
  if (!event) {
    throw new BadRequestError("No Such Event Exists");
  }
  if (event.organizer != _id) {
    throw new UnauthenticatedError(
      "You Are Not Authorized to Remove This Event."
    );
  }
  await Event.findByIdAndRemove(eventId);
  res.status(200).json({ success: "true", data: event });
};

const patchEventById = async (req, res) => {
  const { _id } = req.organizer;
  const updatedEvent = req.body;
  if (!_id) {
    throw new UnauthenticatedError("No Such Organizer");
  }
  if (!updatedEvent) {
    throw new BadRequestError("No Info to update with");
  }
  //   Checking for event and if the current organization is the owner
  const event = await Event.findById(updatedEvent._id);
  if (!event) {
    throw new BadRequestError("No Such Event Exists");
  }
  if (event.organizer != _id) {
    throw new UnauthenticatedError(
      "You Are Not Authorized to Remove This Event."
    );
  }

  await Event.findByIdAndUpdate(updatedEvent._id, updatedEvent);
};

const createEvent = async (req, res) => {
  const { _id } = req.organizer;

  let result = {};
  if (req.files) {
    result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: "file-upload",
    });
    fs.unlinkSync(req.files.image.tempFilePath);
  }

  const newEvent = {
    ...req.body,
    organizer: _id,
    eventImage: result.secure_url,
  };

  const created = await Event.create(newEvent);
  if (!created) {
    throw new BadRequestError("Event Not Created");
  }

  res.status(200).json({ success: true, data: created });
};

const createAnnouncement = async (req, res) => {
  const { _id } = req.organizer;
  const { content, eventId } = req.body;

  if (!_id || !eventId) {
    throw new BadRequestError("No Such Item Exists");
  }
  const event = await Event.findById(eventId);

  if (!event) {
    throw new BadRequestError("No Such Event Exists");
  }
  if (event.organizer != _id) {
    throw new UnauthenticatedError(
      "You Are Not Authorized to Access This Event."
    );
  }

  const returnValue = await Event.findByIdAndUpdate(eventId, {
    $push: { announcements: { content } },
  });

  res.status(200).json({ success: "true", data: returnValue });
};
module.exports = {
  // uploadImage,
  createEvent,
  getAllEvents,
  getEventById,
  removeEventById,
  patchEventById,
  createAnnouncement,
};
