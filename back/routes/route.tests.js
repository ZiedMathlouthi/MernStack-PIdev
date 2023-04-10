const express = require('express');

const testsController = require('../controller/controller.tests');
const { authorize, AUTH_ROLES } = require("../middleware/auth");
const { EXPERT, USER } = AUTH_ROLES;

const route = express.Router();

route.post('/addTest', testsController.addTest);


module.exports = route;