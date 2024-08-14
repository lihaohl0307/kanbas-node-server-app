import quizModel from "./model.js";

export const findQuizzesByCourse = (courseId) => quizModel.find({ course: courseId });

export const findQuizById = (quizId) => quizModel.findById(quizId);

export const createQuiz = (quiz) => {
    delete quiz._id; // Ensure the ID is not included
    return quizModel.create(quiz);
};

export const updateQuiz = (quizId, quiz) => quizModel.updateOne({ _id: quizId }, { $set: quiz });

export const deleteQuiz = (quizId) => quizModel.deleteOne({ _id: quizId });
