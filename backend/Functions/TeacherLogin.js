const mongoose = require("mongoose")

const Teacher = require("../Models/Teacher")

const TeacherLogin = async (req , res) => {
    try{
        console.log(req.query)
        const isTeacher = await Teacher.findOne({"teach_id" : req.query.teach_id , "password" : req.query.password}).then((resp)=>{
            if(resp === null){
                return false;
            }
            return true;
        })
        if(isTeacher){
            res.send("true")
        }
        else{
            res.send("false")
        }
        return;
    }
    catch(err){
        res.send("err")
    }
}

module.exports = TeacherLogin