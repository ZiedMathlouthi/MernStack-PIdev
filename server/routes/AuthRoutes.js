const route = require("express").Router();
var auth = require("../controllers/AuthController.js");
const verifyToken = require("../midleware/AuthMidleware");

// const sendEmail = require("sendEmail");

// var router = express.Router;

const validate = require("../midleware/SchemaValidation.middleware");

const {
  registerValidator,
  loginValidator,
} = require("../validators/user.auth.validators");

//imported validators

// 9odem signUp hatta nchouuf aaleeh l méé yssayviich f DB :=> validate(registerValidator),
route.post("/signup", auth.register);
route.post("/sendMail", auth.sendEmails);
route.post("/signin", validate(loginValidator), auth.signin);
route.post("/reset-password/:id", verifyToken, auth.ResetPassword);
route.post("/forget-password", auth.ForgotPassword);

module.exports = route;
