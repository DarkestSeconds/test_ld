// Repositories
import UserRepository from "../../Repositories/User/User.js";
import AuthLoginRepository from "../../Repositories/User/AuthLogin.js";

// Utils
import ComparePassword from "../../../Utils/User/ComparePassword.js";

class AuthLoginServices {

    async createSession(email, password, userAgent) {

        let user;

        if (! (user = await UserRepository.existEmail(email)) )
            return { statuscode: 422, message: { error: "email invalid" } };

        await AuthLoginRepository.ammountSession(user.email);

        if (! await ComparePassword(password, user.password) )
            return { statuscode: 403, message: { error: "invalid credentials" } };

        let session;

        if ( (session = await AuthLoginRepository.createSession(user.email, userAgent)) )
            return { statuscode: 200, 
                message: { session: { email: session.email, session_id: session.session_id, created_at: session.created_at } } }; 

        return { statuscode: 422, message: { error: "unable to complete the request" } };
    }
}

export default new AuthLoginServices;