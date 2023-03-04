const express = require("express");
const UserController = require("../controllers/UserControllers");
const verifyToken = require("../midleware/AuthMidleware");

const route = express.Router();
route.get("/users", verifyToken, UserController.getAllUsers);
route.get("/normalUser", verifyToken, UserController.getAllNORMALUSER);
route.get("/campany", verifyToken, UserController.getAllCampanys);
route.get("/expert", verifyToken, UserController.getAllExperts);

module.exports = route;
