if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: false , limit : '50mb' }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: "POST, PUT, PATCH, GET, DELETE, OPTIONS",
    headers: "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
  }));
const makeConnection = require('./config/makeConnection');
const addClass = require("./AdminFunctions/addClass");
const addTeacher = require("./AdminFunctions/addTeacher");
const addStudent = require("./AdminFunctions/addStudent");
const TeacherLogin = require("./Functions/TeacherLogin");
const GetAllClasses = require("./Functions/GetAllClasses");
const AddClassInstance = require("./Functions/AddClassInstance");
const GetInfoAboutInstance = require("./Functions/GetInfoAboutInstance");
const AddStudentToInstance = require("./Functions/AddStudentToInstance");
makeConnection(process.env.DB_CONNECTION);
//Admin Requests Are Here
app.get("/",(req , res)=>{
    console.log(req.body)
    res.json({"hello" : "world"});
})
app.post("/addclass" , (req , res)=>{
    addClass(req , res)
})
app.post("/addTeacher" , (req , res)=>{
    addTeacher(req , res);
})
app.post("/addStudent",(req , res)=>{
    addStudent(req , res)
})





//Admin Requests End

//Actual Functions
app.get("/TeacherLogin" , (req , res) => {
    TeacherLogin(req , res)
})
app.get("/getClasses" , (req , res) => {
    GetAllClasses(req , res);
})
app.post("/AddClassInstance",(req , res)=>{
    AddClassInstance(req , res);
})
app.get("/GetInfoAboutInstance" , (req , res) => {
    GetInfoAboutInstance(req , res);
})
app.post("/AddStudentToInstance",(req , res)=>{
    AddStudentToInstance(req , res);
})
//Actual Functions end
app.listen(process.env.PORT , '192.168.8.229' || 'localhost',()=>{
    console.log("server active on " , process.env.PORT)
})