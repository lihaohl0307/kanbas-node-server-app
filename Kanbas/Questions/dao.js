import QuestionModel from "./model.js";

// Create a new question
export const createQuestion = async (question) => {
    const newQuestion = await QuestionModel.create(question);
    return newQuestion;
};

// Find all questions for a specific quiz
export const findQuestionsForQuiz = async (quizId) => {
    const questions = await QuestionModel.find({ quizId });
    return questions;
};

// Find a specific question by quiz ID and question ID
export const findQuestionById = async (quizId, questionId) => {
    const question = await QuestionModel.findOne({ _id: questionId, quizId });
    return question;
};

// Update a specific question
export const updateQuestion = async (questionId, questionUpdates) => {
    const updatedQuestion = await QuestionModel.updateOne(
        { _id: questionId },
        { $set: questionUpdates }
    );
    return updatedQuestion;
};

// Delete a specific question
export const deleteQuestion = async (questionId) => {
    const status = await QuestionModel.deleteOne({ _id: questionId });
    return status;
};
