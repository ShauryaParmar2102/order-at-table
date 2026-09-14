# 🍽️ Order at Table App

A full-stack restaurant ordering application built with **Node.js, Express, EJS, JavaScript, CSS, Express Sessions, Fetch API, and localStorage**.

The app allows customers to order food from their table, kitchen staff to manage incoming orders, wait staff to manage bills, and managers to manage staff information.

---

## ✨ Features

## 💻 Technologies Used

This project was built using:

- 🟨 JavaScript
- 🟢 Node.js
- 🚂 Express
- 📄 EJS
- 🎨 HTML
- 🎨 CSS
- 🔐 Express Sessions
- 🌐 Fetch API
- 💾 localStorage
- 📦 npm

## 🧠 Skills I Practised

While building this project, I practised and reinforced:

- 🧩 Structuring a full-stack application
- 🚂 Creating routes with Express
- 📄 Rendering dynamic pages with EJS
- 🌐 Using the Fetch API
- 🔐 Working with sessions
- 👥 Creating role-based access
- 👨‍🍳 Building a kitchen queue system
- 🧾 Building a billing system
- 💰 Calculating order and bill totals
- 💾 Using localStorage
- 🔎 Searching and filtering data
- 🐛 Debugging frontend and backend JavaScript

### 👤 Customer

Customers can:

- Log in using a numeric table number
- Browse the restaurant menu
- View product details
- Add products to an order
- Change item quantities
- View the current order total
- Save the current basket using `localStorage`
- Refresh the page without immediately losing the basket
- Send orders to the kitchen
- Automatically create a bill linked to the table

---

### 👨‍🍳 Kitchen Staff

Kitchen staff can:

- View incoming customer orders
- View the bill number
- View the table number
- View the product name
- View the quantity ordered
- View the current order status
- Move an order through different stages

Order status flow:

pending → cooking → ready → served

### 💳 Wait Staff

Wait staff can:

- 🧾 View customer bills
- 🔎 Search bills by bill number
- 🪑 Search bills by table number
- 🍽️ View the products connected to a bill
- 🔢 View quantities
- 🔄 View order statuses
- 💰 View bill totals
- 📅 View the date a bill was created
- ✅ Change bill status


New default staff accounts are added directly through the application code.

### 👤 Customer / Member

Customers can:

- 🪑 Enter a numeric table number to log in
- 🍽️ Browse the restaurant menu
- 🔎 View product details
- ➕ Add products to their order
- 🔢 Change product quantities
- 💰 View the current order total
- 💾 Keep the basket saved using `localStorage`
- 📤 Send the order to the kitchen
- 🧾 Have a bill automatically linked to their table

Typical customer flow:

Enter Table Number
      ↓
Browse Menu
      ↓
Add Products
      ↓
Adjust Quantities
      ↓
Review Total
      ↓
Send Order to Kitchen
      ↓
Kitchen Processes Order
      ↓
Bill Is Created / Updated

## ⚙️ Installation

### 📥 1. Download the Project

Download the **Order at Table App** ZIP from GitHub and extract it.

Open the extracted folder in **Visual Studio Code**.

---

### 📦 2. Install Dependencies

Open the terminal inside the project folder and run:


npm install


This will install all required packages and create the node_modules folder.

▶️ 3. Start the Application

Run:

npm run start

🌐 4. Open the Application

Go to:

http://localhost:8080

The Order at Table App should now be running in your browser.

## 📋 Staff Account Summary

## 👥 Staff Roles and Login Details

| Name | Role | Password |
|---|---|---|
| John | 💳 Wait Staff | `abc123` |
| Jane | 👨‍🍳 Kitchen Staff | `abc123` |
| Jess | 🛠️ Manager | `abc123` |
| Alex | 💳 Wait Staff | `alex123` |

### 🧑‍💼 Staff Roles

- 💳 **Wait Staff** — manages customer bills
- 👨‍🍳 **Kitchen Staff** — manages incoming orders and order statuses
- 🛠️ **Manager** — manages staff information

### ➕ Adding More Staff Accounts

### ➕ Adding a New Staff Account

To add a new staff account, open `src/models/StaffModel.mjs` and add another `new StaffModel()` entry inside `StaffModel.setDataSource()`.

Example:

- new StaffModel("Sam", STAFF_ROLE_KITCHEN, "sam123")

New staff accounts are added directly in:


src/models/StaffModel.mjs

Available roles are:

- STAFF_ROLE_WAIT

- STAFF_ROLE_KITCHEN

- STAFF_ROLE_MANAGER

## 👨‍💻 Author

**Shaurya Parmar**

Built as a personal full-stack web development project.



