const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        questionTitle: { type: String, required: true },
        suggestedResponse: [ { type: mongoose.Schema.Types.ObjectId, ref: 'response' } ],
        correctResponse: { type: mongoose.Schema.Types.ObjectId, ref: 'response' }
    }
);

module.exports = mongoose.model('question', questionSchema);