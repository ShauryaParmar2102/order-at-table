import {ProductModel} from "../models/ProductModel.mjs" // Import the ProductModel

// Create the menu controller
export class MenuController {
        // Display the menu page
    static viewMenuPage(req,res) {
        res.render("menu.ejs") // Render the menu EJS view
    }

    // Get all products as JSON
    static getProductsJSON(req,res) {
        const menuItems = ProductModel.select(); // Get all products from the ProductModel
        res.status(200).json(menuItems)  // Send the menu items as a successful JSON response
    }

     // Display the details for a selected product
    static viewProductDetailsPartial(req,res) {
        const itemName = req.params.name  // Get the product name from the URL
        const queryResult = ProductModel.select(product => product.name == itemName) // Find the product with the matching name

        // Check if a matching product was found
        if(queryResult.length > 0) {
            const item = queryResult[0] // Get the first matching product
                res.render("partials/productDetails.ejs", {item}) // Render the product details partial
            } else {
                res.render("status.ejs", {message: "Item not found"}) // Show an error if the product was not found
            }
        }
    }