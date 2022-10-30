import AuthLoginRepository from "../../Repositories/User/AuthLogin.js";
import UserRepository from "../../Repositories/User/User.js";
import UpdateRepository from "../../Repositories/User/Update.js";

import compareSession from "../../../Utils/User/compareSession.js";

class UpdateServices {

    async updateUsername(session_id, newUsername, userAgent) {

        let session;

        if (! (session = await AuthLoginRepository.existSession(session_id)) )
            return { statuscode: 422, message: { error: "session id is invalid" } }; 

        if (! compareSession(session, userAgent) ) {

            await AuthLoginRepository.disconnectUser(session_id);
        
            return { statuscode: 403, message: { error: "unauthorized, please re-login" } }; 
        }

        let user;

        if (! (user = await UserRepository.existEmail(session.email)) )
            return { statuscode: 422, message: { error: "your email its invalid" } };


        if ( user.username === newUsername )
            return { statuscode: 400, message: { error: "you are trying to change your account name to the same name" } };


        if ( await UpdateRepository.ChangeUsernameAndCreateLog(user.email, newUsername, user.update_logs) )
            return { statuscode: 204, message: { success: " " } };
        
        return { statuscode: 422, message: { error: "unable to complete the request" } };
    }
}

export default new UpdateServices;