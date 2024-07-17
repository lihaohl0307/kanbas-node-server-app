import express from "express"
import Hello from "./Hello.js"
import cors from "cors";
import Lab5 from "./Lab5/index.js"
import CourseRoutes from "./Kanbas/Courses/routes.js";

const app = express();
app.use(cors()); // make sure cors is used right after creating the app
app.use(express.json()); // enable the server to parse JSON data from the request body,

CourseRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000) 