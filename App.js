import express from "express"
import Hello from "./Hello.js"
import cors from "cors";
import Lab5 from "./Lab5/index.js"
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors()); // make sure cors is used right after creating the app
app.use(express.json()); // enable the server to parse JSON data from the request body,

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);

Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000) 