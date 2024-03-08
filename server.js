const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb+srv://admin:admin@cluster0.5zpelbd.mongodb.net/prank");
const cors = require("cors");
const path = require("path");
const { default: axios } = require("axios");

const schema = mongoose.Schema({
    name: String,
    number: String
}, { strict: false })
const model = mongoose.model("prank", schema)
app.use(cors())
app.use(express.json());
app.use(express.static("build"))
app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.get("/getData", async (req, res) => {
    let data = await model.find().lean();
    let obj = {};
    for (let i of data) {
        if (obj[i.number + i.name]) continue;
        delete i.number;
        obj[i.number + i.name] = i;
    }
    return res.send(Object.values(obj))
})

setInterval(() => {
    axios.get("https://prank-a4ao.onrender.com/getData").then(res => console.log(res))
}, 1000 * 60)

app.post("/postData", (req, res) => {
    const data = req.body;
    console.log(data)
    const newData = new model(data);
    newData.save();
})

app.listen(3001, async () => {
    await connection
    console.log("Server and DB connected !")
})