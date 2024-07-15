const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");


require("../Schema/regStudents");
const regStudentsSchema = mongoose.model("regStudents");

require("../Schema/studInfo");
const studInfoSchema = mongoose.model("studInfo");

router.get('/getCredentials/?', async (req, res) => {
    const lrn = req.query.lrn;

    if (lrn === ""){
        try {
            await regStudentsSchema.find({})
            .then((data) => {
                res.send(data);
            })
        } catch (error) {
            res.send(error);
        }
    }

    else {
        try {
            await regStudentsSchema.find({lrn: {$regex: lrn, $options: 'i' }}).then((data) => {
                res.send(data);
                });

        } catch (error) {
            console.log(error);
        }
    }
})

router.get("/studentStatus/?", async (req, res) => {
    var listTable = {};

    const lrn = req.query.lrn;
    console.log(lrn);
    
    if(lrn === ""){
        try {
            await regStudentsSchema.find().then((data) => {
                listTable = {register: {data}};
                });
    
            } catch (error) {
                console.log(error);
            }
        
        
    
            try {
                await studInfoSchema.find().then((data) => {
                    listTable = {...listTable, enrolled: {data}};
                })
            }
            catch (error){
                console.log(error);
            }
    
    
    
        res.send({listTable});
    }
    else {
        try {
            await regStudentsSchema.find({lrn: {$regex: lrn, $options: 'i' }}).then((data) => {
                listTable = {register: {data}};
                });

        } catch (error) {
            console.log(error);
        }
    
    

        try {
            await studInfoSchema.find({lrn: {$regex: lrn, $options: 'i' }}).then((data) => {
                listTable = {...listTable, enrolled: {data}};
            })
        }
        catch (error){
            console.log(error);
        }



        res.send({listTable});
    }
})


module.exports = router;