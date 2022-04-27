const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
require("dotenv").config();

/* Authentication Middleware -> Used To verify user or organizer and adds the corresponding object property "user/organizer" and gives control to next middleware/controller*/
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No Token in Request");
  }
  // auth header = 'Bearer <Token>'
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id, username, role } = decoded;
    // add user to request object
    if (role === "user") {
      req.user = { _id, username, role };
    } else if (role === "organizer") {
      req.organizer = { _id, username, role };
    }
    next();
  } catch (err) {
    console.log(err);
    throw new UnauthenticatedError("Invalid Token");
  }
};

module.exports = authenticationMiddleware;
