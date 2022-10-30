import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({

    full_name: { type: String, required: true, },
	username: { type: String, required: true },
	email: { type: String,required: true },
	email_verified: { type: Boolean, required: true },
	password: { type: String, required: true },
	avatar_url: { type: String, required: false },
	genre: { type: String, required: true },
	birth_date: { type: Date, required: true },
	resident_country: { type: String, required: true },
	developer_title: { type: String, required: true },
	developer_skills: { type: Array, required: true },
	user_reputation: { type: Number, required: true },
	reports: { type: Array, required: true },
	projects: { type: Array, required: true },
	friends: { type: Array, required: true },
	permissions: { type: Array, required: true },
	linked_networks: { type: Array, required: true },
	created_at: { type: Date, default: Date.now, required: true },
	update_at: { type: Date, required: true },
	update_logs: { type: [String] },
	deleted: { type: Boolean, required: true },
	deleted_at: { type: Date, default: Date.now }
});

export default mongoose.model("Users", User);