const mongoose = require("mongoose")

const Class = require("../Models/Class")

const GetAllClasses = async (req , res) => {
    try{
        await Class.find().then((resp) => {
            const ClassList = []
            resp.forEach((cur_class)=>{
                ClassList.push(cur_class.class_id)
            })
            res.send(ClassList)
        })
    }catch(err){
        res.send([])
    }
}
module.exports = GetAllClasses