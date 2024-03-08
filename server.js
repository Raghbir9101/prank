const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb+srv://admin:admin@cluster0.5zpelbd.mongodb.net/prank");
const cors = require("cors");

const schema = mongoose.Schema({
    name: String,
    number: String
}, { strict: false })
const model = mongoose.model("prank", schema)
app.use(cors())
app.post("/postData", (req, res) => {
    const data = req.body;
    const newData = new model(data);
    newData.save();
})

app.listen(3001, async () => {
    await connection
    console.log("Server and DB connected !")
})