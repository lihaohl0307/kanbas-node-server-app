import express from "express"
import Hello from "./Hello.js"
import cors from "cors";
import Lab5 from "./Lab5/index.js"
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js"
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import session from "express-session";
import "dotenv/config";
import QuestionRoutes from "./Kanbas/Questions/routes.js";

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
})); // make sure cors is used right after creating the app

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
    };
  }  
  app.use(
    session(sessionOptions)
  );  

app.use(express.json()); // enable the server to parse JSON data from the request body,

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Kanbas"
mongoose.connect(CONNECTION_STRING);

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
UserRoutes(app);

Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000) 