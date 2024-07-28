const mongoose = require('mongoose');

// Define the address schema
const address = new mongoose.Schema({
    street: String,
    city: String,
});

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 10, // Minimum age is 10
        max: 40, // Maximum age is 40
        validate: {
            validator: v => v % 2 === 0, // Custom validator: age must be an even number
            message: props => `${props.value} is not even`, // Custom error message
        }
    },
    email: {
        type: String,
        required: true, // Email is required
        uppercase: true, // Convert email to uppercase
    },
    createAt: {
        type: Date,
        default: () => Date.now(), // Default value is the current date
        immutable: true, // createAt should not be modified once set
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(), // Default value is the current date
        // Should not be immutable as it needs to be updated on document update
    },
    bestFriend: mongoose.SchemaTypes.ObjectId, // Reference to another user
    hobbies: [String], // Array of strings representing hobbies
    address: address // Embedding address schema
});

// Static method to find users by name (case-insensitive)
userSchema.statics.findByName = function (name) {
    return this.where({ name: new RegExp(name, "i") });
};

// Query helper to find users by name (case-insensitive)
userSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, "i") });
};

// Virtual property to get the user's name and email in a specific format
userSchema.virtual("namedEmail").get(function () {
    return `${this.name} <${this.email}>`;
});

// Export the user model
module.exports = mongoose.model("user", userSchema);
