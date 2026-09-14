export class KitchenController{

    static {
        this.renderQueueList();

        //Set up click event on refresh button
        document.getElementById("kitchen-queue-refresh")
            .addEventListener("click", (event) => {
                this.renderQueueList();
            })
    }
    // Display the details for a selected product
    static renderProductDetails(productName) {
        
        fetch("/menu/products/" + productName) // Request the selected product details from the server
            .then(response => response.text()) // Convert the server response into HTML text

             // Display the returned product details
            .then(productPartial => {

                // Insert the product details into the product details section
                document.getElementById("product-details") 
                    .innerHTML = productPartial
            })
        }

        static progressQueueStatus(queueNumber, status) {
            //Ask the server to progress the queue item to the next status.
            fetch("/kitchen/queue/"+queueNumber, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
               body: JSON.stringify({ status }) // Send the current status to the server as JSON
                }).then(response => {
                     // Check if the server returned an error
                    if (response.status != 200) {
                        // Read the error message from the server
                        response.text().then(errorMessage => {
                            alert(`Error: ${errorMessage} - refreshing queue.`);
                        })
                    }
                    this.renderQueueList(); // Refresh the kitchen queue list
                })
        }

       static renderQueueList() {
    // Load latest queue from the backend
    fetch("/kitchen/queue")
        .then(response => response.json())
        .then(kitchenQueue => {

            // Get the kitchen queue element
            const kitchenQueueList = document.getElementById("kitchen-queue");

            // Display the queue headings and queue items
            kitchenQueueList.innerHTML = `
                <span>Bill</span>
                <span>Table</span>
                <span>Name</span>
                <span>Qty</span>
                <span>Status</span>
                <span>Action</span>
            `
            + kitchenQueue.map(queueItem => `
                <span>${queueItem.billNumber}</span>
                <span>${queueItem.tableNumber}</span>
                <span>${queueItem.productName}</span>
                <span>${queueItem.quantity}</span>
                <span>${queueItem.status}</span>
                <div>
                <input
                    type="button"
                    value="Next Status"
                    onclick="progressQueueStatus(${queueItem.queueNumber}, '${queueItem.status}')"
                >
            </div>
            `).join("")
        })
    }
}
// Make renderProductDetails available to the HTML onclick attribute
window.renderProductDetails = (name) => 
    KitchenController.renderProductDetails(name);

// Make progressQueueStatus available to the HTML onclick attribute
window.progressQueueStatus = (queueNumber, status) =>
        KitchenController.progressQueueStatus(queueNumber, status);