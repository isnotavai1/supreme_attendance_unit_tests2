const mongoose = require("mongoose")

const Teacher = require("../Models/Teacher")

const addTeacher = async (req , res) => {
    try{
        teach_id = req.body.teach_id
        teach_fir_name = req.body.teach_fir_name
        teach_sec_name = req.body.teach_sec_name
        password = req.body.password
        email_id = req.body.email_id
        const exists = await Teacher.findOne({
            teach_id
        }).then((resp) => {return resp})
        if(exists === null){
            const newTeacher = new Teacher({
                teach_id , teach_fir_name , teach_sec_name , password , email_id
            })
            await newTeacher.save().then((resp)=>{
                res.send("hogiya")
            })
        }
        else{
            res.send("already exists")
        }
    }catch(err){
        console.log(err)
        res.send("error hogiya")
    }
}

module.exports = addTeacher