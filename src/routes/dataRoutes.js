const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Connect studentModel and productModel
const { Students, Products } = require("../model/dataModel");

// Find Student from DataBase
router.get("/student", async (req, res) => {
    const studentsData = await Students.find();
    res.status(200).json(studentsData);
});

// Create student in DataBase
router.post("/addStudent", async (req, res) => {
    try {
        // structure of storeing Data
        const studentData = new Students({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            courses: req.body.courses,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                state: req.body.address.state,
                zip: req.body.address.zip,
            }
        });

        // save Data in DataBase
        const result = await studentData.save();

        // Store Response in json form
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
});

// Update Student in DataBase
router.put("/updateStudent/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const dataToBeUpdate = new Students({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            courses: req.body.courses,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
            },
        });

        const updateData = await Students.findByIdAndUpdate(studentId, dataToBeUpdate, {
            new: true,
        });

        if (!updateData) {
            return res.status(404).json({ massage: "Student not Found" });
        }

        return res.status(200).json({ massage: "Student Updated Successfully!" });
    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
});


// Delete Student in DataBase
router.delete("/deleteStudent/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const deletedStudent = await Students.findByIdAndRemove(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ massage: "Student not Found" });
        }

        return res.status(200).json({ massage: "Student Deleted Successfully!" });

    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
});



// Find Product from DataBase
router.get("/product", async (req, res) => {
    const productsData = await Products.find();
    res.status(200).json(productsData);
});

// Create Product in DataBase
router.post("/addProduct", async (req, res) => {
    try {
        // structure of storeing Data
        const productData = new Products({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            tags: req.body.tags,
            specifications: {
                weight: req.body.specifications.weight,
                dimensions: {
                    width: req.body.specifications.dimensions.width,
                    heigth: req.body.specifications.dimensions.heigth,
                    depth: req.body.specifications.dimensions.depth,
                }
            }
        });

        // save Data in DataBase
        const result = await productData.save();

        // Store Response in json form
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
});

// Update User in DataBase
router.put("/updateProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const dataToBeUpdate = new Products({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            tags: req.body.tags,
            specifications: {
                weight: req.body.specifications.weight,
                dimensions: {
                    width: req.body.specifications.dimensions.width,
                    heigth: req.body.specifications.dimensions.heigth,
                    depth: req.body.specifications.dimensions.depth,
                }
            }
        });

        const updateData = await Products.findByIdAndUpdate(productId, dataToBeUpdate, {
            new: true,
        });

        if (!updateData) {
            return res.status(404).json({ massage: "Product not Found" });
        }

        return res.status(200).json({ massage: "Product Updated Successfully!" });
    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
});


// Delete Product in DataBase
router.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Products.findByIdAndRemove(productId);

        if (!deletedProduct) {
            return res.status(404).json({ massage: "Product not Found" });
        }

        return res.status(200).json({ massage: "Product Deleted Successfully!" });

    } catch (error) {
        return res.status(500).json({ error: error.massage });
    }
});

// Export Model
module.exports = router;
