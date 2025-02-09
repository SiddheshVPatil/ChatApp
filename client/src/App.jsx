import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './chat'

const socket = io.connect("http://localhost:3001")



function App() {
  const [username, setusername] = useState("")
  const [roomid, setroomid] = useState("")


  const joinroom = ()=>{
    if(username!=="" && roomid!=="")
    {
      socket.emit('join_room',roomid)
    }
  }


  return (
    <>
    <div className='app'>
      <h1>Join chat</h1>
      <input type='text' placeholder='name' onChange={(event)=>{setusername(event.target.value)}}/>
      <input type='text' placeholder='room id' onChange={(event)=>{setroomid(event.target.value)}}/>
      <button onClick={joinroom}>Join</button>

      

      <Chat socket={socket} username={username} roomid={roomid} />
    </div>
      
    </>
  )
}

export default App
