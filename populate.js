/* Populate Function For Database */
/* Used Only While in Development */

require("dotenv").config();
const connectDb = require("./db/connect");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

const users = require("./users.json");

const newUsers = users.map(async (each) => {
  await bcrypt.hash(each.password, 12).then((value) => {
    each.password = value;
  });
  console.log(each);
  return each;
});
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await User.deleteMany();
    await User.create(users);
    console.log("populate success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
