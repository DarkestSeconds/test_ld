import UserModel from "../../../Models/User/User.js";

class UpdateRepository {

    async ChangeUsernameAndCreateLog(email, newUsername, userLogs) {
        const update = await UserModel.updateOne({ email: email, deleted_at: null, deleted: false }, {
            username: newUsername.replace(" ", ""), update_at: new Date(), 
            $push: { update_logs: `name change in ${new Date().toISOString()}` }, });
    
        if (update.modifiedCount === 1)
            return true;

        return false;
    }
}

export default new UpdateRepository;