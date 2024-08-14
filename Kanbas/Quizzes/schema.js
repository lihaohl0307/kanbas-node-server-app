import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    course: { type: String, required: true, ref: 'Course' }, 

    title: { type: String },
    description: { type: String },
    // questions: [questionSchema],
    quizType: { type: String, required: true },
    points: { type: Number, required: true },
    assignmentGroup: { type: String },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Number, default: 1 }, // Changed to Number for the count of attempts
    showCorrectAnswers: { 
        type: String, 
        enum: ["Immediately", "After First Attempt", "After Quiz Ends", "Never"], 
        default: "Immediately" 
    }, 
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date },
    availableFrom: { type: Date },
    availableUntil: { type: Date },
    isPublished: { type: Boolean, default: false },
  }, { collection: "quizzes" });
  
export default quizSchema;