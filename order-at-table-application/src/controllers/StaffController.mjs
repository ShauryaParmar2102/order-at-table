// Import staff roles and the staff model
import {STAFF_ROLE_KITCHEN, STAFF_ROLE_MANAGER, STAFF_ROLE_WAIT, StaffModel} from "../models/StaffModel.mjs"

// Create the staff controller
export class StaffController{
     // Display the staff CRUD page
    static viewCRUDpage(req,res) {
        const staff = StaffModel.select(); // Get all staff members

        let selected = null; // Set the selected staff member to null by default
        const selected_name = req.params.name // Get the selected staff member name from the URL

         // Check if a staff member name was provided
        if(selected_name) {
            const result = StaffModel.select(s => s.name == selected_name) // Find the staff member with the matching name
            if(result.length > 0) { // Check if a matching staff member was found
                selected = result [0] // Get the first matching staff member
            } else {
                res.render("status.ejs", {message: "staff member not found"}) // Show an error if the staff member was not found
                return; // Stop the function
            }
        }
        // Display the staff CRUD page with all staff and the selected staff member
        res.render("staff.ejs", {staff, selected})   
    }
    // Handle create, update, delete, or clear actions
    static handleCRUDAction(req,res) {

        const formData = req.body // Get the submitted form data'

        // Validate the CRUD action
        if(!/^(clear|update|create|delete)$/.test(formData["action"])) { // Regex checks that the action is clear, update, create, or delete

            // Show an error if the action is invalid
            res.status(400).render("status.ejs", {message: "Invalid CRUD operation - must be clear, update, create, or delete."}) 
        }

        // Check if update or delete was selected without choosing a staff member
        if (
            (formData["action"] == "update" || formData["action"] == "delete")
            && !formData["selected_name"].length > 0
        ) {
            // Show an error if no staff member was selected
            res.status(400).render("status.ejs", { message: "Missing selected staff name," });
            return;
        }
        // Check that the selected staff role is valid
        if (![
            STAFF_ROLE_KITCHEN,
            STAFF_ROLE_MANAGER,
            STAFF_ROLE_WAIT
        ].includes(formData["staff_role"])) {

             // Show an error if the staff role is invalid
            res.status(400).render("status.ejs", {
                message: "Invalid staff role - Must be: kitchen, wait, or manager."
            });
            return; //Stop the function
        }
        
        // Check that a staff password has been entered
        if (!formData["staff_password"].length > 0) {
            res.status(400).render("status.ejs", { message: "Invalid password - Password must be specified." });
            return;
        }

        // Get the action and selected staff name
        // The selected name stores the original staff name
        // This lets the app find the correct staff member
        // even if their name is changed during an update
        const action = formData["action"] // Get the selected CRUD action
        const selected_name = formData["selected_name"] // Get the original selected staff name

        // Create a staff member using the submitted form data
        const staffMember = new StaffModel(
            formData["staff_name"],
            formData["staff_role"],
            formData["staff_password"]
        )

        // Check which CRUD action was selected
        if(action == "clear") {
            res.redirect("/staff")  // Clear the form and return to the staff page
        } else if (action == "update") {
            StaffModel.update(s => s.name == selected_name, staffMember) // Update the selected staff member
            res.redirect("/staff/" + staffMember.name) // Redirect to the updated staff member
        } else if (action == "update") {
            StaffModel.update(s => s.name == selected_name, staffMember) // Add the new staff member
        } else if (action == "create") {
            StaffModel.insert(staffMember) // Add the new staff member
            res.redirect("/staff/" + staffMember.name) // Redirect to the newly created staff member
        } else if (action == "delete") {
            StaffModel.delete(s => s.name == selected_name) // Delete the selected staff member
            res.redirect("/staff") // Return to the staff page
        }

    }
}