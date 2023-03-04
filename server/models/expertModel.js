const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  fullname: String,
  picture: String,
  gender: String,
  birthday: String,
  email: String,
  password: String,
  experience: [],
  competence: String,
  adress: String,
  city: String,
  certificate: String,
  role: {
    type: String,
    enum: ["admin", "user", "expert", "campany"],
    default: "user",
  },
  activated: {
    type: String,
    default: false,
  },
});
module.exports = mongoose.model("expert", expertSchema);
