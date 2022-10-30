import ProjectModel from "../../../Models/Project/Project.js";
import UserModel from "../../../Models/User/User.js";
import Type from "../../../Models/Project/TypeFilter.js";

// Utils
import createPath from "../../../Utils/User/Project/createPermaPath.js";

class ProjectRepository {

    async existProject(projectName) {
        try {
            let project;

            if (!(project = await ProjectModel.findOne({ project_name: projectName, deleted_at: null })))
                return false;

            return project;
        } catch (e) {
            return false;
        }
    }

    async storageProject(project, username) {

        return await ProjectModel.create({
            project_name: project.project_name.replace(" ", ""),
            project_image: null,
            project_type: project.project_type,
            author_project: username,
            developers_project: [username],
            status_project: "created",
            wanted_developers: project.wanted_developers,
            skills_sought: project.skills_sought,
            update_project: [],
            comments_project: [],
            url_path: createPath(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        });
    }

    async addOneToProjectAndCreateLog(username, projectName) {
        await UserModel.updateOne({ username: username, deleted_at: null, deleted: false },
            { updated_at: new Date(), 
                $push: { update_logs: `create ${projectName.replace(" ", "")} in ${new Date().toISOString()}`, 
                projects: projectName.replace(" ", "") } });
    }

    async getAllTypesFilter() {

        try {

            let typesFilter;

            if (!(typesFilter = await Type.find().sort({ projects_quantity: "descending" })))
                return false;

            return typesFilter;

        } catch (e) {
            return false;
        }

    }

    async getOneType(type) {

        try {
            let typeFilter;

            if (!(typeFilter = await Type.findOne({ type: type })))
                return false;

            return typeFilter;

        } catch (e) {
            return false;
        }

    }

    async addToProject(users, projectName) {
        users.forEach(async (user) => {

            await UserModel.updateOne({ email: user.email, deleted_at: null, deleted: false },
                { $push: { projects: projectName }, updated_at: new Date() });

        });
    }

    async getAllProjectsCreated() {
        try {

            let projects;

            if (!(projects = await ProjectModel.find({status_project: "created"}).sort({created_at: "descending"})))
                return false;

            return projects;

        } catch (err) {
            return false;
        }

    }

    async getAllProjectsFiltered(filter) {

        try {

            let projects;

            if (!(projects = await ProjectModel.find({ project_type: filter.type }).sort({ created_at: filter.date_flow })))
                return false;

            return projects;

        } catch (err) {
            return false;
        }

    }

}

export default new ProjectRepository;