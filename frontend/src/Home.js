import { AllContexts } from "./App"
import "./Home.css"
import { useContext } from "react"
function Home() {
  const contextObj = useContext(AllContexts)
  const performTeacherPageChange = (to) => {
    if(!contextObj.loginCreadentials.loggedin){
        contextObj.provideUpdateF({
          "giveupdate" : true,
          "message" : "Please Login First"
        })
    }
    else{
       contextObj.movePgs(to)
    }
  }
  return (
    <div id = "Home">
           <div>
           <button onClick = {()=>{performTeacherPageChange("takeA")}}>
                Take attendance
            </button>
            <button onClick = {()=>{contextObj.movePgs("giveA")}}>
                Give attendance
            </button>
            <button onClick = {()=>{performTeacherPageChange("checkA")}}>
                Check Status
            </button>
            <button onClick = {()=>{performTeacherPageChange("getstudinfo")}}>
                Get Student Info
            </button>
           </div>
    </div>
  )
}

export default Home
