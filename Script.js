const mongoose = require("mongoose");
const user = require('./user');

// Main function to connect to the database and perform operations
main().catch(err => console.log(err));

async function main() {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb");

    // This block creates a new user document
    const db = await user.create({
        name: "subash",
        age: 30,
        email: "abcd.gmail.com",
        hobbies: ['coding', 'movies'],
        address: {
            street: "xyz",
            city: "spppp"
        }
    });
    console.log("User created:", db);

    // This block finds the document by a query
    const find = await user.where("name").equals("subash").where("age").gt(20).select("email").limit(4);
    console.log("Query result:", find);

    // This block deletes the document
    await user.deleteOne({ name: "subash" });
    console.log("User deleted");

    // This block finds a document by functions and uses the virtual property
    const func = await user.findOne({ name: "subash", email: "abcd.gmail.com" });
    if (func) {
        console.log("Named email:", func.namedEmail);
    } else {
        console.log("User not found for named email");
    }

    // Using static method to find by name
    const func1 = await user.findByName("subash");
    console.log("Find by static method:", func1);

    // Using query helper to find by name
    const func2 = await user.find().byName("subash");
    console.log("Find by query helper:", func2);
}
