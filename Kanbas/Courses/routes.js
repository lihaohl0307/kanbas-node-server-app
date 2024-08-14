import * as dao from "./dao.js";
import mongoose  from "mongoose";
import * as userDao from "../../Users/dao.js"

export default function CourseRoutes(app) {
  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = req.body;
    const status = await dao.updateCourse(id, course);
    res.sendStatus(status ? 204 : 404); // Send 404 if update failed
  });

  app.delete("/api/courses/:number", async (req, res) => {
    const { number } = req.params;
    const status = await dao.deleteCourse(number);
    res.sendStatus(status ? 204 : 404); // Send 404 if delete failed
});


  app.post("/api/courses", async (req, res) => {
    const currentUser = req.session.currentUser;
    const course = await dao.createCourse({...req.body, author: currentUser._id});
    res.send(course);
});


  app.get("/api/courses", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      const courses = await dao.findAllCourses();
      res.send(courses);
      return;
  }
    const courses = await dao.findCoursesByAuthor(currentUser._id);
    console.log("qqq")
    console.log(currentUser)
    res.json(courses);
  });

  // get courses in enrollment
  app.get("/api/courses/all", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });


  app.get("/api/courses/:number", async (req, res) => {
    const { number } = req.params;
    console.log("lihao_line_48_start");
    const course = await dao.findCourseByNumber(number);
    if (course) {
        res.send(course);
    } else {
        res.sendStatus(404);
    }
});


app.get("/api/courses/id/:id", async (req, res) => {
  const { id } = req.params;
  console.log("lihao_line_62_start");
  const course = await dao.findCourseById(id);
  const courses = await dao.findAllCourses();
  console.log("lihao_line_62");
  console.log(courses);
    if (course) {
        res.send(course);
    } else {
        res.sendStatus(404);
    }
});


// Enroll in a course
app.post("/api/courses/enroll", async (req, res) => {
  console.log("lihao_line76")
  const currentUser = req.session.currentUser;
  const { courseId } = req.body;
  console.log(currentUser);
  console.log(courseId);

  if (!currentUser) {
    return res.status(401).json({ message: "User not logged in" });
  }


  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  try {
    // Find the user
    const user = await userDao.findUserById(currentUser._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is a student
    if (user.role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can enroll in courses" });
    }

    // Check if the user is already enrolled in the course
    if (user.coursesEnrolled.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Add the course to the user's enrolled courses
    user.coursesEnrolled.push(courseId);
    await user.save();

    res.status(200).json({ message: "Enrolled successfully", user });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ message: "Server error" });
  }
});
}
