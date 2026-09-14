import {DataModel} from "../models/DataModel.mjs";

export const BILL_STATUS_OPEN = "open"; // Define the open bill status
export const BILL_STATUS_UNPAID = "unpaid"; // Define the unpaid bill status
export const BILL_STATUS_PAID = "paid"; // Define the paid bill status

// Create the bill model using the base DataModel
export class BillModel extends DataModel {
    billNumber; // Store the bill number
    tableNumber; //Store the table number
    status; //Store the bill status

    // Create a new bill
    constructor(billNumber, tableNumber, status) {
        super(); // Call the parent DataModel constructor
        this.billNumber = billNumber; // Set the bill number
        this.tableNumber = tableNumber; // Set the table number
        this.status = status // Set the bill status

                // Store when the bill was created
        this.createdAt = Date.now();
    }
}

// Set the starting bill data
BillModel.setDataSource([
    new BillModel(1721006726456, 32, BILL_STATUS_UNPAID), // Sample unpaid bill for table 32
    new BillModel(1721006736456, 12, BILL_STATUS_PAID), // Sample paid bill for table 12
    new BillModel(1721006746456, 21, BILL_STATUS_OPEN), // Sample open bill for table 21
    new BillModel(1721006756456, 8, BILL_STATUS_OPEN),  // Sample open bill for table 8
])