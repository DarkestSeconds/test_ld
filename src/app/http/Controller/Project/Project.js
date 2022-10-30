import ProjectServices from "../../Services/Project/Project.js";

class ProjectController {

    async storageProject(req, res) {
        const userAgent = req.headers["user-agent"];
        const { session_id } = req.headers;
        const project = {
            project_name: req.body.project_name,
            project_type: req.body.project_type,
            wanted_developers: req.body.wanted_developers,
            skills_sought: req.body.skills_sought,
        };

        const projectStored = await ProjectServices.storageProject(session_id, project, userAgent);

        return res.status(projectStored.statuscode).json(projectStored.message);
    }

    async getAllProjectsCreated(req, res) {
        const userAgent = req.headers["user-agent"];
        const { session_id } = req.headers;

        const projects = await ProjectServices.getAllProjectsCreated(session_id, userAgent);

        res.send(projects);
    }

    async getAllProjectsFiltered(req, res) {
        const userAgent = req.headers["user-agent"];
        const { session_id } = req.headers;
        const { type, date_flow } = req.params;

        const projectsFiltered = await ProjectServices.getAllProjectsFiltered(session_id, userAgent, { type, date_flow });

        res.status(projectsFiltered.statuscode).json({
            data: projectsFiltered.data,
            message: projectsFiltered.message
        });

    }

}

export default new ProjectController;