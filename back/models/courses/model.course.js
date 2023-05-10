const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const courseSchema = new Schema (
    {
        courseName: { type: String, required: true },
        courseDescription: { type: String, required: true },
        listOfRatesCourse: {
            type: [{
              type: Number,
              min: 1,
              max: 5
            }],
            default: [],
        },
        courseContent: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'chapterModel'
            }
        ],
        coursePhoto: { type: String, default: null }, // when you change this go the controller and change
        courseOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'expert', required: true},
        courseSubcribed: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            }
        ],
        courseQuizz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'test',
            default: null
        },
        courseCategory: [String]
    }
);

module.exports = mongoose.model('courses', courseSchema);