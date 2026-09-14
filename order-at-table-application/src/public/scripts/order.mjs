import { MenuModel } from "./menu.mjs";

export class OrderModel {

    // Store the products currently added to the order
    static products = [];

    // Store the currently selected product
    static selectedProduct = null;

    // Add, update, or remove a product quantity
    static setProductsWithQuantity(productName, productQuantity) {

        // Remove the product if its quantity reaches zero
        if (productQuantity <= 0) {
            this.products = this.products.filter(
                product => product.name !== productName
            );

            return;
        }

        // Find the product and update its quantity
        for (const product of this.products) {
            if (product.name === productName) {
                product.quantity = productQuantity;
                return;
            }
        }

        // Add the product if it is not already in the order
        this.products.push({
            name: productName,
            quantity: productQuantity
        });
    }

    // Get the quantity of a product in the order
    static getProductQuantity(productName) {

        // Loop through the products in the order
        for (const product of this.products) {

            // Return the quantity if the product name matches
            if (product.name === productName) {
                return product.quantity;
            }
        }

        // Return zero if the product is not in the order
        return 0;
    }

    // Get all products and their quantities
    static getAllProductsWithQuantities() {
        return this.products;
    }

    // Clear all products from the order
    static clear() {
        this.products = [];

    // Remove the saved order from localStorage
    localStorage.removeItem("order");
}

    // Save the current order to localStorage
    static saveToLocalStorage() {
        localStorage.setItem(
            "order",
            JSON.stringify(this.products)
        )
    }

    // Load the saved order from localStorage
    static loadFromLocalStorage() {
        const savedOrder = localStorage.getItem("order")

        if (savedOrder) {
            this.products = JSON.parse(savedOrder)
        }
    }

    // Clear the saved order
    static clearLocalStorage() {
        localStorage.removeItem("order")
    }

    // Store the currently selected product
    static setSelectedProduct(product) {
        this.selectedProduct = product;
    }

    // Get the currently selected product
    static getSelectedProduct() {
        return this.selectedProduct;
    }
}

export class OrderController {

    // Run setup when the controller loads
    static {

        // Listen for clicks on the product update button
        document.getElementById("order-product-update")
            .addEventListener("click", () => {

                // Get the quantity input
                const quantityElement =
                    document.getElementById("order-product-quantity");

                // Update the selected product quantity
                this.updatedSelectedProductQuantity(
                    Number(quantityElement.value)
                );
            });

        // Update the product total when the quantity changes
        document.getElementById("order-product-quantity")
            .addEventListener("input", () => {
                this.renderProductDetailsForOrder();
            });

        // Send the order when the send button is clicked
        document.getElementById("order-send")
            .addEventListener("click", () => {
                this.sendOrder();
            });
    }

    // Send the current order to the kitchen
    static sendOrder() {

        // Get all products and quantities in the order
        const order = OrderModel.getAllProductsWithQuantities();

        // Send the order to the kitchen queue
        fetch("/kitchen/queue/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
        .then(response => {

            // Check if the order was submitted successfully
            if (response.status === 200) {

                // Clear the order
                OrderModel.clear();

                // Refresh the product and order details
                this.renderProductDetailsForOrder();
                this.renderOrderDetails();

            } else {
                alert("Error submitting order - status: " + response.status);
            }
        });
    }

    // Update the quantity of the currently selected product
    static updatedSelectedProductQuantity(quantity) {

        // Get the selected product
        const selectedProduct = OrderModel.getSelectedProduct();

        // Check that a product is selected
        if (selectedProduct) {

            // Update the product quantity
            OrderModel.setProductsWithQuantity(
                selectedProduct.name,
                quantity
            );

            // Refresh the displayed details
            this.renderProductDetailsForOrder();
            this.renderOrderDetails();
        }
    }

    // Add one product directly to the order
    static addProductToOrder(productName) {

        // Get the current quantity
        const currentQuantity =
            OrderModel.getProductQuantity(productName);

        // Increase the quantity by one
        OrderModel.setProductsWithQuantity(
            productName,
            currentQuantity + 1
        );

        // Refresh the order total
        this.renderOrderDetails();
    }

    // Select a product using its name
    static setSelectedProductByName(productName) {

        // Find the product in the menu
        const selectedProduct =
            MenuModel.getProductByName(productName);

        // Store the selected product
        OrderModel.setSelectedProduct(selectedProduct);

        if (selectedProduct) {

            // Get the quantity input
            const quantityElement =
                document.getElementById("order-product-quantity");

            // Get the product's current order quantity
            const quantity =
                OrderModel.getProductQuantity(selectedProduct.name);

            // Display the quantity
            quantityElement.value = quantity;
        }

        // Refresh the product details
        this.renderProductDetailsForOrder();
    }

    // Update the selected product quantity and total price
    static renderProductDetailsForOrder() {

        // Get the quantity and total elements
        const quantityElement =
            document.getElementById("order-product-quantity");

        const totalElement =
            document.getElementById("order-product-total");

        // Get the selected product
        const selectedProduct =
            OrderModel.getSelectedProduct();

        if (selectedProduct) {

            // Calculate the product total
            const total =
                Number(quantityElement.value) * selectedProduct.price;

            // Display the product total
            totalElement.innerText = "$" + total.toFixed(2);

        } else {

            // Reset the quantity and total
            quantityElement.value = 0;
            totalElement.innerText = "$0.00";
        }
    }

    // Display the current order total
    static renderOrderDetails() {

        // Get the send order button
        const sendButton =
            document.getElementById("order-send");

        // Get all products in the order
        const orderProductsWithQuantities =
            OrderModel.getAllProductsWithQuantities();

        // Start the total at zero
        let total = 0;

        // Calculate the total price of the order
        for (const orderProduct of orderProductsWithQuantities) {

            // Find the matching menu product
            const product =
                MenuModel.getProductByName(orderProduct.name);

            if (product) {
                total += product.price * orderProduct.quantity;
            }
        }

        // Display the order total
        sendButton.value =
            "Send order to kitchen - $" + total.toFixed(2);
    }
}

// Allow the Add to Order button in the generated HTML to use the controller
window.addProductToOrder = (productName) =>
    OrderController.addProductToOrder(productName);

// Allow other HTML buttons to select a product by name
window.setSelectedProductByName = (productName) =>
    OrderController.setSelectedProductByName(productName);