import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    module: { type: String, required: true }
}, { _id: false });

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    course: { type: String, required: true,  // courseNumber
        ref: 'Course' }, 
    lesson: [lessonSchema]
}, { collection: "modules" })
export default moduleSchema;
