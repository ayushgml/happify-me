const { CustomErrorAPI } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res
      .status(err.StatusCode)
      .json({ success: false, msg: err.message });
  } else if (err.name === "ValidationError") {
    const msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    msg: `something went wrong!! Please Try Again ${err}`,
  });
};

module.exports = errorHandlerMiddleware;
