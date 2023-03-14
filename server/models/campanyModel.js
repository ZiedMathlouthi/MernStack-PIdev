const mongoose = require("mongoose");

const campanySchema = new mongoose.Schema({
  fullname: String,
  picture: String,
  email: String,
  password: String,
  adress: String,
  city: String,
  webSite: String,
  registerCommerce: String,
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
module.exports = mongoose.model("company", campanySchema);
