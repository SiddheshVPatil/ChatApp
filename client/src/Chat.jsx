import './Chat.css';
import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'; 
export default function Chat({socket,username,roomid}) {

    const [message,setmessage]=useState("")
    const [messagelist,setmessagelist]=useState([])

    const send_message= async()=>{
        if(message!==""){
            const messagedata={
                room:roomid,
                author:username,
                message:message,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
            }

            await socket.emit('send_message',messagedata)
            setmessagelist((list) => [...list, messagedata]);

        }
    }

    // useEffect(()=>{
    //     socket.on('recieve_message',(data)=>{
    //         // console.log(data)
    //         setmessagelist((list)=>[...list,data])
    //     })


    // },[socket])

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setmessagelist((list) => [...list, data]);
        };
    
        socket.on('recieve_message', handleReceiveMessage);
    
        // Cleanup to prevent duplicate listeners
        return () => {
            socket.off('recieve_message', handleReceiveMessage);
        };
    }, [socket]);

  return (
    <div className='chat_window'>
      <div className='header'>
        Chat
      </div>
      <div className='chat_body'>
        <ScrollToBottom className='container'>
        {messagelist.map((msg)=>{
            return (
                <div className='msg_box'>

                    {/* <p className='auth'>{msg.author}</p> */}
                    <p className='msg'  id={username===msg.author?"green":"blue"}>{msg.message}</p>
                    <p className='time'>{msg.author}{msg.time}</p>
                </div>
        )

        })}
        </ScrollToBottom>
      </div>
      <div className='footer'>
        <input type="text" placeholder='hey..' onChange={(event)=>{setmessage(event.target.value)}}/>
        <button onClick={send_message}>Send</button>
      </div>
    </div>
  )
}
