const mongoose = require("mongoose")

const ClassInstance = require("../Models/ClassInstance")

const GetInfoAboutInstance = async (req , res)=>{
    try{
        console.log(req.query)
        await ClassInstance.findOne({teach_id : req.query.teach_id , class_id : req.query.class_id}).then((resp)=>{
            if(resp === null){
                res.send({
                    status : false,
                    message : "NO SUCH CLASS INSTANCE IS CURRENTLY ACTIVE"
                });
                return;
            }
            res.send({
                status : true,
                message : "Successfully Fetched",
                data : resp
            });
        })
    }catch(err){
        res.send({
            status: false,
            message : "Error occured"
        })
    }
}

module.exports = GetInfoAboutInstance