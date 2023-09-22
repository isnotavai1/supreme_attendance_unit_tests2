const mongoose = require("mongoose")
const Class = require("../Models/Class")
const addClass = async (req , res) => {
    try{
        branch = req.body.branch
        year = req.body.year
        section = req.body.section
        CR = req.body.CR
        const exists = await Class.findOne({"class_id" : `${branch}_${year}_${section}`}).then((resp)=>{return resp})
        if(exists === null){
            const newClass = new Class({branch , year , section , CR  , class_id : `${branch}_${year}_${section}`});
            await newClass.save().then((resp)=>res.send("class added"))
        }  
        else{
            res.send("already exists");
        }
    }
    catch(err){
        console.log(err)
        res.send("error hogaya si :/")
    }
}

module.exports = addClass;