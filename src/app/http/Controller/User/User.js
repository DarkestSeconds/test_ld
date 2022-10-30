import UserServices from "../../Services/User/User.js";

class UserController {

    async store(req, res) {
        let user = {
			full_name: req.body.full_name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			genre: req.body.genre,
			birth_date: req.body.birth_date,
			resident_country: req.body.resident_country,
			developer_title: req.body.developer_title,
			developer_skills: req.body.developer_skills,
		};

        const storage = await UserServices.store(user);

        return res.status(storage.statuscode).json(storage.message); 
    }

    async profile(req, res) {
        const userAgent = req.headers["user-agent"];
        const { session_id } = req.headers;

        const profile = await UserServices.profile(session_id, userAgent);

        return res.status(profile.statuscode).json(profile.message); 
    }

    async seeOtherUsersProfile(req, res) {
        const userAgent = req.headers["user-agent"];
        const { session_id } = req.headers;
        const { username } = req.params;

        const otherProfile = await UserServices.seeOtherUsersProfile(session_id, username, userAgent);

        return res.status(otherProfile.statuscode).json(otherProfile.message); 
    }
}

export default new UserController;