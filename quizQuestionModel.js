const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  category :{type:String,  required: true},
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

const quizquestion = mongoose.model('quizquestion', quizQuestionSchema);

module.exports = quizquestion;