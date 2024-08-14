import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  quizId: { type: String, required: true }, // Reference to a Quiz
  courseId: { type: String, required: true }, // Reference to a Course
  title: { type: String, required: false },
  type: { type: String, 
    enum: ['Multiple Choice', 'True/False', 'Fill in the Blanks'], 
    required: false },
  questionText: { type: String, required: false },  // WYSIWYG content
  options: { type: [String], required: false },     // For Multiple Choice and Fill in the Blanks
  correctOption: { type: Number, required: false }, // Index of the correct option for Multiple Choice
  points: { type: Number, required: false },
}, { collection: "questions" });

export default questionSchema;
