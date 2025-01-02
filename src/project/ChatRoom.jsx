import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;
const ChatRoom = () => {

    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:1901/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
  
  return (
    <div className="bg-yellow-200 flex justify-center size-4/5 rounded-2xl">
        {userData.connected?
        <div className="bg-slate-700 rounded-lg p-3 size-full flex-row justify-center">
            <div className="member-list flex-row ">
                <ul className='flex justify-center'>
                    <li onClick={()=>{setTab("CHATROOM")}} className='bg-green-200 w-fit p-1 rounded-lg font-semibold hover:cursor-pointer mx-1'>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className='bg-red-200 w-fit p-1 rounded-lg font-semibold hover:cursor-pointer  mx-1' key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className='flex-row h-full relative'>
              <div className='h-4/6 w-3/4 bg-lime-100 overflow-scroll mx-auto my-2'>
                <ul className=''>
                  {publicChats.map((chat,index)=>(
                    <li key={index} className='bg-green-400 rounded-xl w-fit px-3 py-1 mb-1 ml-1'>
                      {chat.senderName !== userData.username && 
                      <div>
                        <div className='font-bold text-purple-600'>{chat.senderName}</div>
                        <div>{chat.message}</div>
                      </div>
                      }
                      
                      {chat.senderName === userData.username &&
                      <div>
                        <div className='font-bold text-white'>You</div>
                        <div className='text-'>{chat.message}</div>
                      </div>
                      }
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center p-2 absolute w-full">
                    <input type="text" className="w-4/6 rounded-lg p-1 text-slate-400" placeholder="enter the message here" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="bg-green-400 p-2 rounded-lg font-bold text-white hover:bg-sky-700" onClick={sendValue}>send</button>
                </div>         
              </div>}
              {/* done css till here basic */}
            
            {tab!=="CHATROOM" && <div className="chat-content flex-row h-full relative">
                <div className='h-4/6 w-3/4 bg-lime-100 overflow-scroll mx-auto my-2'>
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className='{`message ${chat.senderName === userData.username && "self"}`} bg-green-400 rounded-xl w-fit px-3 py-1 mb-1 ml-1' key={index}>
                            {chat.senderName !== userData.username && 
                            <div>
                              <div className='font-bold text-purple-600'>{chat.senderName}</div>
                              <div className="message-data">{chat.message}</div>
                            </div>}
                            
                            {chat.senderName === userData.username && 
                            <div>
                              <div className='font-bold text-white'>You</div>
                              <div className="message-data">{chat.message}</div>
                            </div>}
                        </li>
                    ))}
                </ul>
                </div>
                <div className="flex justify-center p-2 absolute w-full">
                    <input type="text" className="w-4/6 rounded-lg p-1 text-slate-400" placeholder="enter the message" value={userData.message} onChange={handleMessage}/> 
                    <button type="button" className="bg-green-400 p-2 rounded-lg font-bold text-white hover:bg-sky-700" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="space-x-2 content-center">
            <input
                className='rounded-lg px-5 py-2 border-4 border-gray-400'
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
              <button className='bg-green-900 px-5 py-2 rounded-lg text-white font-bold hover:bg-sky-700' type="button" onClick={registerUser}>
                    Register
              </button> 
        </div>}
    </div>
  )
}

export default ChatRoom