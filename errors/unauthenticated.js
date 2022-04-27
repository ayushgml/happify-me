const CustomErrorAPI = require("./customErrorAPI");
const { StatusCodes } = require("http-status-codes");
class UnauthenticatedError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
