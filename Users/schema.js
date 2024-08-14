import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const QuizAttemptSchema = new Schema({
  quizId: { type: Types.ObjectId, ref: 'Quiz' },
  answers: Map, // Store questionId -> selectedAnswer
  score: Number,
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY"], required: true
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
    coursesEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId, 
      }
    ],
    quizAttempts: [QuizAttemptSchema],
  },
  { collection: "users" }
);
export default userSchema;