import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './chat.css'

import InfoBar from '../infobar/InfoBar'
import Input from '../input/Input'
import Messages from '../messages/Messages'
import Peoples from '../peoples/Peoples'

let socket;
const ENDPOINT = 'localhost:4000';

const Chat = (props) => {

    const [name, setName] = useState();
    const [room, setRoom] = useState();
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [users,setUsers] = useState([]);
    

    useEffect(() => {
        const data = queryString.parse(props.location.search)
        socket = io(ENDPOINT);
        setName(data.name)
        setRoom(data.room)
        socket.emit('join',{name:data.name,room:data.room},(error)=>{
            if(error){
                alert(error)
            }
            if(error){
                        props.history.push('/')
            }
        })
        return ()=>{
            socket.emit('disconnect')
            socket.off();
        }
    }, [props.location.search,props.history])


    useEffect(()=>{
        console.log('hook 2 working')
        socket.on('message',(message)=>{
            setMessages([...messages,message])
            console.log('message hook')
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    },[messages])


    const sendMessage = (e)=>{
        e.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>{
                setMessage('');
            })
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                    <Messages messages={messages} name={name}/>
                    <Input className="alignEnd" message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
                <Peoples users={users}/>
        </div>
        );
    }

export default Chat
