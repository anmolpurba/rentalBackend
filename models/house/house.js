const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const houseSchema = new mongoose.Schema({
    rent:Number,
    city:String,
    basement:Boolean,
    firstFloor:Boolean,
    secondFloor:Boolean,
    houseType:String,
    url:String
});

const houseModel = mongoose.model("house",houseSchema);

module.exports = houseModel;