const questionModel = require("../models/tests/model.question");
const responseModel = require("../models/tests/model.response");
const testModel = require("../models/tests/model.tests");

exports.addTest = async (req, res) => {
    const questionsData = req.body.listOfQuestions;

    let questionsArray = [];

    const questionsPromises = questionsData.map((e)=>{
        const _question = new questionModel(e)
        return _question.save()
    })

    try {
        questionsArray = await Promise.all(questionsPromises);
    } catch (error) {
        res.status(400).json({message: "error adding different questions " + error})
    }

    const data = {
        testTitle: req.body.testTitle,
        testDescription: req.body.testDescription,
        listOfQuestions: questionsArray,
        testPhoto: req.body.testPhoto,
        testOwner: req.body.testOwner,
        testTimer: req.body.testTimer
    }

    const _test = new testModel(data);
    _test.save().then(
        (createdTest) => {
            res.status(200).json({message:"successs !!!!"})
        }
    ).catch(
        (error) => {
            res.status(400).json({message: "error while pushing test to DB !!!!!" + error})
        }
    )

}