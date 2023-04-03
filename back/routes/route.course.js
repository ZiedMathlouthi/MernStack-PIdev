const express = require('express');

const courseController = require('../controller/controller.course');
const { authorize, AUTH_ROLES } = require("../middleware/auth");
const { EXPERT, USER } = AUTH_ROLES;

const route = express.Router();

route.post('/addCourse', authorize([EXPERT]), courseController.addCourse);
route.post('/addChapter', authorize([EXPERT]), courseController.addChapter);
route.get('/getAllCourses', courseController.getAllCourses);
route.get('/getCourseById', courseController.getCourseById);
route.get('/getCourseByOwnerId', courseController.getCourseByOwnerId);
route.get('/getCourseBySubscribedId', courseController.getCourseBySubscribedId);
route.put('/applyToCourse', authorize([USER]) , courseController.applyCourse);

route.post('/deleteCourseById', courseController.deleteCourseById);
route.put('/updateCourseById', courseController.updateCourseById);


module.exports = route;