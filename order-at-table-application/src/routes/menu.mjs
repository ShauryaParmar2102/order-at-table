import express from "express"
import { MenuController } from "../controllers/MenuController.mjs"
import { AuthController } from "../controllers/AuthController.mjs"
 
const menuRoutes = express.Router() // Create a router for menu routes

menuRoutes.get("/", AuthController.hasSession, MenuController.viewMenuPage) // Display the menu page for users with a valid session

menuRoutes.get("/products", MenuController.getProductsJSON) // Get all menu products as JSON

menuRoutes.get("/products/:name", MenuController.viewProductDetailsPartial) // Get the details for a selected product

export default menuRoutes // Export the menu routes
