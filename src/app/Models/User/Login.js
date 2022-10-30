import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Model
const Login = new Schema({

	email: { type: String, required: true },
	address_ip: { type: String, required: true },
	user_agent: { type: String, required: true },
	session_id: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	disconnected_in: { type: Date }
    
});

export default mongoose.model("Login", Login);