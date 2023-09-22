import {useState , useContext} from "react"
import { AllContexts } from "./App"
import Axios from "axios"
import "./CheckA.css"
function CheckA() {
  const context_obj = useContext(AllContexts)
  const [endTime , setEndTime] = useState({
    "minute" : 69,
    "second" : 69
  })
  const [classId , setClassId] = useState("")
  const GetStatus = async (teach_id , class_id) => {
    let cur = class_id.toUpperCase();
    console.log(cur , teach_id)
      await Axios.get("http://192.168.8.229:8080/GetInfoAboutInstance",{
        params : {teach_id , class_id:cur}
      }).then((resp)=>{
        console.log(resp);
        if(resp.status){
          let date = new Date(resp["data"]["data"]["createdAt"])
          setEndTime({
            "minute" : new Date(date.getTime() + 5 * 60000).getHours(),
            "second" : new Date(date.getTime() + 5 * 60000).getMinutes(),
          })
        }
        else{
          context_obj.provideUpdateF({
            "giveupdate" : true,
            "message" : resp.data.message 
          })
        }
      }).catch(err=>{
        context_obj.provideUpdateF({
          "giveupdate" : true,
          "message" : "Unable To Fetch Check Connections Please" 
        })
      })
  }
  return (
    <div id = "checkA">
        <div id = "TopBar">
          <input type = "text" id = "CheckAcid" placeholder="Class ID"  onChange = {(e)=>{setClassId(e.target.value)}}/>
          <button onClick = {()=>{
              GetStatus(context_obj.loginCreadentials.teach_id , classId)
          }}>Get Status</button>          
        </div>
        <div id = "CheckATime">
        <p>Ends At: <span>{(endTime.minute - (endTime.minute % 10)) / 10}</span><span>{((endTime.minute % 10))}</span> : <span>{(endTime.second - (endTime.second % 10)) / 10}</span><span>{((endTime.second % 10))}</span></p>
        </div>
    </div>
  )
}

export default CheckA
