const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Post Methods

/* Methods For Creating Milestones, Editing Milestones, Getting all Milestones and For Deleting and Viewing single Milestone  */
const createNewMilestone = async (req, res) => {
  const { title, targetDate, subtasks } = req.body;

  // added by auth middleware
  const { _id } = req.user;

  if (!title) {
    throw new BadRequestError("Milestone must have title");
  }

  const newMilestone = { title, targetDate, subtasks };
  //   push adds new item to arrayProp milestones
  await User.findByIdAndUpdate(_id, { $push: { milestones: newMilestone } });

  return res.status(StatusCodes.OK).send("New Milestone Created");
};

// Patch Methods
const editMilestone = async (req, res) => {
  const { milestoneId, title } = req.body;

  const milestone = { ...req.body, _id: milestoneId };
  delete milestone.milestoneId;

  const { _id } = req.user;
  if (!title) {
    throw new BadRequestError("Milestone must have title");
  }

  // $ corresponds to index of matched subDocument
  const updated = await User.findOneAndUpdate(
    {
      _id,
      milestones: { $elemMatch: { _id: milestoneId } },
    },
    {
      $set: {
        "milestones.$": milestone,
      },
    }
  ).catch((err) => {
    throw new BadRequestError("Milestone not updating!!");
  });

  if (!updated) {
    throw new BadRequestError("There is no such task to edit");
  }
  return res.status(StatusCodes.OK).send("Milestone Edited");
};

const getAllMilestones = async (req, res) => {
  const { _id } = req.user;

  const { milestones } = await User.findOne({ _id });
  return res.status(StatusCodes.OK).json({ success: true, data: milestones });
};

const getMilestone = async (req, res) => {
  const { milestoneID } = req.query;
  const { _id } = req.user;

  const { milestones } = await User.findOne({ _id });
  const activeMilestone = await milestones.find((each) => {
    // Loose Check -> one is mongoose id other is string
    return each._id.toString() === milestoneID;
  });
  if (!activeMilestone) {
    throw new BadRequestError("There is no such Milestone");
  }
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: activeMilestone });
};

const deleteMilestone = async (req, res) => {
  const { milestoneID } = req.body;
  const { _id } = req.user;

  const updated = await User.findOneAndUpdate(
    { _id, milestones: { $elemMatch: { _id: milestoneID } } },
    {
      $pull: { milestones: { _id: milestoneID } },
    }
  ).catch((err) => {
    console.log(err);
  });
  if (!updated) {
    throw new BadRequestError("There is no such task to delete");
  }

  return res.status(StatusCodes.OK).send("Milestones Updated by deleting One");
};

module.exports = {
  createNewMilestone,
  editMilestone,
  getAllMilestones,
  getMilestone,
  deleteMilestone,
};
