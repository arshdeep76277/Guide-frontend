import './App.css';
import {useEffect, useState} from 'react';
import Login from './components/login/Login';
import Home from './components/Home/Home'
function App() {
   const [user,setUser]=useState("");
   useEffect(()=>{
       if(localStorage.getItem('userData')!==null){
         setUser(JSON.parse(localStorage.getItem('userData')).userId);
       }
   },[]);
   if(user!==""){
     return <Home className="app" user={user}/>
   }
   return <Login setUser={setUser}/>
}

export default App;
