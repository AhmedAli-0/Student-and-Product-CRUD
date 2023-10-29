// Export MongoDB
const mongoose = require("mongoose");

// Set Variable with Type to compare data
// Student
const studentSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.ObjectId,
        firstName: String,
        lastName: String,
        age: Number,
        courses: [String],
        address: {
            street: String,
            city: String,
            state: String,
            zip: Number,
        }
    },
    // for stop creating polular collection and add extra field of --v
    { collection: "studentInfo", versionKey: false }
);

// Here Compare Student Schema and Data from DataBase
const Students = mongoose.model("studentInfo", studentSchema);

// Product
const productSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.ObjectId,
        name: String,
        price: Number,
        category: String,
        tags: [String],
        specifications: {
            weight: String,
            dimensions: {
                width: Number,
                heigth: Number,
                depth: Number,
            }
        }
    },
    // for stop creating polular collection and add extra field of --v
    { collection: "productInfo", versionKey: false }
);

// Here Compare Product Schema and Data from DataBase
const Products = mongoose.model("productInfo", productSchema);

// Export both Student and Product models
module.exports = { Students, Products };




