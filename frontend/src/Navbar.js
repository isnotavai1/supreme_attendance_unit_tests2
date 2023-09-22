import './Navbar.css'
import { useContext } from 'react'
import { AllContexts } from './App'
function Navbar() {
  const context_obj = useContext(AllContexts);
  return (
    <div className='navbar'>
       <div id='navbar-name' onClick={()=>{
        context_obj.movePgs("Home")
       }}>
            Attendance supreme
       </div>
       <div id = 'navbar-login'>
            {!context_obj.loginCreadentials.loggedin &&  <button onClick={()=>{
              context_obj.movePgs("Login")
            }}>Login</button>}
            {context_obj.loginCreadentials.loggedin && <button onClick={()=>{
              context_obj.changeLogin({
                "loggedin" : false , "teacher_id":"no_id"
              })
              context_obj.movePgs("Home")
            }}>Logout</button>}
       </div>
    </div>
  )
}

export default Navbar
