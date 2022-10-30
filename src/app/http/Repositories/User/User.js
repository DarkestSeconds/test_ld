import UserModel from "../../../Models/User/User.js";

import {hash} from "bcrypt";

class UserRepository {

    async existEmail(email) {
        try {
            
            let user;

            if (! (user = await UserModel.findOne({ email: email, deleted_at: null, deleted: false })))
                return false;
        
            return user;

        } catch(e) {
            return false;
        }
    }

    async existUsername(username) {
        try {

            let user;
    
            if (! (user = await UserModel.findOne({ username: username, deleted_at: null, deleted: false })) ) 
                return false;
    
            return user;
        } catch (e) {
            return false;
        }
    }

    async storage(user) {

        return await UserModel.create({
            full_name: user.full_name, 
			username: user.username.replace(" ", ""),
			email: user.email,
			email_verified: false,
			password: await hash(user.password, 10),
			genre: user.genre,
			birth_date: new Date(user.birth_date),
			resident_country: user.resident_country,
			developer_title: user.developer_title,
			developer_skills: user.developer_skills,
			user_reputation: 1000,
			reports: [],
			projects: [],
			friends: [],
			permissions: [],
			linked_networks: [],
			created_at: new Date(),
			update_at: new Date(),
			update_logs: [ `account created in ${new Date().toISOString()}` ],
			deleted: false,
			deleted_at: null,
        });
    }
}

export default new UserRepository;