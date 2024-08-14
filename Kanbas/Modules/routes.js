import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
    const createModule = async (req, res) => {
      const { cid } = req.params;
      const newModule = { ...req.body, course: cid };
      const module = await dao.createModule(newModule);
      res.json(module);
    };
    app.post("/api/courses/:cid/modules", createModule);

    const deleteModule = async (req, res) => {
      const { mid } = req.params;
      const status = await dao.deleteModule(mid);
      res.json(status);
    };
    app.delete("/api/modules/:mid", deleteModule);
    
    const updateModule = async (req, res) => {
      const { mid } = req.params;
      const status = await dao.updateModule(mid, req.body);
      res.json(status);
  };
  app.put("/api/modules/:mid", updateModule);
    
    const findModulesByCourse = async (req, res) => {
      const { cid } = req.params;
      const modules = await dao.findModulesByCourse(cid);
      console.log(modules);
      res.json(modules);
    };
    app.get("/api/courses/:cid/modules", findModulesByCourse);

}
