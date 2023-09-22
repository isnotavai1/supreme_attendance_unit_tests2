import "./Login.css"
import {useState , useContext} from "react"
import Axios from "axios"
import {AiFillEye} from "react-icons/ai";
import { AllContexts } from "./App";
function Login() {
  const contextObj = useContext(AllContexts)
  const [info , setInfo] = useState({
    "teach_id" : "not_yet",
    "password" : "default_password"
  })
  const [showOrHide , setShowOrHide] = useState("password");
  const submitInfo = async (obj)=>{
    // console.log(obj);
    // const params = obj;
    // console.log(params)
    await Axios.get("http://192.168.8.229:8080/TeacherLogin" ,{
      params : {"teach_id" : obj.teach_id , "password" : obj.password}
    }).then((res)=>{
      console.log(typeof(res.data))
        if(res.data === "err"){
          contextObj.provideUpdateF({
            "giveupdate" : true,
            "message" : "server error occured"
          })
        }
        else if(res.data){
          contextObj.changeLogin({
            "loggedin" : true,
            "teach_id" : obj.teach_id
          })
          contextObj.provideUpdateF({
            "giveupdate" : true,
            "message" : "Logged in Wohoo!"
          })
          contextObj.movePgs("Home")
        }
        else{
          contextObj.provideUpdateF({
            "giveupdate" : true,
            "message" : "Unable to Login :/ Wrong Credentials"
          })
        }
    }).catch((err)=>{
      console.log(err)
      contextObj.provideUpdateF({
        "giveupdate" : true,
        "message" : "some error occured while submitting"
      })
    })
  }
  return (
    <>
        <div id = "Login">
            <div id = "Form">
               <p>Teacher Id:</p>
               <input type = "text" onChange={(e)=>{setInfo({...info , "teach_id" : e.target.value})}}/>
              <p>Password:</p>
              <div>
              <input type = {showOrHide}  id = "inppass"onChange={(e)=>{setInfo({...info , "password" : e.target.value})}}/>
              <span><AiFillEye id = "eye" onClick={()=>{
                  if(showOrHide === "password"){
                    setShowOrHide("text")
                  }
                  else{
                    setShowOrHide("password")
                  }
              }}/></span>
              </div>
              <br></br>
              <div>
              <button onClick={()=>submitInfo(info)}>Submit</button>
              </div>
              
            </div>
        </div>
    </>
  )
}

export default Login
