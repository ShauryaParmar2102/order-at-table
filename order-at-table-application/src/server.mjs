// Import Node path utilities
import path from "path"

// Import Express
import express from "express"

// Import session middleware
import session from "express-session"

// Import application routes
import authenticationRoutes from "./routes/auth.mjs"
import menuRoutes from "./routes/menu.mjs"
import kitchenRoutes from "./routes/kitchen.mjs"
import billingRoutes from "./routes/billing.mjs"
import staffRoutes from "./routes/staff.mjs"

// Create the Express application
const app = express()

// Configure sessions
app.use(
    session({
        secret: "abc123",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false
        }
    })
)

// Use EJS as the view engine
app.set("view engine", "ejs")

// Tell Express where the EJS views are stored
app.set("views", path.join(import.meta.dirname, "views"))

// Allow Express to read form data
app.use(
    express.urlencoded({
        extended: true
    })
)

// Allow Express to read JSON request bodies
app.use(express.json())

// Serve files from the public folder
app.use(express.static("src/public"))

// Connect the authentication routes
app.use("/auth", authenticationRoutes)

// Connect the menu routes
app.use("/menu", menuRoutes)

// Connect the kitchen routes
app.use("/kitchen", kitchenRoutes)

// Connect the billing routes
app.use("/billing", billingRoutes)

// Connect the staff routes
app.use("/staff", staffRoutes)

// Redirect the home page to the login page
app.get("/", (req, res) => {
    res.redirect("/auth/login")
})

// Set the server port
const port = 8080

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})