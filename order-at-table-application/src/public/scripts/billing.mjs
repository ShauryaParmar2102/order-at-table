export class BillingModel {
    static selectedBillNumber = null;
}

export class BillingController {
    static {
        this.renderFilteredBillList() // Display the filtered bill list

        // Refresh the bill list when the user types in the search box
        document.getElementById("billing-search").addEventListener("input", () => this.renderFilteredBillList())

         // Refresh the bill list when the show-all option changes
        document.getElementById("billing-show-all").addEventListener("input", () => this.renderFilteredBillList())

         // Update the selected bill when the status button is clicked
        document.getElementById("bill-update-status").addEventListener("click", () => this.updateSelectedBillStatus())
    }
    // Update the status of the currently selected bill
    static updateSelectedBillStatus() {

           // Check that a bill has been selected
        if(BillingModel.selectedBillNumber) {

            const selectedStatus = document.getElementById("bill-status-select").value  // Get the selected status from the dropdown

            // Send a PATCH request to update the selected bill
            fetch("/billing/bills/" + BillingModel.selectedBillNumber, {
                method: "PATCH",  // Use PATCH because the bill is being updated

                // Tell the server that JSON data is being sent
                headers: {
                    "Content-Type": "application/json"
                },

                // Send the selected status as JSON
                body: JSON.stringify({
                    status: selectedStatus
                })
                // Handle the response after updating the bill status
            }).then(response => {
                this.renderBillDetails(BillingModel.selectedBillNumber) // Refresh the selected bill details
                this.renderFilteredBillList() // Refresh the filtered bill list
            })
        } else {
            alert("Error updating status - No bill selected!") // Show an error if no bill has been selected
        }
    }

    // Display bills based on the search and status filter
    static renderFilteredBillList() {
        const searchText = document.getElementById("billing-search").value  // Get the text entered in the billing search box
        const showAll = document.getElementById("billing-show-all").checked // Check whether the show-all option is selected
        const statusFilter = showAll ? "" : "unpaid"  // Show all statuses or only unpaid bills
        this.renderBillList(statusFilter, searchText) // Render the bill list using the selected filters
    }

    // Render the bill list using optional status and search filters
        static renderBillList(statusFilter = null, search = null) {
        let queryString = new URLSearchParams()  // Create URL query parameters

         // Add the search value to the URL if one was provided
        if(search) {
            queryString.append("search", search)
        }

        // Add the status filter to the URL if one was provided
        if (statusFilter) {
            queryString.append("statusFilter", statusFilter)
        }

        // Request the matching bills from the server
        fetch("/billing/bills?" + queryString.toString())
                .then(response => response.json())  // Convert the server response into JSON

                // Work with the returned bills
                .then(bills => {
                    const billList = document.getElementById("bill-list") // Get the bill list element from the page

                    // Display each bill as a card in the bill list
                     billList.innerHTML = bills.map(bill => `
                    <article class="card">
                        <span>Table: ${bill.tableNumber}</span>
                        <span>${bill.status}</span>
                        <input 
                            type="button" 
                            value="view" 
                            onclick="renderBillDetails('${bill.billNumber}')" 
                        >
                    </article>
                `).join("")
                })
            }
            // Display the details for a selected bill
            static renderBillDetails(billNumber) {
                fetch("/billing/bills/" + billNumber) // Request the selected bill details from the server
                    .then(response => response.text()) // Convert the server response into HTML text

                    // Display the returned bill details
                    .then(productPartial => {

                        // Insert the bill details into the page
                        document.getElementById("bill-details")
                            .innerHTML = productPartial

                        BillingModel.selectedBillNumber = billNumber // Store the selected bill number
                    })
                }
            }

            // Make renderBillDetails available to the HTML onclick button
            window.renderBillDetails = (billNumber) => BillingController.renderBillDetails(billNumber)

