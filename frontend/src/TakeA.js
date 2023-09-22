import { useState , useContext , useEffect} from "react"
import Axios from "axios";
import { AllContexts } from "./App"
import "./TakeA.css"
function TakeA() {
  const [classes , setClasses] = useState(["HOLD1" , "HOLD2"]);
  const [selectedClass , setSelectedClass] = useState("HOLD1")
  const context_obj = useContext(AllContexts)
  useEffect(()=>{
    Axios.get("http://192.168.8.229:8080/getClasses").then((res)=>{
        setClasses(res.data);
        setSelectedClass(res.data[0])
    }).catch((err)=>{
        context_obj.provideUpdateF({
          "getupdate" : true,
          "message" : "FAILED TO RETRIEVE DATA"
        })
        console.log("error occured")
    })
  } , []);
  const SelectValues = classes.map(classVal => {
    return <option value={classVal} key={classVal}>{classVal}</option>
  }) 
  const AddThisClass = (teach_id , class_id) => {
      Axios.post("http://192.168.8.229:8080/AddClassInstance" , {
          teach_id , class_id
      }).then((res)=>{
        if(res.data == "err"){
            context_obj.provideUpdateF({
              "giveupdate" : true,
              "message" : "Server Responded with error"
            })
        }
        else if(res.data === true){
            context_obj.provideUpdateF({
              "giveupdate" : true,
               "message" : "Added Class Instance"
            })
          }
          else{
            context_obj.provideUpdateF({
              "giveupdate" : true,
               "message" : "Validation Error or some Issue"
            })
          }
        }).catch((err)=>{
          context_obj.provideUpdateF({
            "giveupdate" : true,
             "message" : "Error While Sending Request"
          })
        })
  }
  return (
    <div id = "TakeA">
        <div id = "TakeAForm">
            <p>Class id:</p>
            <select value={selectedClass} onChange={(e)=>setSelectedClass(e.target.value)}>
                {SelectValues}
            </select>
            <br></br>
            <div><button onClick={()=>{AddThisClass(context_obj.loginCreadentials.teach_id , selectedClass)}}>Add Class </button></div>
        </div>
    </div>
  )
}

export default TakeA
