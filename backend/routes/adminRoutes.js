const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


require("../Schema/pdfDetails"); 
const PdfDetailsSchema = mongoose.model("PdfDetails");

require("../Schema/regStudents");
const regStudentsSchema = mongoose.model("regStudents");

require("../Schema/studInfo");
const studInfoSchema = mongoose.model("studInfo");


require("../Schema/entryLogs");
const entrySchema = mongoose.model("entrylog");


router.get('/admin-dashboard', async (req, res)=> {
    var dashboardInfo = {};

    try {
        
        dashboardInfo = {
                            manuscript:
                            {
                                Total: await PdfDetailsSchema.find({}).count(),
                                Category: {
                                    Mathematics: await PdfDetailsSchema.find({category: "Mathematics"}).count(),
                                    Life_Science: await PdfDetailsSchema.find({category: "Life Science"}).count(),
                                    Social_Science: await PdfDetailsSchema.find({category: "Social Science"}).count(),
                                    Physical_Science: await PdfDetailsSchema.find({category: "Physical Science"}).count(),
                                    Robotics: await PdfDetailsSchema.find({category: "Robotics"}).count(),
                                }


                            },
                        
                            student:
                            {
                                Total: {
                                    registered: await regStudentsSchema.find({}).count(),
                                    enrolled: await studInfoSchema.find({}).count()
                                }
                            },

                            logs:
                            {
                                student: await entrySchema.find({user: "Student"}),
                                admin: await entrySchema.find({user: "Admin"})
                            }

                        };
        


    } catch (error) {
        console.log(error);
    }
    
    res.status(200).send(dashboardInfo);
})


router.post("/admin/userEntry", async (req, res) => {
    const ip = req.body.data.ip;
    const network = req.body.data.network;
    const lat = req.body.data.latitude;
    const long = req.body.data.longitude;
    const city = req.body.data.city;
    const region = req.body.data.region;
    const date = new Date();
    const user = req.body.user;
    const action = req.body.action;

    console.log(req.body);
    try {
        await entrySchema.create({
            ip: ip,
            network: network,
            latitude: lat,
            longitude: long,
            city: city,
            region: region,
            user: user,
            action: action,
            date: date
        })

        res.status(200).send();        
    } catch(err) {
        res.status(400).send(err);
    }
    
})


module.exports = router;

