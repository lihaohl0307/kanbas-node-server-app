import moduleModel from "./model.js";

export const findModulesByCourse = (courseId) => moduleModel.find({ course: courseId });

export const findModuleById = (moduleId) => moduleModel.findById(moduleId);

export const createModule = (module) => {
    delete module._id; // Ensure the ID is not included
    return moduleModel.create(module);
};

export const updateModule = (moduleId, module) => moduleModel.updateOne({ _id: moduleId }, { $set: module });

export const deleteModule = (moduleId) => moduleModel.deleteOne({ _id: moduleId });
