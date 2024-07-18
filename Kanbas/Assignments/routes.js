import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
    app.put("/api/courses/:cid/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
          (a) => a._id === aid);
        
        if (assignmentIndex === -1) {
            console.error(`Assignment with id ${aid} not found`);
            return res.status(404).send({ error: 'Assignment not found' });
        }

        db.assignments[assignmentIndex] = {
          ...db.assignments[assignmentIndex],
          ...req.body
        };
        res.sendStatus(204);
      });

    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
      });    
    
    app.post("/api/courses/:cid/assignments/new", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
          ...req.body,
          course: cid,
          _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
      });
    
    
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.json(assignments);
    })

    app.get("/api/courses/:cid/assignments/:aid", (req, res) => {
        const { cid, aid } = req.params;
        const assignment = db.assignments.find((a) => a.course === cid && a._id === aid);
        
        if (assignment) {
            res.json(assignment);
        } else {
            res.status(404).json({ message: "Assignment not found" });
        }
    });
}