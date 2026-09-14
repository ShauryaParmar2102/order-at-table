import express from "express"
import { StaffController } from "../controllers/StaffController.mjs"
import { AuthController } from "../controllers/AuthController.mjs"
import { STAFF_ROLE_MANAGER } from "../models/StaffModel.mjs"

const staffRoutes = express.Router() // Create a router for staff routes

// Display the staff CRUD page
staffRoutes.get(
    ["/", "/:name"],
    AuthController.restrictToStaff([STAFF_ROLE_MANAGER]), // Allow managers to access this route
    StaffController.viewCRUDpage  // Display the staff CRUD page
)

// Handle staff create, update, delete, or clear actions
staffRoutes.post(
    "/",
    AuthController.restrictToStaff([STAFF_ROLE_MANAGER]),  // Allow managers to access this route
    StaffController.handleCRUDAction // Process the selected CRUD action
)

export default staffRoutes // Export the staff routes