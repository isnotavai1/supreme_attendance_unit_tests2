const mongoose = require("mongoose")

const ClassInstance = require("../Models/ClassInstance")
const Student = require("../Models/Student")
const AddStudentToInstance =async (req , res)=>{
    try{
        const obj = {teach_id : req.body.teach_id , class_id : req.body.class_id , roll_no : req.body.roll_no}
        obj.roll_no = Number(obj.roll_no)
        const check_existence = await ClassInstance.findOne({teach_id : obj.teach_id , class_id : obj.class_id})
        .then((resp)=>{
            if(resp===null){
                return false;
            }
            return true;
        })
        .catch((err)=>{
            return false;
        })
        if(!check_existence){
            res.send({
                status : false,
                message : "Unable To Find Class"
            })
            return;
        }
        const check_timing = await ClassInstance.findOne({teach_id : obj.teach_id , class_id : obj.class_id})
        .then((resp)=>{
            const cur_time = +new Date().getTime();
            if(cur_time >= +resp["createdAt"].getTime() + 300000){
                res.send({
                    status : false,
                    message : "Class Is No Longer Accepting Responses"
                })
                return false;
            }
            return true;
        })
        .catch((err)=>{
            res.send({
                status : false,
                message : "Error while Checking Class Availability.."
            })
            return false;
        })
        if(!check_timing)return;
        const CheckStudent =  await  Student.findOne({class_id : obj.class_id , roll_no :obj.roll_no}).then((resp)=>{
                if(resp === null){
                    res.send({
                        status : false,
                        message : "No Such Student Exists"
                    })
                    return false;
                }
                // console.log(resp)
                return true;
            }).catch((err)=>{
                res.send({
                    staus : false,
                    message : "Unable to Find Student Details"
                })
                return false;
            })
        if(!CheckStudent)return;
        const done = await ClassInstance.findOneAndUpdate({teach_id : obj.teach_id , class_id : obj.class_id  , "student_data.roll_no" : obj.roll_no}, 
            { $set : {
                "student_data.$.image" : req.body.image
        }
        }).then((resp)=>{
            if(resp === null){
                return false;
            }
            res.send({
                status : true,
                message : "Picture Updated SuccessFully",
                image : req.body.image
            })  
            return true;
        })
        if(!done){
            await ClassInstance.findOneAndUpdate({teach_id : obj.teach_id , class_id : obj.class_id} , {
                $push : {student_data : {roll_no : obj.roll_no , image : req.body.image}}
            }).then((resp)=>{
                res.send({
                    staus : true,
                    message : "Added Your Data",
                    image : req.body.image
                })
                return;
            })
        }
    }catch(err){
            res.send({
                staus : false,
                message : "error occured white Making Changes"
            })
    }
}

module.exports = AddStudentToInstance