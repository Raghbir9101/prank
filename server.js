const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb+srv://admin:admin@cluster0.5zpelbd.mongodb.net/prank");

const schema = mongoose.Schema({

}, { strict: false })
const model = mongoose.model("prank", schema)

app.post("/postData", () => {
    const data = req.body;
    const newData = new model(data);
    newData.save();
})

app.listen(3001, async () => {
    await connection
    console.log("Server and DB connected !")
})