import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const { cid } = req.params;
        const newQuiz = { ...req.body, course: cid };
        const quiz = await dao.createQuiz(newQuiz);
        res.json(quiz);
    };
    app.post("/api/courses/:cid/quizzes/new", createQuiz);

    const deleteQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.deleteQuiz(qid);
        res.json(status);
    };
    app.delete("/api/quizzes/:qid", deleteQuiz);

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    };
    app.put("/api/quizzes/:qid", updateQuiz);


    const findQuizzesByCourse = async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesByCourse(cid);
        res.json(quizzes);
    };
    app.get("/api/courses/:cid/quizzes", findQuizzesByCourse);

    const findQuizById = async (req, res) => {
        const { cid, qid } = req.params;
        const quiz = await dao.findQuizById(qid);
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    };
    app.get("/api/courses/:cid/quizzes/:qid", findQuizById);
}




// import db from "../Database/index.js";

// export default function QuizRoutes(app) {
//   app.put("/api/courses/:cid/quizzes/:qid", (req, res) => {
//     const { qid } = req.params;
//     const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
    
//     if (quizIndex === -1) {
//       console.error(`Quiz with id ${qid} not found`);
//       return res.status(404).send({ error: 'Quiz not found' });
//     }

//     db.quizzes[quizIndex] = {
//       ...db.quizzes[quizIndex],
//       ...req.body,
//     };
//     res.sendStatus(204);
//   });

//   app.delete("/api/quizzes/:qid", (req, res) => {
//     const { qid } = req.params;
//     db.quizzes = db.quizzes.filter((q) => q._id !== qid);
//     res.sendStatus(200);
//   });

//   app.post("/api/courses/:cid/quizzes/new", (req, res) => {
//     const { cid } = req.params;
//     const newQuiz = {
//       ...req.body,
//       course: cid,
//       _id: new Date().getTime().toString(),
//     };
//     db.quizzes.push(newQuiz);
//     res.send(newQuiz);
//   });

//   app.get("/api/courses/:cid/quizzes", (req, res) => {
//     const { cid } = req.params;
//     const quizzes = db.quizzes.filter((q) => q.course === cid);
//     res.json(quizzes);
//   });

//   app.get("/api/courses/:cid/quizzes/:qid", (req, res) => {
//     const { cid, qid } = req.params;
//     const quiz = db.quizzes.find((q) => q.course === cid && q._id === qid);
    
//     if (quiz) {
//       res.json(quiz);
//     } else {
//       res.status(404).json({ message: "Quiz not found" });
//     }
//   });
// }
