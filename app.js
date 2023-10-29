// DataBase Connect
const mongoose = require("mongoose");

// app Connection
const express = require("express");
const app = express();

// .env file Connection
require("dotenv").config();

// DataBase with App Connection
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Connect Routes
const userRoutes = require("./src/routes/dataRoutes");
app.use("/", userRoutes);

// Mongo Connection
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.log("Your MongoDB not connect Successfully:", error);
});

db.once("open", () => {
    console.log("Your MongoDB connected Successfully!");
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Your MongoDB connected on ${port} Port!`);
    })
});


