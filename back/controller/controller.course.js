const Course = require("../models/courses/model.course");
const Chapter = require("../models/courses/model.chapter");
const UserModel = require("../models/model.user");

exports.addCourse = async(req, res) => {

    const chaptersData = req.body.courseContent;
    let arrayOfChapters = [];

    const chapterPromises = chaptersData.map((e)=>{
        const _chapter = new Chapter(e)
        return _chapter.save()
    })

    try {
        arrayOfChapters = await Promise.all(chapterPromises)
    } catch (error) {
        res.status(400).json({message : 'Problem while adding the different Chapters !!!!!!'})
    }
    

    const data = {
        courseName: req.body.courseName,
        courseDescription: req.body.courseDescription,
        listOfRatesCourse: req.body.listOfRatesCourse,
        courseContent: arrayOfChapters,
        courseOwner: req.body.courseOwner,
        courseSubcribed: req.body.courseSubcribed
    }

    const _course = new Course(data);
    _course.save().then(
        (createdCourse) => {
            res.status(200).json({ message : 'Course created successfully....' })
        }
    ).catch(
        (err) => {
            res.status(400).json({ message : 'Failed adding new Course !!!!!!!' })
        }
    )

};

exports.addChapter = async (req, res) => {
    const data = {
        chapterTitle: req.body.chapterTitle,
        chapterParagraphs: req.body.chapterParagraphs
    }

    const _chapter = new Chapter(data);
    _chapter.save().then(
        (createdCourse) => {
            res.status(200).json({ message : 'Chapter created successfully....' })
        }
    ).catch(
        (err) => {
            res.status(400).json({ message : 'Failed adding new Chapter !!!!!!!' })
        }
    )
};

exports.getAllCourses = async (req, res) => {
    try {
        const coursesList = await Course.find({}).then(
            (e)=>{
                res.status(200).send(e)
            }
        ).catch((err)=>{
            res.status(400).json({message:"error while parsing and finding all courses !!!!!"})
        })
    } catch (error) {
        res.status(400).json({ message: "error while getting the list of courses " });
    }
};

exports.getCourseById = async (req, res) => {
    const id = req.body.id;

    try {
        const courseById = await Course.findById(id).then(
            (result) => {
                res.status(200).send(result);
            }
        ).catch(
            (error) => {
                res.status(404).json({message: "Course NOT FOUND"});
            }
        )
    } catch (error) {
        res.status(400).json({message: "failed getting course by id !!!!"})
    }
}

exports.getCourseByOwnerId = async (req, res) => {
    const ownerId = req.body.id;

    try {
        await Course.find({courseOwner : ownerId}).then(
            (result) => {
                res.status(200).send(result);
            }
        ).catch(
            (error) => {
                res.status(404).json({message:"Course NOT FOUND by Owners ID !!!!!"})
            }
        )
    } catch (error) {
        res.status(400).json({message: "failed getting the course by Owner's ID !!!!!"});
    }
}

exports.getCourseBySubscribedId = async (req, res) => {
    const subscribedId = req.body.id;

    try {
        await Course.find({ courseSubcribed: subscribedId }).then(
            (result) => {
                res.status(200).send(result);
            }
        ).catch(
            (error) => {
                res.status(404).json({ message: "Course NOT FOUND by subscribed Id !!!!!!" })
            }
        )
    } catch (error) {
        res.status(400).json({message: "failed getting the course by Subscribed's ID !!!!!"});
    }
}

exports.applyCourse = async (req, res) => {
    const courseId = req.body.courseId;
    const userId = req.body.userId;

    Course.findByIdAndUpdate(courseId, { $push:{ courseSubcribed: userId } }).then(
        (result) => {
            if(result){
                res.status(200).json({ message: `userId ${userId} is just subscribed to courseId ${courseId}` });
            }else{
                res.status(404).json({ message: `courseId ${courseId} NOT FOUND` });
            }
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(400).json({ message: "Failed Subscribing !!!!!" })
        }
    )
}

exports.deleteCourseById = async (req, res) => {
    const id = req.body.id;
    let token = req.header("x-auth-token") || req.headers.authorization;

    if(!token){
        return res.status(401).send("Access denied. No token provided");
    }
    token = token.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email, role } = decoded;
        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(400).send("Invalid token.");
        }else{
            const course = await Course.findById(id);
            if( course.courseOwner.toString() === user.id ){
                const deletedCourse = await Course.findByIdAndDelete(course.id);
                return res.status(200).json({ message: `the course : ${deletedCourse}\n deleted successfully ` });
            }
            return res.status(401).send("Bruuuuh youre not the owner !!!")
        }
    }catch (ex) {
        if(ex.name === "CastError"){
            return res.status(404).json({ msg: "Course NOT FOUND !!!!!!!" });
        }
        return res.status(400).json({ msg: ex });
    }
}

exports.updateCourseById = async (req, res) => {
    const id = req.body.id;
    const updatedCourseContent = req.body.updatedCourseContent;

    let token = req.header("x-auth-token") || req.headers.authorization;
    if(!token){
        return res.status(401).send("Access denied. No token provided");
    }
    token = token.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;
        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(400).send("Invalid token.");
        }else{
            const course = await Course.findById(id);
            if(course.courseOwner.toString() === user.id) {
                const updatedCourse = await Course.findByIdAndUpdate(id,updatedCourseContent);
                return res.status(200).json({ message: `Updated successfully` });
            }
            return res.status(401).send("Bruuuuh youre not the owner !!!");
        }
    } catch (error) {
        if(error.name === "CastError"){
            return res.status(404).json({ msg: "Course NOT FOUND !!!!!!" });
        }
        return res.status(400).json({ msg: error });
    }
}