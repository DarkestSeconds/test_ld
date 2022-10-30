// Repository
import UserRepository from "../../Repositories/User/User.js";
import AuthLoginRepository from "../../Repositories/User/AuthLogin.js";

// Utils
import compareSession from "../../../Utils/User/compareSession.js";

class UserServices {
    
    async store(user) {

        if ( await UserRepository.existEmail(user.email) )
            return { statuscode: 422, message: { error: "invalid credentials" } };

        if ( await UserRepository.existUsername(user.username) )
            return { statuscode: 422, message: { error: "user name already exists" } }; 

        let stored;

        if ( (stored = await UserRepository.storage(user)) ) {
			return { statuscode: 201, message: { 
				success: "account created",
				user: {
					full_name: stored.full_name,
					username: stored.username,
					email: stored.email,
					genre: stored.genre,
					birth_date: stored.birth_date,
					resident_country: stored.resident_country,
					developer_title: stored.developer_title,
					developer_skills: stored.developer_skills,
				}
			}};
		}

        return { statuscode: 422, message: { error: "unable to complete the request" } };
    }

    async profile(session_id, userAgent) {

        let session;

        if (! (session = await AuthLoginRepository.existSession(session_id)) )
            return { statuscode: 422, message: { error: "session id is invalid" } }; 

        if (! compareSession(session, userAgent) ) {

            await AuthLoginRepository.disconnectUser(session_id);

            return { statuscode: 403, message: { error: "unauthorized, please re-login" } }; 
        }

        let user;

        if ( ( user = await UserRepository.existEmail(session.email) ) )
            return { statuscode: 200, message: { 
                user: {
                    full_name: user.full_name,
                    username: user.username,
                    email: user.email,
                    email_verified: user.email_verified,
                    genre: user.genre,
                    birth_date: user.birth_date,
                    resident_country: user.resident_country,
                    developer_title: user.developer_title,
                    developer_skills: user.developer_skills,
                    user_reputation: user.user_reputation,
                    reports: user.reports,
                    projects: user.projects,
                    friends: user.friends,
                    permissions: user.permissions,
                    linked_networks: user.linked_networks,
                    created_at: user.created_at,
                    update_at: user.update_at,
                    update_logs: user.update_logs,
                }
            }};

        return { statuscode: 422, message: { error: "unable to complete the request" } };
    }

    async seeOtherUsersProfile(session_id, username, userAgent) {

        let session;

        if (! (session = await AuthLoginRepository.existSession(session_id)) ) 
            return { statuscode: 422, message: { error: "session id is invalid" } }; 

        if (! compareSession(session, userAgent) ) {

            await AuthLoginRepository.disconnectUser(session_id);

            return { statuscode: 403, message: { error: "unauthorized, please re-login" } }; 
        }

        let user;

        if ( (user = await UserRepository.existUsername(username)) )
            return { statuscode: 200, message: { user: {

                username: user.username,
                genre: user.genre,
                birth_date: user.birth_date,
                resident_country: user.resident_country,
                developer_title: user.developer_title,
                developer_skills: user.developer_skills, 
                user_reputation: user.user_reputation,
                projects: user.projects,
                friends: user.friends,
                linked_networks: user.linked_networks,
                created_at: user.created_at,
            }}};

        return { statuscode: 422, message: { error: "unable to complete the request" } };
    }
}

export default new UserServices;