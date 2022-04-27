const CustomErrorAPI = require("./customErrorAPI");
const { StatusCodes } = require("http-status-codes");
class BadRequestError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
