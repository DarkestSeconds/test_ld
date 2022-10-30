
import {randomUUID} from "crypto";
import ip from "ip";

// Models
import LoginModel from "../../../Models/User/Login.js"; 

class AuthLoginRepository {

    async ammountSession(email) {
        const sessions = await LoginModel.find({ email: email, disconnected_in: null });

        if ( sessions.length > 0 )
            sessions.forEach(async (session) => {
                await LoginModel.updateOne({ session_id: session.session_id }, { disconnected_in: new Date() });
            });
    }

    async createSession(email, userAgent) {
        return await LoginModel.create({
            email: email,
            address_ip: ip.address(),
            user_agent: userAgent,
            session_id: randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
            disconnected_in: null
        });
    }

    async existSession(session_id) {
        const session = await LoginModel.findOne({ session_id: session_id, disconnected_in: null });
    
        if (! session )
            return false;

        return session;
    }

    async disconnectUser(session_id) {
        await LoginModel.updateOne({ session_id: session_id, disconnected_in: null }, 
            { disconnected_in: new Date(), updated_at: new Date() });
    }
}

export default new AuthLoginRepository;