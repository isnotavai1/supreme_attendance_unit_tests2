const mongoose = require("mongoose")

const Student = require("../Models/Student")
const Class = require("../Models/Class")
const addStudent = async (req , res) => {
    try{
        class_id = req.body.class_id
        roll_no = req.body.roll_no
        stu_fir_name = req.body.stu_fir_name
        stu_last_name = req.body.stu_last_name
        default_img  = req.body.default_img
        email_address = req.body.email_id
        console.log(req.body)
        const checkClass = await Class.findOne({class_id}).then((resp)=>{
            if(resp === null){
                res.send("No such class Exists");
                return false;
            }
            return true;
        }).catch((err)=>{
            res.send("error occured");
            return false;
        })
        if(!checkClass)return;
        const exists = await Student.findOne({class_id , roll_no}).then((resp) => {return resp})
        if(exists === null){
            const newStudent = new Student({
                class_id , roll_no , stu_fir_name , stu_last_name , default_img , email_address
            })
            await newStudent.save().then((resp)=>{
                res.send("student added")
                return 
            }).catch((err)=>{
                console.log(err)
                res.send("error occured")
            })
        }
        else{
            res.send("already exists")
            return
        }
    }
    catch(err){
        // console.log(req.body)
        res.send("error horiya hai")
        return
    }
}

module.exports = addStudent