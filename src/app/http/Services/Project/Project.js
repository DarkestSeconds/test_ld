// Repositories
import AuthLoginRepository from "../../Repositories/User/AuthLogin.js";
import ProjectRepository from "../../Repositories/Project/Project.js";
import UserRepository from "../../Repositories/User/User.js";

// Utils
import compareSession from "../../../Utils/User/compareSession.js";

class ProjectServices {

    async storageProject(session_id, project, userAgent) {

        let session;

        if (!(session = await AuthLoginRepository.existSession(session_id)))
            return { statuscode: 422, message: { error: "session id is invalid" } };

        if (!compareSession(session, userAgent)) {
            await AuthLoginRepository.disconnectUser(session_id);

            return { statuscode: 403, message: { error: "unauthorized, please re-login" } };
        }

        let user;

        if (!(user = await UserRepository.existEmail(session.email)))
            return { statuscode: 422, message: { error: "your email its invalid" } };

        if (await ProjectRepository.existProject(project.project_name))
            return { statuscode: 400, message: { error: "you are entering an invalid project name" } };

        if (!await ProjectRepository.getOneType(project.project_type))
            return { statuscode: 404, message: { error: "type not found" } };

        let stored;

        if ((stored = await ProjectRepository.storageProject(project, user.username))) {

            await ProjectRepository.addOneToProjectAndCreateLog(user.username, user.update_logs, user.projects, project.project_name);

            return {
                statuscode: 201, message:
                {
                    success: "project created",

                    project_name: stored.project_name,
                    project_image: stored.project_image,
                    project_type: stored.project_type,
                    author_project: stored.author_project,
                    developers_project: stored.developers_project,
                    status_project: stored.status_project,
                    wanted_developers: stored.wanted_developers,
                    skills_sought: stored.skills_sought,
                    url_path: stored.url_path,
                    update_project: stored.update_project,
                    comments_project: stored.comments_project,
                }
            };
        }

        return { statuscode: 422, message: { error: "unable to complete the request" } };
    }

    async getAllProjectsCreated(session_id, userAgent) {

        // let session;

        // if (!(session = await AuthLoginRepository.existSession(session_id)))
        //     return { statuscode: 422, message: { error: "session id is invalid" } };

        // if (!compareSession(session, userAgent))
        //     return;
        let stored = await ProjectRepository.getAllProjectsCreated();
        
        if (stored)
            return {
                statuscode: 200, data: stored.map(
                    project => {
                        return {
                            project_name: project.project_name,
                            project_image: project.project_image,
                            author_project: project.author_project,
                            developers_project: project.developers_project,
                            status_project: project.status_project,
                            wanted_developers: project.wanted_developers,
                            skills_sought: project.skills_sought,
                            url_path: project.url_path,
                            update_project: project.update_project,
                            comments_project: project.comments_project,
                        };
                    })
            };

        return { statuscode: 422, message: { error: "unable to complete the request" } };

    }

    async getAllProjectsFiltered(session_id, userAgent, filter) {

        // let session;

        // if (!(session = await AuthLoginRepository.existSession(session_id)))
        //     return { statuscode: 422, message: { error: "session id is invalid" } };

        // if (!compareSession(session, userAgent))
        //     return;
        let stored = await ProjectRepository.getAllProjectsFiltered(filter);
        if (stored)
            return {
                statuscode: 200, data: stored.map(
                    project => {
                        return {
                            project_name: project.project_name,
                            project_image: project.project_image,
                            author_project: project.author_project,
                            developers_project: project.developers_project,
                            status_project: project.status_project,
                            wanted_developers: project.wanted_developers,
                            skills_sought: project.skills_sought,
                            url_path: project.url_path,
                            update_project: project.update_project,
                            comments_project: project.comments_project,
                        };
                    })
            };

        return { statuscode: 422, message: { error: "unable to complete the request" } };

    }

}

export default new ProjectServices;