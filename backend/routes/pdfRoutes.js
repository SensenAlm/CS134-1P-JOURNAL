const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
require("../Schema/pdfDetails"); 
const PdfDetailsSchema = mongoose.model("PdfDetails");

require("../Schema/regStudents");
const regStudentsSchema = mongoose.model("regStudents");

require("../Schema/studInfo");
const studInfoSchema = mongoose.model("studInfo");

require("../Schema/pdfStatistics");
const pdfStatistics = mongoose.model("pdfstat");

require("../Schema/auditLogs");
const auditSchema = mongoose.model("auditLog");


 router.get('/students/manuscripts/?', (req, res) => {


    if (req.query.search === "") {
        console.log("heelo");
        PdfDetailsSchema.find({}).then((data)=> {
            res.status(200).send(data);
        })
    }
    else {
        PdfDetailsSchema.aggregate([
        {
            $search: {
                index: "SearchManuscripts",
                text: {
                    
                    path: ["title", "year", "category", "author"],
                    query: req.query.search,
                    fuzzy: {}, 
                },
                sort: {score: {$meta: "searchScore"}}
            },
        },
        {
            $project: {
                _id: 1,
                title: 1,
                author: 1,
                category: 1,
                year: 1,
                destination: 1,
                score: {$meta: "searchScore"}
                
            }   
        }
        ]).then((data) => {
            res.status(200).send(data);
        })
    }
})
     

        
        // {
        //   $project: {
        //     "_id": 0,
        //     "title": 1,
        //     score: { $meta: "searchScore" }
        //   }
        // }
      
//     if (searchVal.length === 0) {
//         if (req.params.category === "all") {
        
//             try {
//                 PdfDetailsSchema.find({ title: {$regex: req.query.search, $options: 'i' }})
//                 .then((data) => {
                    
//                     res.status(200).send(data);
//                 })
    
//             } catch (error) {
//                 res.status(400).send(error);
//             }
//         }
//         else{
//             try {
//                 PdfDetailsSchema.find({ title: {$regex: req.query.search, $options: 'i' },
//             category: req.params.category})
//                 .then((data) => {
                    
//                     res.status(200).send(data);
//                 })
    
//             } catch (error) {
//                 res.status(400).send(error);
//             }
//         }
//     }

//     else{
//         if (req.params.category != "all") {
//             try {
//                 PdfDetailsSchema.find({category: req.params.category}).then((data) => {
//                     res.status(200).send(data);
//                 });
        
//             } catch (error) {
//                 res.status(400).send();
//             } 
//         }
//         else
//         {
//             try {
//                 PdfDetailsSchema.find({}).then((data) => {
//                     res.status(200).send(data);
//                 });
        
//             } catch (error) {
//                 res.status(400).send();
//             } 
//         }
//     }
//  })

// router.post('/delete-pdf', (req, res) => {
//     const action = "Delete PDF" 
//     const date = Date.now()

//     PdfDetailsSchema.deleteOne({title: req.body.title})
//     .then(result => {
//         pdfStatistics.deleteOne({title: req.body.title})
//         .then(result => {
//             res.send({status: req.body.title+" Deleted"});
//         })
//         .catch(error => {
//             res.send(error);
//         })
        
//         auditSchema.create({
//             action: action,
//             date: date})
//     })
//     .catch(error => {
//         res.send(error);
//     })


router.post('/edit-pdf', async (req, res) => {
    const id = req.body.data._id;
    const title = req.body.data.title;
    const author = req.body.data.author;
    const category = req.body.data.category;
    const year = req.body.data.year;
    const currentYear = new Date().getFullYear();
    var isTrue = true;
    const action = "Edit PDF Detail/s" 
    const date = Date.now()

    if (!/^\d{4}$/.test(year) || year > currentYear || year === "") {
        return res.status(400).json({ status: "Invalid year! Please provide a valid 4-digit year not greater than the current year." });
    }

    if (title.trim() === "") {
        return res.status(400).json({ status: "Invalid title! Please provide a non-empty title." });
    }

    const matchedTitles = await PdfDetailsSchema.find({title: title});
    if (matchedTitles.length > 0){
        matchedTitles.forEach((title) => {
            if (title._id == req.body.data._id)
            {
                isTrue = false;
            }
        })
        
    }
    else{
        isTrue = false;
    }

    if (isTrue)
    {
        res.json({status: "There's an existing PDF with that title! Please try again."});
    }
    else {
        try {
            PdfDetailsSchema.findById(id)
                .then((data) => {
                    try {
                        pdfStatistics.findOne({title: data.title})
                        .then((data2) => {
                
                            data2.title = title;
                            data2.save();
                                    
                        });
                    }
                    catch (error) {
                        res.send(error);
                    }

                    data.title = title;
                    data.author = author;
                    data.category = category;
                    data.year = year;
                    data.save();

                    auditSchema.create({
                        action: action,
                        date: date})

                    res.send({status: "Journal Successfully Edited!"});
                });

        } catch (error) {

            res.send(error);
        }
    };
})

module.exports = router;