import { DataModel } from "./DataModel.mjs"; // Import the base DataModel

export const QUEUE_STATUS_PENDING = "pending"; // Define the pending queue status
export const QUEUE_STATUS_COOKING = "cooking"; // Define the cooking queue status
export const QUEUE_STATUS_READY = "ready"; // Define the ready queue status
export const QUEUE_STATUS_SERVED = "served"; // Define the served queue status

let nextQueueNumber = 1; // Store the next available queue number

export class QueueModel extends DataModel {
    queueNumber;  // Store the queue number
    billNumber; //store the bill number
    tableNumber; //store the table number
    productName; //store the product name
    quantity; //store the quantity
    status; //store the status

    // Create a new queue item
    constructor(billNumber, tableNumber, productName, quantity, status){
        super(); // Call the parent DataModel constructor
        this.queueNumber = nextQueueNumber++;  // Automatically assign the next queue number
        this.billNumber = billNumber;  // Set the bill number
        this.tableNumber = tableNumber;  // Set the table number
        this.productName = productName;  // Set the product name
        this.quantity = quantity; // Set the ordered quantity
        this.status = status; // Set the queue item status
    }
}

QueueModel.setDataSource([]); // Start the queue with no items