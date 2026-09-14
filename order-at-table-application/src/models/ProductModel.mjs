import { DataModel } from "./DataModel.mjs";

export class ProductModel extends DataModel {
    name; // Store the product name
    description; //store the description name
    price; //store the product price
    rating; // store the product rating
    icon; // store the product icon

    // Create a new product with its details
    constructor(name, description, price, rating, icon) {
        super(); // Call the parent DataModel constructor
        this.name = name; // Store the product name
        this.description = description;
        this.price = price;
        this.rating = rating;
        this.icon = icon;
    }

    // Get the price of a product using its name
    static getProductPrice(productName) {

        // Find the product with the matching name
        const result = ProductModel.select(
            product => product.name == productName
        )

        // Check if a matching product was found
        if(result.length > 0) {
            return result[0].price // Return the price of the first matching product
        } else {
            return 0
        }
    }
}

// Load the menu items into the product data source
ProductModel.setDataSource([
    new ProductModel(
        "Chicken Parmigiana",
        "Crumbed chicken breast topped with tomato sauce and melted cheese, served with chips.",
        24,
        9,
        "🍗"
    ),

    new ProductModel(
        "Margherita Pizza",
        "Classic pizza topped with tomato sauce, mozzarella cheese, and fresh basil.",
        18,
        8.5,
        "🍕"
    ),

    new ProductModel(
        "Beef Burger",
        "Beef patty with lettuce, tomato, cheese, onion, and burger sauce in a toasted bun.",
        19,
        8,
        "🍔"
    ),

    new ProductModel(
        "Fish and Chips",
        "Crispy battered fish served with hot chips and tartare sauce.",
        21,
        8,
        "🐟"
    ),

    new ProductModel(
        "Chicken Tacos",
        "Soft tacos filled with grilled chicken, lettuce, tomato, cheese, and salsa.",
        17,
        8.5,
        "🌮"
    ),

    new ProductModel(
        "Creamy Pasta",
        "Pasta served in a creamy garlic sauce with parmesan cheese.",
        20,
        8,
        "🍝"
    ),

    new ProductModel(
        "Caesar Salad",
        "Cos lettuce with parmesan cheese, croutons, Caesar dressing, and grilled chicken.",
        16,
        7.5,
        "🥗"
    ),

    new ProductModel(
        "Garlic Bread",
        "Toasted bread topped with garlic butter and herbs.",
        8,
        8,
        "🥖"
    ),

    new ProductModel(
        "Chocolate Cake",
        "Rich chocolate cake served with chocolate sauce and cream.",
        10,
        9,
        "🍰"
    ),

    new ProductModel(
        "Ice Cream Sundae",
        "Vanilla ice cream topped with chocolate sauce, whipped cream, and sprinkles.",
        9,
        8.5,
        "🍨"
    ),

    new ProductModel(
    "BBQ Chicken Pizza",
    "Pizza topped with barbecue chicken, mozzarella, red onion, and barbecue sauce.",
    22,
    8.5,
    "🍕"
),

new ProductModel(
    "Pepperoni Pizza",
    "Classic pizza topped with tomato sauce, mozzarella, and pepperoni.",
    21,
    8.5,
    "🍕"
),

new ProductModel(
    "Hawaiian Pizza",
    "Pizza topped with ham, pineapple, mozzarella, and tomato sauce.",
    20,
    7.5,
    "🍕"
),

new ProductModel(
    "Grilled Chicken Burger",
    "Grilled chicken breast with lettuce, tomato, cheese, and mayonnaise.",
    18,
    8,
    "🍔"
),

new ProductModel(
    "Double Beef Burger",
    "Two beef patties with cheese, lettuce, tomato, onion, and burger sauce.",
    24,
    9,
    "🍔"
),

new ProductModel(
    "Veggie Burger",
    "Vegetable patty with lettuce, tomato, cheese, and herb mayonnaise.",
    17,
    7.5,
    "🥬"
),

new ProductModel(
    "Steak Sandwich",
    "Grilled steak with lettuce, tomato, onion, cheese, and barbecue sauce.",
    23,
    8.5,
    "🥩"
),

new ProductModel(
    "Chicken Schnitzel",
    "Crumbed chicken schnitzel served with chips and salad.",
    22,
    8.5,
    "🍗"
),

new ProductModel(
    "Grilled Salmon",
    "Grilled salmon fillet served with vegetables and lemon.",
    27,
    9,
    "🐟"
),

new ProductModel(
    "Prawn Pasta",
    "Pasta with prawns, garlic, herbs, and a creamy sauce.",
    24,
    8.5,
    "🍤"
),

new ProductModel(
    "Spaghetti Bolognese",
    "Spaghetti served with a rich beef and tomato sauce.",
    19,
    8,
    "🍝"
),

new ProductModel(
    "Carbonara",
    "Pasta with bacon, parmesan, egg, and creamy sauce.",
    21,
    8.5,
    "🍝"
),

new ProductModel(
    "Lasagne",
    "Layers of pasta, beef sauce, béchamel, and melted cheese.",
    22,
    9,
    "🍝"
),

new ProductModel(
    "Chicken Alfredo",
    "Pasta with grilled chicken in a creamy parmesan Alfredo sauce.",
    23,
    8.5,
    "🍝"
),

new ProductModel(
    "Nachos",
    "Corn chips topped with cheese, salsa, sour cream, and guacamole.",
    16,
    8,
    "🧀"
),

new ProductModel(
    "Beef Nachos",
    "Corn chips topped with seasoned beef, cheese, salsa, sour cream, and guacamole.",
    20,
    8.5,
    "🧀"
),

new ProductModel(
    "Beef Tacos",
    "Soft tacos filled with seasoned beef, lettuce, cheese, tomato, and salsa.",
    18,
    8,
    "🌮"
),

new ProductModel(
    "Fish Tacos",
    "Soft tacos with crispy fish, lettuce, tomato, and lime mayonnaise.",
    19,
    8.5,
    "🌮"
),

new ProductModel(
    "Chicken Wings",
    "Crispy chicken wings coated in barbecue sauce.",
    15,
    8,
    "🍗"
),

new ProductModel(
    "Hot Chips",
    "Golden crispy chips served with tomato sauce.",
    7,
    8,
    "🍟"
),

new ProductModel(
    "Sweet Potato Fries",
    "Crispy sweet potato fries served with aioli.",
    9,
    8,
    "🍠"
),

new ProductModel(
    "Onion Rings",
    "Crispy battered onion rings served with dipping sauce.",
    9,
    7.5,
    "🧅"
),

new ProductModel(
    "Greek Salad",
    "Lettuce, tomato, cucumber, olives, feta cheese, and Greek dressing.",
    15,
    8,
    "🥗"
),

new ProductModel(
    "Garden Salad",
    "Fresh lettuce, tomato, cucumber, carrot, and house dressing.",
    12,
    7.5,
    "🥗"
),

new ProductModel(
    "Chicken Caesar Wrap",
    "Grilled chicken, lettuce, parmesan, and Caesar dressing in a tortilla wrap.",
    16,
    8,
    "🌯"
),

new ProductModel(
    "Beef Burrito",
    "Tortilla filled with seasoned beef, rice, beans, cheese, and salsa.",
    19,
    8.5,
    "🌯"
),

new ProductModel(
    "Chicken Burrito",
    "Tortilla filled with grilled chicken, rice, beans, cheese, and salsa.",
    18,
    8.5,
    "🌯"
),

new ProductModel(
    "Cheesecake",
    "Creamy cheesecake served with berry sauce.",
    11,
    8.5,
    "🍰"
),

new ProductModel(
    "Apple Pie",
    "Warm apple pie served with vanilla ice cream.",
    10,
    8,
    "🥧"
),

new ProductModel(
    "Brownie Sundae",
    "Warm chocolate brownie topped with vanilla ice cream and chocolate sauce.",
    12,
    9,
    "🍨"
)

]);