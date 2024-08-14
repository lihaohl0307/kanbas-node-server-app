import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    
    const createQuestion = async (req, res) => {
        const { courseId, quizId } = req.params;
        const newQuestion = { ...req.body, courseId, quizId };
        const question = await dao.createQuestion(newQuestion);
        res.json(question);
    };
    app.post("/api/courses/:courseId/quizzes/:quizId/questions/new", createQuestion);

    const findQuestionsForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.findQuestionsForQuiz(quizId);
        res.json(questions);
    };
    app.get("/api/courses/:courseId/quizzes/:quizId/questions", findQuestionsForQuiz);

    const findQuestionById = async (req, res) => {
        const { quizId, qsid } = req.params;
        const question = await dao.findQuestionById(quizId, qsid);
        if (question) {
            res.json(question);
        } else {
            res.status(404).json({ message: "Question not found" });
        }
    };
    app.get("/api/courses/:courseId/quizzes/:quizId/questions/:qsid", findQuestionById);

    const updateQuestion = async (req, res) => {
        const { qsid } = req.params;
        const status = await dao.updateQuestion(qsid, req.body);
        res.json(status);
    };
    app.put("/api/courses/:courseId/quizzes/:quizId/questions/:qsid", updateQuestion);

    const deleteQuestion = async (req, res) => {
        const { qsid } = req.params;
        const status = await dao.deleteQuestion(qsid);
        res.json(status);
    };
    app.delete("/api/questions/:qsid", deleteQuestion);
}




// import db from "../Database/index.js";

// export default function QuestionRoutes(app) {
//     // Update a specific question
//     app.put("/api/courses/:courseId/quizzes/:quizId/questions/:qsid", (req, res) => {
//         console.log("Update a specific question")
//         const { qsid } = req.params;
//         const questionIndex = db.questions.findIndex((q) => q._id === qsid);
        
//         if (questionIndex === -1) {
//             console.error(`Question with id ${qsid} not found`);
//             return res.status(404).send({ error: 'Question not found' });
//         }

//         db.questions[questionIndex] = {
//           ...db.questions[questionIndex],
//           ...req.body
//         };
//         res.sendStatus(204);
//     });

//     // Delete a specific question
//     app.delete("/api/questions/:qsid", (req, res) => {
//         console.log("Delete a specific question")

//         const { qsid } = req.params;
//         db.questions = db.questions.filter((q) => q._id !== qsid);
//         res.sendStatus(200);
//     });

//     // Create a new question for a specific quiz
//     app.post("/api/courses/:courseId/quizzes/:quizId/questions/new", (req, res) => {
//         console.log("Create a new question for a specific quiz")
//         const { courseId, quizId } = req.params;
//         const newQuestion = {
//           ...req.body,
//           quizId: quizId,
//           course: courseId,
//           _id: new Date().getTime().toString(),
//         };
//         db.questions.push(newQuestion);
//         res.send(newQuestion);
//     });

//     // Get all questions for a specific quiz
//     app.get("/api/courses/:courseId/quizzes/:quizId/questions", (req, res) => {
//         console.log("Get all questions for a specific quiz")

//         const { quizId } = req.params;
//         console.log(db.questions)
//         const questions = db.questions.filter((q) => q.quizId === quizId);
//         res.json(questions);
//     });

//     // Get a specific question by quiz ID and question ID
//     app.get("/api/courses/:courseId/quizzes/:quizId/questions/:qsid", (req, res) => {
//         console.log("Get a specific question by quiz ID and question ID")

//         const { quizId, qsid } = req.params;
//         const question = db.questions.find((q) => q.quiz === quizId && q._id === qsid);
        
//         if (question) {
//             res.json(question);
//         } else {
//             res.status(404).json({ message: "Question not found" });
//         }
//     });
// }
