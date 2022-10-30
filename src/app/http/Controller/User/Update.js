import UserServices from "../../Services/User/Update.js";

class UpdateController {

    async ChangeUsername(req, res) {
        const userAgent = req.headers["user-agent"];
        const { session_id } = req.headers;
        const { new_name } = req.body;

        const update = await UserServices.updateUsername(session_id, new_name, userAgent);

        return res.status(update.statuscode).json(update.message); 
    }

}

export default new UpdateController;