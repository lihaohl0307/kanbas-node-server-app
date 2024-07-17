import PathParameters from "./PathParameters.js"; // need to add .js after filename
import QueryParameters from "./QueryParameters.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import ModuleObjects from "./module/index.js";

export default function Lab5(app) {
    app.get('/lab5/welcome', (req, res) => {
        res.send('Welcome to Lab5!')
    });
    PathParameters(app);
    QueryParameters(app);
    WorkingWithObjects(app);
    ModuleObjects(app);
    WorkingWithArrays(app);
}