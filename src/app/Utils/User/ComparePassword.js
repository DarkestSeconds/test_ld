import {compare} from "bcrypt";

export default function comparePassword(password, hash) {
    return compare(password, hash);
}