const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    ip: String,
    network: String,
    lat: Number,
    long: Number,
    city: String,
    region: String,
    user: String,
    action: String,
    date: Date,
})

const entry = mongoose.model("entrylog", entrySchema);