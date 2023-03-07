const route = require("express").Router();
var auth = require("../controllers/AuthController.js");
const verifyToken = require("../midleware/AuthMidleware");
// const sendEmail = require("sendEmail");

// var router = express.Router;

route.post("/signup", auth.register);
route.post("/sendMail", auth.sendEmails);
route.post("/signin", auth.signin);
route.post("/reset-password/:id", verifyToken, auth.ResetPassword);
route.post("/forget-password", auth.ForgotPassword);


module.exports = route;
