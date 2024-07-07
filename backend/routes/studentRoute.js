const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");


require("../Schema/regStudents");
const regStudentsSchema = mongoose.model("regStudents");

require("../Schema/studInfo");
const studInfoSchema = mongoose.model("studInfo");



router.get("/studentStatus", async (req, res) => {
    var listTable = {};

    try {
        await regStudentsSchema.find({}).then((data) => {
            listTable = {register: {data}};
        });

   } catch (error) {
        console.log(error);
   }
   
  

   try {
    await studInfoSchema.find({}).then((data) => {
        listTable = {...listTable, enrolled: {data}};
    })
   }
   catch (error){
    console.log(error);
   }



   res.send({listTable});
})

module.exports = router;