require("dotenv").config();
const express = require('express')
const cors = require("cors")
var bodyParser = require('body-parser')
//getting model
const houseModel = require("./models/house/house")

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// const mongoDB = "mongodb+srv://anmol:batta@cluster0.xdjbvti.mongodb.net/houses?retryWrites=true&w=majority";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true});
  console.log("database connnected");
}


const app = express()
const port = 5000
app.use(cors())
const house = new houseModel({ rent: 200, city: "ldh", floorAvailable:"2", houseType:"3bhk" });
// house.save()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    houseModel.find().then(result=>{
        res.status(200).json({
            houseData:result
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

app.post("/", (req,res,next)=>{
    const house = new houseModel({
        rent:req.body.rent,
        city:req.body.city,
        basement:req.body.basement,
        firstFloor:req.body.firstFloor,
        secondFloor:req.body.secondFloor,
        houseType:req.body.type,
        url:req.body.url
    })
    house.save().then(result=>{
        console.log(result);
        res.status(200).json({
            newHouse:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})