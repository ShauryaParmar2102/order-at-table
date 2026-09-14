import {BILL_STATUS_OPEN, BILL_STATUS_PAID, BILL_STATUS_UNPAID, BillModel} from "../models/BillModel.mjs"; // Import bill statuses and the BillModel
import {ProductModel} from "../models/ProductModel.mjs"; // Import the ProductModel
import { QUEUE_STATUS_SERVED, QueueModel } from "../models/QueueModel.mjs"; // Import the served queue status and QueueModel

export class BillingController {
    // Display the billing page
    static viewBillingPage(req,res) {
        res.render("billing.ejs") // Render the billing EJS view
    }

    static getBillsJSON(req,res) {
        const statusFilter = req.query.statusFilter // Get the status filter from the URL query

        const search = req.query.search // Get the search value from the URL query


        // Filter the bills based on status and search
        const bills = BillModel.select(
            bill => 
                // Check if the bill matches the selected status
            (statusFilter ? bill.status == statusFilter : true)
            &&
            // Check if the search matches the bill or table number
            (search ? (
                bill.billNumber == search
                || bill.tableNumber == search
            ) : true)
            
        );
        

        res.json(bills) // Send the filtered bills as JSON
    }
    // Update the status of a bill
    static updateBillStatus(req,res) {
        const billNumber = req.params.billNumber // Get the bill number from the URL
        const updatedStatus = req.body.status // Get the new bill status from the request body

        //Status validation
        if(![BILL_STATUS_OPEN, BILL_STATUS_UNPAID, BILL_STATUS_PAID].includes(updatedStatus)) {
            res.status(400).render("status.ejs", {
                message: "Invalid bill status - Must be: open, unpaid, or paid."
            });
            return;
        }
        // Validate the bill number using regex to make sure it contains only digits from 0 to 9
        if (!/^[0-9]+$/.test(billNumber)) {
            res.status(400).render("status.ejs", { message: "Invalid bill number - Bill number must be numeric."})
                return;
        }

        const results = BillModel.select(bill => bill.billNumber == billNumber) // Find the bill with the matching bill number

        //Check if the bill was found
        if(results.length > 0) {
            const bill = results[0] //Get the first matching bill
            bill.status = updatedStatus // Update the bill status
            BillModel.update(bill => bill.billNumber == billNumber, bill)  // Save the updated bill

            res.status(200).send("status updated")
        } else{
            res.status(400).send("Bill not found")
        }
    }
    // Get the bill number from the URL
    static getBillDetailsPartial(req,res) {
        const billNumber = req.params.billNumber

        const results = BillModel.select(bill => bill.billNumber == billNumber) // Find the bill with the matching bill number

        // Check if the bill was found
        if(results.length > 0) {
            const bill = results[0] // Get the first matching bill

            // Get all order lines linked to this bill
            const orderLines = QueueModel.select(line => 
                line.billNumber == bill.billNumber
            )

            //Calculate the total of all served items
            const total = orderLines.reduce(
                (sum, orderLine) =>
                    sum +
                    orderLine.quantity *
                    ProductModel.getProductPrice(orderLine.productName),
                0
            )

            // Add price information to each order line
            const billItems = orderLines.map(orderLine => {
                const price = ProductModel.getProductPrice(orderLine.productName)

                return {
                    ...orderLine,
                    price: price,
                    lineTotal: price * orderLine.quantity
                }
            })

                //Render partial with bill details and list of product ordered
                res.render("partials/billDetails.ejs", {
                    bill,
                    orderLines,
                    total
                })
        }
    }
    // Finalise a bill using the table and bill number
    static finaliseBill(tableNumber, billNumber) {

        // Create a filter to find the matching bill
        const filter = bill =>
            bill.tableNumber == tableNumber && bill.billNumber == billNumber

        // Find the matching bill
        const results = BillModel.select(filter);

        // Check if the bill was found
        if(results.length > 0) {
            const bill = results[0]; // Get the first matching bill
            bill.status = BILL_STATUS_UNPAID; // Change the bill status to unpaid
            BillModel.update(filter,bill); // Save the updated bill
        }
    }
}
