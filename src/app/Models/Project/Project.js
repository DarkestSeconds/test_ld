import mongoose from "mongoose";

const Schema = mongoose.Schema;

const project = new Schema({

    project_name: { type: String, required: true },
    project_image: { type: String },
    project_type: { type: String, required: true },
    author_project: { type: String, required: true },
    developers_project: { type: Array, required: true },
    status_project: { type: String, required: true },
    wanted_developers: { type: Array, required: true },
    likes_project: { type: Number, required: true },
    skills_sought: { type: Array, required: true },
    update_project: { type: Array, required: true },
    comments_project: { type: Array, required: true },
    url_path: { type: String, required: true },
    created_at: { type: Date, default: Date.now, required: true },
    updated_at: { type: Date, required: true },
    deleted_at: { type: Date }

});

export default mongoose.model("project", project);