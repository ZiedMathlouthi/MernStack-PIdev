const mongoose = require("mongoose");
const { date } = require("yup");

const userSchema = new mongoose.Schema({
  fullname: String,
  picture: file,
  gender: String,
  birthday: Date,
  email: String,
  password: String,
  experience: [], //periode w societe
  competence: [],
  cv: file,
  university: [String], // user plusieurs university
  open_work: String,
  open_stage: String,
  adress: String,
  city: String,
  certificate: file, // type file upload certif //objet : nom certif , date , societe , url
  role: {
    type: String,
    enum: ["admin", "user", "expert"],
    default: "user",
  },
  activated: {
    type: Boolean, // boolean
    default: false,
  },
});
module.exports = mongoose.model("users", userSchema);
