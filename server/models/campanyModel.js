const mongoose = require("mongoose");

const campanySchema = new mongoose.Schema({
  fullname: String,
  picture: file,
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
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("company", campanySchema);
