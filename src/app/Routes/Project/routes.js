import {Router} from "express";

export const projectRoutes = Router();

// Controllers
import ProjectController from "../../http/Controller/Project/Project.js";

// Request
import ProjectRequest from "../../http/Request/Project/Project.js";

projectRoutes.post("/new-project", ProjectRequest.validateCreateProject, ProjectController.storageProject);

projectRoutes.get("/projects", ProjectController.getAllProjectsCreated);

projectRoutes.get("/projects/filter", ProjectRequest.validateGetAllProjectsFiltered, ProjectController.getAllProjectsFiltered);


