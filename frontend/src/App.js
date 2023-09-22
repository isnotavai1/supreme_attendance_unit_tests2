import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';
import GiveUpdates from './GiveUpdates'
import GetStudInfo from './GetStudInfo'
import GiveA from './GiveA'
import CheckA from './CheckA'
import TakeA from './TakeA'
import {useState,createContext, useEffect} from 'react'
export const AllContexts=createContext();
function App() {
  const [pg , setPg] = useState("Home");
  const [provideUpdate , setUpdate] = useState({
    "giveupdate" : true , 
    "message" : "Welcome Hope You have a smooth experience"
  })
  const [loginCreadentials, setLoginCread] = useState({
    "loggedin" : false,
    "teach_id" : "no_id"
  })
  const movePgs=(val)=>{
    setPg(val);
  }
  const changeLogin = (obj)=>{
    setLoginCread(obj);
  }
  const provideUpdateF = (obj)=>{
    setUpdate(obj);
  }
  const DevOnlyFunc = ()=>{
    setLoginCread({
      "loggedin" : true,
      "teach_id" : "T1"
    })
    setPg("checkA")
  }
  useEffect(()=>{
    DevOnlyFunc()
  },[])
  return (
    <>
    <AllContexts.Provider value={{pg , movePgs , loginCreadentials , changeLogin , provideUpdate , provideUpdateF}}>
      <Navbar/>
      {pg == "Home" && <Home/>}
      {pg == "Login" && <Login/>}
      {provideUpdate.giveupdate && <GiveUpdates/>}
      {pg == "giveA" && <GiveA/>}
      {pg == "takeA" && loginCreadentials.loggedin && <TakeA/>}
      {pg == "checkA" && loginCreadentials.loggedin  && <CheckA/>}
      {pg == "getstudinfo" && loginCreadentials.loggedin  && <GetStudInfo/>}
      </AllContexts.Provider>
    </>
  );
}

export default App;
