const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const testSchema = new Schema(
    {
        testTitle: { type: String, required: true },
        testDescription: { type: String, required: true },
        listOfQuestions: [
            { type: mongoose.Schema.Types.ObjectId }
        ],

        listOfRatesTest: {
            type: [{
              type: Number,
              min: 1,
              max: 5
            }],
            default: [],
        },
        
        testPhoto: String, //when you change this go to the controller and change
        testOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'expert', required: true },
        testTimer: { type: Number, default: 15 },

    }
)


module.exports = mongoose.model('test', testSchema);