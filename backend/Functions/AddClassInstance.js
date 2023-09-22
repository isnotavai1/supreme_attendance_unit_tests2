const mongoose = require("mongoose")

const ClassInstance = require("../Models/ClassInstance")

const AddClassInstance = async (req , res) => {
    try{
        const check_existance = await ClassInstance.findOne({teach_id : req.body.teach_id , class_id : req.body.class_id}).then((resp)=>{
                if(resp === null)return true;
                return false;
        }).catch((err)=>{return false});
        if(!check_existance){
            res.send("Already Exists");
            return;
        }
        const newClassInstance = new ClassInstance({
            teach_id : req.body.teach_id , class_id : req.body.class_id
        })
        await newClassInstance.save().then((resp)=>{
            res.send(true)
            return
        }).catch((err)=>{
            res.send("err")
            return
        })
    }catch(err){
        res.send("err")
    }   
}

module.exports = AddClassInstance