import {Router} from "express";

export const userRoutes = Router();

import UserController from "../../http/Controller/User/User.js";
import AuthLoginController from "../../http/Controller/User/AuthLogin.js";
import UpdateController from "../../http/Controller/User/Update.js";

import UserRequest from "../../http/Request/User/User.js";
import AuthLoginRequest from "../../http/Request/User/AuthLogin.js";
import UpdateRequest from "../../http/Request/User/Update.js";

userRoutes.post("/sign-up", UserRequest.validateStorage, UserController.store );
userRoutes.post("/sign-in", AuthLoginRequest.validateCreateSession, AuthLoginController.createSession );

userRoutes.get("/profile", UserRequest.validateSeeProfile, UserController.profile );
userRoutes.get("/user/:username", UserController.seeOtherUsersProfile );

userRoutes.patch("/change-name", UpdateRequest.validateUpdateUsername, UpdateController.ChangeUsername );