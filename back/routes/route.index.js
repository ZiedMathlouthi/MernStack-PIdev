const express = require("express");
const adminRouter = require("./route.admin");
const authRouter = require("./route.auth");
const userRouter = require("./route.user");
const meetingRouter = require("./route.meet");
const offersRouter = require("./route.offre");
const offerRouter = require("./route.offre");

const courseRouter = require("./route.course");
const testsRouter = require("./route.tests");


const router = express.Router();
const postRouter = require("./route.post");
const uploadRouter = require("./route.upload");

router.get("/", (req, res) => {
  res.status(200).json("Backend server working properly! 🙌 ");
});

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/meet", meetingRouter);
router.use("/offer", offersRouter);
router.use("/post", postRouter);
router.use("/upload", uploadRouter);

router.use("/offers", offerRouter);

router.use("/courses",courseRouter);
router.use("/tests", testsRouter);

module.exports = router;
