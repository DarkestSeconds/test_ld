import express from "express";

const server = express();

const port = 8080;

// Database Connection
import "./database/connection.js";

// Application Import
import Application from "./app/app.js";
Application(server, express);

// server listening
server.listen(process.env.PORT || port, () => {
	console.log(`Server listening on port: ${process.env.PORT || port} 🤖`)
});