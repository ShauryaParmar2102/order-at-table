import { DataModel } from "./DataModel.mjs";

export const STAFF_ROLE_KITCHEN = "kitchen"; // Define the kitchen staff role

export const STAFF_ROLE_WAIT = "wait"; // Define the wait staff role

export const STAFF_ROLE_MANAGER = "manager" // Define the manager staff role


export class StaffModel extends DataModel {
    name; // Store the staff member's name
    role;  // Store the staff member's role
    password; // Store the staff member's password

    constructor(name,role,password) {
        super(); // Call the parent DataModel constructor
        this.name = name; // Set the staff member's name
        this.role = role;  // Set the staff member's role
        this.password = password; // Set the staff member's password
    }
}

// Set the starting staff data
StaffModel.setDataSource([
    new StaffModel("John", STAFF_ROLE_WAIT, "abc123"),
    new StaffModel("Jane", STAFF_ROLE_KITCHEN, "abc123"),
    new StaffModel("Jess", STAFF_ROLE_MANAGER, "abc123"),

        // New staff accounts
    new StaffModel("Alex", STAFF_ROLE_WAIT, "alex123")
])