const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: String,
  picture: String,
  gender: String,
  birthday: String,
  email: String,
  password: String,
  experience: [],
  competence: String,
  cv: String,
  university: String,
  open_work: String,
  open_stage: String,
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
  verified : Boolean
});
module.exports = mongoose.model("users", userSchema);
