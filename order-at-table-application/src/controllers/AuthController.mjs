import { BILL_STATUS_OPEN, BillModel } from "../models/BillModel.mjs";
import {
    STAFF_ROLE_KITCHEN,
    STAFF_ROLE_MANAGER,
    STAFF_ROLE_WAIT,
    StaffModel
} from "../models/StaffModel.mjs";

import { BillingController } from "../controllers/BillingController.mjs";

export class AuthController {

    // Display the login page
    static viewLoginPage(req, res) {
        res.render("login.ejs");
    }

    // Handle customer and staff login
    static loginUser(req, res) {

        // Get the submitted login form data
        const formData = req.body;

        // Check if the user is logging in as a customer
        if (formData.loginType == "customer") {

            // Validate that the table number contains digits only
            if (!/^[0-9]+$/.test(formData.tableNumber)) {
                res.status(400).render("status.ejs", {
                    message: "Invalid table number - Table number must be only digits."
                });
                return;
            }

            // Create a new open bill using the current timestamp as the bill number
            const bill = new BillModel(
                Date.now(),
                formData.tableNumber,
                BILL_STATUS_OPEN
            );

            // Add the bill to the bill data source
            BillModel.insert(bill);

            // Store the customer's table and bill number in the session
            req.session.customer = {
                tableNumber: bill.tableNumber,
                billNumber: bill.billNumber
            };

            // Redirect the customer to the menu
            res.redirect("/menu");

        // Check if the user is logging in as staff
        } else if (formData.loginType == "staff") {

            // Validate the staff name
            if (!/^[a-zA-Z0-9]+$/.test(formData.staffName)) {
                res.status(400).render("status.ejs", {
                    message: "Invalid staff name - Must be specified and can contain numbers and letters only."
                });
                return;
            }

            // Find a staff member matching the entered name and password
            const queryResult = StaffModel.select(
                staff =>
                    staff.name == formData.staffName &&
                    staff.password == formData.staffPassword
            );

            // Check if a matching staff member was found
            if (queryResult.length > 0) {

                // Get the matching staff member
                const matchingStaffMember = queryResult[0];

                // Store the staff member's name and role in the session
                req.session.staff = {
                    name: matchingStaffMember.name,
                    role: matchingStaffMember.role
                };

                // Redirect kitchen staff to the kitchen page
                if (matchingStaffMember.role == STAFF_ROLE_KITCHEN) {
                    res.redirect("/kitchen");

                // Redirect wait staff to the billing page
                } else if (matchingStaffMember.role == STAFF_ROLE_WAIT) {
                    res.redirect("/billing");

                // Redirect managers to the staff page
                } else if (matchingStaffMember.role == STAFF_ROLE_MANAGER) {
                    res.redirect("/staff");

                } else {
                    // Show an error if the staff role is invalid
                    res.status(403).render("status.ejs", {
                        message: "Invalid staff role."
                    });
                }

            } else {
                // Show an error if the staff login details are incorrect
                res.status(401).render("status.ejs", {
                    message: "Invalid login credentials."
                });
            }

        } else {

            // Show an error if the login type is invalid
            res.status(400).render("status.ejs", {
                message: "Invalid login type."
            });
        }
    }

    // Log the current user out
    static logoutUser(req, res) {

        // Check if the current session belongs to a customer
        if (req.session.customer) {

            // Finalise the customer's bill before logging them out
            BillingController.finaliseBill(
                req.session.customer.tableNumber,
                req.session.customer.billNumber
            );
        }

        // Destroy the current session
        req.session.destroy();

        // Redirect the user back to the home page
        res.redirect("/");
    }

    // Check whether a customer or staff member is logged in
    static hasSession(req, res, next) {

        // Allow the request if a valid session exists
        if (req.session.customer || req.session.staff) {
            next();

        } else {

            // Show an error if nobody is logged in
            res.status(401).render("status.ejs", {
                message: "You must be logged in to access this page."
            });
        }
    }

    // Restrict access to specific staff roles
    static restrictToStaff(allowedStaffRoles) {

        // Return middleware that checks the logged-in staff member
        return (req, res, next) => {

            // Check if a staff member is logged in
            if (req.session.staff) {

                // Check if the staff member has an allowed role
                if (allowedStaffRoles.includes(req.session.staff.role)) {

                    // Allow the request to continue
                    next();

                } else {

                    // Show an error if the staff role is not allowed
                    res.status(403).render("status.ejs", {
                        message: "Your role does not permit viewing this page."
                    });
                }

            } else {

                // Show an error if the user is not logged in as staff
                res.status(401).render("status.ejs", {
                    message: "You must be logged in as a staff member to access this page."
                });
            }
        };
    }
}