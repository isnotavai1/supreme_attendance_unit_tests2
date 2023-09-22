const mongoose = require("mongoose");

const classinstance = new mongoose.Schema({
    teach_id : {
        type : String ,
        required : true
    },
    class_id : {
        type : String , 
        required : true
    },
    student_data : {
        type : [{
            roll_no : {
                type : Number ,
                required : true,
            },
            image : {
                type : String ,
                required : true
            }
        }]
    }
} , {timestamps : true})

const ClassInstance = new mongoose.model("ClassInstance" , classinstance);

module.exports = ClassInstance;