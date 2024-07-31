import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    module: { type: String, required: true }
}, { _id: false });

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    courseNumber: { type: String, required: true, 
        ref: 'Course' }, 
    lesson: [lessonSchema]
}, { collection: "modules" })
export default moduleSchema;
