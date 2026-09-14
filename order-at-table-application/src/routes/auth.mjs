import express from "express" // Import Express

import {AuthController} from "../controllers/AuthController.mjs" // Import the authentication controller

const authenticationRoutes = express.Router() // Create a router for authentication routes

authenticationRoutes.get("/login", AuthController.viewLoginPage) // Show the login page

authenticationRoutes.post("/login", AuthController.loginUser) // Handle a login form submission

authenticationRoutes.post("/logout", AuthController.hasSession, AuthController.logoutUser) // Log the user out after checking that they have a valid session

export default authenticationRoutes // Export the authentication routes so the server can use them
