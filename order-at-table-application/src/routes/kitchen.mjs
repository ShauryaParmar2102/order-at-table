import express from "express"
import { KitchenController } from "../controllers/KitchenController.mjs"
import { AuthController } from "../controllers/AuthController.mjs"
import { STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER, STAFF_ROLE_WAIT } from "../models/StaffModel.mjs";

const kitchenRoutes = express.Router() // Create a router for kitchen routes


kitchenRoutes.use(AuthController.hasSession); // Require a valid session for all kitchen routes

// Display the kitchen page
kitchenRoutes.get(
    "/",
    AuthController.restrictToStaff([STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER]), // Allow kitchen staff and managers to access this route
    KitchenController.viewKitchenPage // Display the kitchen page
);
// Get the kitchen queue
kitchenRoutes.get(
    "/queue",
    AuthController.restrictToStaff([STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER]), // Allow kitchen staff and managers to access this route
    KitchenController.getKitchenQueue  // Return the kitchen queue
);

kitchenRoutes.post("/queue/add", KitchenController.addToQueue) // Add an order to the kitchen queue

// Update the status of a queue item
kitchenRoutes.patch(
    "/queue/:queueNumber",
    AuthController.restrictToStaff([STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER]), // Allow kitchen staff and managers to access this route
    KitchenController.progressItemStatus  // Progress the selected queue item status
);

export default kitchenRoutes // Export the kitchen routes
