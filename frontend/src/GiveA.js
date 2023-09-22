import "./GiveA.css"
import React , {useState ,useRef, useContext, useEffect} from 'react'
import Webcam from "react-webcam";
import Axios from "axios"
import { AllContexts } from "./App";
function GiveA() {
  const context_obj = useContext(AllContexts)
  const [picture, setPicture] = useState('')
  const [userdets , setUserdets] = useState({"roll_no" : 6969 , "class_id" : "code" , "teach_id" : "teach_id"})
  useEffect(()=>{
    context_obj.provideUpdateF({
      "giveupdate" : true,
      "message" : "Make sure to have a bright photo and your head is in position looking straight at camera." 
    })
  },[])
const webcamRef = useRef(null)
const HandleSubmit = React.useCallback(() => {
  const pictureSrc = webcamRef.current.getScreenshot()
  // console.log(pictureSrc)
  let base64 = get_base64(pictureSrc);
  if(base64 === -1){
      context_obj.provideUpdateF({
        "giveupdate" : true,
        "message" : "Unable to Generate Image..." 
      })
      return;
  }
  AddStudent(base64)
})
const AddStudent =  async (img)=>{
  console.log("posting...")
  await Axios.post("http://192.168.8.229:8080/AddStudentToInstance" , {...userdets,"image" : img}).then((resp)=>{
      if(resp.data.status){
        context_obj.provideUpdateF({
          "giveupdate" : true,
          "message" : resp.data.message
        })
        setPicture("data:image/jpeg;base64,"+resp.data.image);
      }
      else{
        context_obj.provideUpdateF({
          "giveupdate" : true,
          "message" : resp.data.message 
        })
      }
  }).catch((err)=>{
    context_obj.provideUpdateF({
      "giveupdate" : true,
      "message" : "error occured..." 
    })
  })
 
}
//There are some cases not taken care of
const get_base64 =(picture)=>{
    let at = -1;
    for(let i = 0 ; i < picture.length ; ++i){
        if(picture.substring(i , i + 7) === "base64,"){
          let ans = "";
          for(i = i + 7 ; i < picture.length ; ++i){
              ans += picture[i];
          }
          return ans;
        }
    }
    return -1;
}

  return (
    <div id = "GiveA">
        <div id = "GiveAFormPart">
            <p>Teachers Id: </p>
            <input type = "text" onChange={(e)=>setUserdets({...userdets , "teach_id" : e.target.value})}/>
            <p>Class Id: </p>
            <input type = "text" onChange={(e)=>setUserdets({...userdets , "class_id" : e.target.value})}/>
            <p>Roll NO.</p>
            <input type="Number" onChange={(e)=>setUserdets({...userdets , "roll_no" : e.target.value})}/>
           
            
        </div>
        <div id = "CameraPart">
        {picture == '' ?  <Webcam
            audio={false}
            ref={webcamRef}
            id = "webcam"
            screenshotFormat="image/jpeg"
          />: <img src={picture}/>}
        </div>
        <br></br>
        {picture == '' && <div id = "GiveAbut"><button onClick={(e)=>{e.preventDefault() ; HandleSubmit() }}>Submit</button></div>}
    </div>
  )
}

export default GiveA
