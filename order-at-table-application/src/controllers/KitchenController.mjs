import { QUEUE_STATUS_COOKING, QUEUE_STATUS_PENDING, QUEUE_STATUS_READY, QUEUE_STATUS_SERVED, QueueModel } from "../models/QueueModel.mjs";

// Create the kitchen controller
export class KitchenController {
    // Display the kitchen page
    static viewKitchenPage(req,res) {
        res.render("kitchen.ejs"); // Render the kitchen EJS view
    }

    // Get all items in the kitchen queue
    static getKitchenQueue(req,res) {
        const queueItems = QueueModel.select(); // Select all queue items
        res.json(queueItems); // Send the queue items as JSON
    }

    // Update the status of a queue item
    static progressItemStatus(req,res) {
        const queueNumber = req.params.queueNumber; // Get the queue number
        const currentStatus = req.body.status; // Get the current status from the request body

         // Check if the status is valid
        if(![
            QUEUE_STATUS_COOKING,
            QUEUE_STATUS_PENDING,
            QUEUE_STATUS_READY,
            QUEUE_STATUS_SERVED
        ].includes(currentStatus)) {
            res.status(400).render("status.ejs", {
                message: "Invalid status - Must be: pending, cooking, ready, or served."
            });

            return; // Stop the function
        }

        // Find queue items using the queue number
        const results = QueueModel.select(item => item.queueNumber == queueNumber);
        // Check that exactly one queue item was found
        if(results.length == 1) {
            const queueItem = results [0];     // Get the matching queue item

            // Check if the stored status matches the current status
            if (queueItem.status != currentStatus) {
                res.status(400).send("status out of date")
                return; // Stop the function
            }

            // Check if the item is waiting to be cooked
         if (queueItem.status == QUEUE_STATUS_PENDING) {
                queueItem.status = QUEUE_STATUS_COOKING;

            } else if (queueItem.status == QUEUE_STATUS_COOKING) {
                queueItem.status = QUEUE_STATUS_READY;

            } else if (queueItem.status == QUEUE_STATUS_READY) {
                queueItem.status = QUEUE_STATUS_SERVED;

            } else if (queueItem.status == QUEUE_STATUS_SERVED) {
                res.status(400).send("Item already served");
                return;
            }

            //Save the updated item back to the model
            QueueModel.update(item => item.queueNumber == queueNumber, queueItem)
            res.status(200).send();
        } else {
            res.status(400).send("Queue item not found");
            return;
        }
    }

    // Add the customer's order items to the kitchen queue
    static addToQueue(req,res) {

        const {tableNumber, billNumber} = req.session.customer; // Get the table number and bill number from the customer session

        const order = req.body; // Get the submitted order data from the request body

        // Loop through each product in the order
        for (const productWithQuantity of order) {

            // Create a new queue item for the product
            const queueItem = new QueueModel(
                billNumber, // Bill number for the order
                tableNumber,  // Table number for the customer
                productWithQuantity.name, // Name of the ordered product
                productWithQuantity.quantity, // Quantity ordered
                QUEUE_STATUS_PENDING // Set the item status to pending
            )

            QueueModel.insert(queueItem); // Add the queue item to the queue
        }

        res.status(200).send(); // Send a successful response
    }
}