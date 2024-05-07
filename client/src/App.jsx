import { useEffect, useState } from 'react'
import Input from './Components/Input'
import io from 'socket.io-client';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login'




function App() {
  const [count, setCount] = useState()
  var id=''
  const socket = io('http://localhost:3000')
  useEffect(()=>{
   
    socket.on('connect',()=>{
      console.log("web socket connected successfully")
      console.log(socket.id);
      socket.emit('getId',socket.id)
      id=socket.id
      
    })
    
    return () => {
      // socket.disconnect();
      console.log("WebSocket disconnected");
    };

  },[socket])
  const sendMessage=()=>{
    console.log(count)
    socket.emit('message',id)
    setCount('')
  }
  

  return (
    <>
     {/* <Input state={count}sendMessage={sendMessage} setCount={setCount}/>  */}
     {/* <Signup/> */}
     <Login/>
    </>
  )
}

export default App
