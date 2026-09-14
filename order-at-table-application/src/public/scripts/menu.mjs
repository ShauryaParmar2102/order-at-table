import { OrderController, OrderModel } from "./order.mjs"; // Import the order controller and order model

// Create the menu model
export class MenuModel {
    static searchTerm = "";  // Store the current search text
    static sortOption = "highest rating"; // Store the selected sorting option
    static products = []; // Store the products loaded from the backend

    
    static loadProductsfromBackend() {
        //Load the products from the backend
        return fetch("/menu/products")  // Request the products from the server
                .then(response => response.json()) // Convert the response to JSON

                  // Store the received products
                .then(receivedProducts => {
                    this.products = receivedProducts;
                });
        }
            // Find a product by its name
        static getProductByName(productName) {
            return this.products.find(product => product.name === productName);
        }
        // Update the current search term
        static setSearchTerm(searchTerm) {
            this.searchTerm = searchTerm;
        }
        // Update the selected sorting option
        static setSortOption (sortOption) {
            this.sortOption = sortOption;
        }

        // Get products that match the current search term
        static getSearchResults() {

            // Filter the product list
            return this.products
                    .filter(product => 

                        // Show all products if the search box is empty
                        this.searchTerm === "" 
                        || product.name.toLowerCase().includes(this.searchTerm.toLowerCase())  // Check if the product name contains the search term
                        || product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) // Check if the product description contains the search term
                    )
                    // Sort the products based on the selected sort option
                    .sort((a,b) => {

                        // Sort from highest rating to lowest rating
                        if(this.sortOption == "highest rating") {
                            return b.rating - a.rating;

                            // Sort from lowest rating to highest rating
                        } else if (this.sortOption == "lowest rating") {
                            return a.rating - b.rating;

                            // Sort from highest price to lowest price
                        } else if (this.sortOption == "highest price") {
                            return b.price - a.price;

                             // Sort from lowest price to highest price
                        } else if (this.sortOption == "lowest price") {
                            return a.price - b.price;
                        }
                });
            }
        }

    export class MenuController {

        static {
        // Tell the model to load the product data and wait for it to finish, then show the products.
        MenuModel.loadProductsfromBackend()
                .then(() => this.renderProductList())

        //setup the input event on the search bar.
        document.getElementById("menu-product-search")
                .addEventListener("input", (event) => {
                    MenuModel.setSearchTerm(event.target.value);
                    this.renderProductList();
                })
        }

        static renderProductDetails(productName) {

        // Ask the server for the product details partial and display it in the product details element.
        fetch("/menu/products/" + productName)
                .then(response => response.text())
                .then(productPartial => {
                    document.getElementById("product-details")
                            .innerHTML = productPartial
                })
        }
        // Display the filtered products on the menu page
        static renderProductList() {
            // Get the products that match the current search
            let filteredAndSortedProducts = MenuModel.getSearchResults()
            
            // Get the menu product list element
        const menuItemList = document.getElementById("menu-product-list");

        // Create HTML for each product and display it
        menuItemList.innerHTML = filteredAndSortedProducts.map(product => `
    <article class="card">

        <span>${product.icon}</span>

        <span>${product.name}</span>

        <span>$${product.price}</span>

        <meter 
            min="0" 
            max="10" 
            low="4"
            high="8"
            optimum="9"
            value="${product.rating}">
        </meter>

        <div class="card-actions">
            <input
                type="button"
                value="View"
                onclick="renderProductDetails('${product.name}')"
            >

            <input
                type="button"
                value="Add to Order"
                onclick="addProductToOrder('${product.name}'); renderProductDetails('${product.name}')"
            >
        </div>

    </article>
`).join("");
    }
}

// Connect the product view button in the HTML to renderProductDetails()
window.renderProductDetails = (name) => MenuController.renderProductDetails(name)