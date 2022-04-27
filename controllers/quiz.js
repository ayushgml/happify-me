const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/user");
const postScore = async (req, res) => {
  const { quizId, score, remarks, KEYWORDS } = req.body;
  const { _id } = req.user;

  if (quizId < 1 || quizId > 4) {
    throw new BadRequestError("Quiz Id parameter is wrong");
  }
  const quizProperty = "quizCat" + quizId.toString();
  //   [] stands for dynamic property name
  await User.findByIdAndUpdate(_id, {
    $push: { [quizProperty]: { score, remarks } },
  });

  // This Following part is for updating keyword status
  // Done Separately as both are different kind of properties the other is a read only array while this is a rd_wr array
  const user = await User.findById(_id);

  let keys = user.keywords;

  if (keys) {
    for (prop in KEYWORDS) {
      keys[prop] = keys[prop] + KEYWORDS[prop];
    }
  } else {
    // Initialization of db param keyword -> Not sure if initialization happens without it
    keys = KEYWORDS;
  }

  await User.findByIdAndUpdate(_id, {
    $set: { keywords: keys },
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", data: { score, remarks, keys } });
};

const getScore = async (req, res) => {
  const { quizId } = req.query;
  const { _id } = req.user;

  if (quizId < 1 || quizId > 4) {
    throw new BadRequestError("Quiz Id parameter is wrong");
  }

  const quizProperty = "quizCat" + quizId.toString();
  const user = await User.findOne({ _id });
  return res
    .status(StatusCodes.OK)
    .json({ status: "success", data: { scoreArr: user[quizProperty] } });
};
module.exports = { postScore, getScore };
