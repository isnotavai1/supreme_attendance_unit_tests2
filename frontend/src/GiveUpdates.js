import "./GiveUpdates.css"
import { useContext , useEffect } from "react"
import { AllContexts } from "./App"
function GiveUpdates() {
  const context_obj = useContext(AllContexts)
  useEffect(()=>{
    setTimeout(()=>{
      context_obj.provideUpdateF({"giveupdate":false , message : "nothing new"})
    },2000);
  } , []);
  return (
    <div id = "GiveUpdates">
      <div>{context_obj.provideUpdate.message}</div>

</div>
  )
}

export default GiveUpdates
