import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Type = new Schema({
    name_type: { type: String, required: true },
    type: { type: String, required: true },
    projects_quantity: { type: Number, required: true},
    created_at: { type: Date, required: true },
});

export default mongoose.model("typesProject", Type);
