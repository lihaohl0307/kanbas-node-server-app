import mongoose from "mongoose";
import quizSchema from "./schema.js";

const quizModel = mongoose.model("quizModel", quizSchema);
export default quizModel;
