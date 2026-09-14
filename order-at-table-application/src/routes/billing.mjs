import express from "express"
import { AuthController } from "../controllers/AuthController.mjs";
import { STAFF_ROLE_MANAGER, STAFF_ROLE_WAIT } from "../models/StaffModel.mjs";
import { BillingController } from "../controllers/BillingController.mjs";

const billingRoutes = express.Router()

// Display the billing page for wait staff and managers
billingRoutes.get(
    "/",
    AuthController.restrictToStaff([STAFF_ROLE_WAIT, STAFF_ROLE_MANAGER]),
    BillingController.viewBillingPage // Display the billing page

);

// Get the bill list for wait staff and managers
billingRoutes.get(
    "/bills",
    AuthController.restrictToStaff([STAFF_ROLE_WAIT, STAFF_ROLE_MANAGER]),
    BillingController.getBillsJSON // Get the bills and return them as JSON
)

// Handle requests for a specific bill
billingRoutes.get(
    "/bills/:billNumber",
    BillingController.getBillDetailsPartial // Get and display the details for a selected bill
)
// Update a bill status for wait staff and managers
billingRoutes.patch(
    "/bills/:billNumber",
    AuthController.restrictToStaff([STAFF_ROLE_WAIT, STAFF_ROLE_MANAGER]),
    BillingController.updateBillStatus // Update the status of the selected bill
);

export default billingRoutes // Export the billing routes
