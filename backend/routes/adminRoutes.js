const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


require("../Schema/pdfDetails"); 
const PdfDetailsSchema = mongoose.model("PdfDetails");

require("../Schema/regStudents");
const regStudentsSchema = mongoose.model("regStudents");

require("../Schema/studInfo");
const studInfoSchema = mongoose.model("studInfo");



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
                            
                            

                        };
        


    } catch (error) {
        console.log(error);
    }
    
    res.status(200).send(dashboardInfo);
})

module.exports = router;

