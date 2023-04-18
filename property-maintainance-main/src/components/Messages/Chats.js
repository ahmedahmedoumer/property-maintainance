import React, { useEffect, useState, useContext, useRef } from 'react';
import ChatItem from './ChatItem';
// import { onSnapshot, serverTimestamp, doc, arrayUnion, Timestamp, updateDoc } from 'firebase/firestore';
import Spinner from '../UI/Spinner';
// import { db} from '../../firebase';
import { useAuth } from "../../store/AuthContext";
import { ChatContext } from '../../store/chat-context';
import { v4 as uuid } from "uuid";
import noChatFound from "../../assets/no-chats.svg";
import chatBg from "../../assets/chat-bg.jpg";
import { ArrowLeftShort } from 'react-bootstrap-icons';
import useFocus from '../../hooks/use-focus';
import { getMessages, sendMessage } from '../../APIs/chatAPIs';
const Chats = (props) => {
  const { currentChat, socket, user } = props;
  console.log(socket);
  console.log(user);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useAuth();
  // console.log(currentUser);
  // const { sidebarShown, setSidebarShown, setUserSelected } = props;
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const { currentUser } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessageText] = useState('');
  // const { data } = useContext(ChatContext);
  const [inputRef, setInputFocus] = useFocus();
  const scrollRef = useRef();
  useEffect(() => {
    console.log("AA");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(), 
      });
    });
  }, []);

  useEffect(() => {
    console.log(arrivalMessage);
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
      console.log(arrivalMessage, currentChat);
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   console.log(user);
  //   socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(
  //       users.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const messages = await getMessages(currentChat?._id);
      console.log(messages);
      setMessages(messages);
    };
    fetchData();
  }, [currentChat]);
  
  const handleSend = async (e) => {
    e.preventDefault();
    if(newMessage === ''){
      return;
    }
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    console.log(message);
    const receiverId = user._id;
    console.log(currentUser._id,receiverId,newMessage);
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });

    await sendMessage(message, messages, setMessages, setNewMessage);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

return (
    <div className={`message rounded-r-3xl h-screen m-0 overflow-y-auto w-full flex flex-col ${props.className}`} style={{backgroundImage: `url(${chatBg})`, backgroundRepeat: "repeat", backgroundSize: "contain"}}>
        {/* Top */}
        <div className="message-header sticky top-0 p-2 w-full flex text-slate-600 bg-opacity-10 bg-slate-300" style={{backdropFilter: `blur(5px)`}}>
            {/* Back button */}
            {/* <button onClick={() => {setSidebarShown(true); setUserSelected(false); props.setUser(null);}} className="sm:hidden mr-2"><ArrowLeftShort className="w-6 h-6"/></button> */}
            <div className='flex items-center'>
                <img className="ml-2 w-10 h-10 rounded-full object-cover" src={
                    user?.profilePicture
                    ? "http://localhost:3000/images/" + user.profilePicture
                    : "http://localhost:3000/images/person/noAvatar.png"
                  } alt='User profile'/>
                <div className="ml-2 flex flex-col items-start text-sm">
                    <p className="font-semibold">{user?.firstName + ' ' + user?.lastName}</p>
                    {/* <p className="font-semibold">Client name</p> */}
                </div>
            </div>
        </div>
        {/* Middle */}
        <div className={`message-content relative p-1 block overflow-y-auto justify-end ${error && "justify-center items-center"} w-full h-full`}>
            {error && <p className='font-semibold text-sm'>{error}</p>}
            {(!error && isLoading) && <Spinner type='main'/>}
            {(!error && !isLoading && !messages.length) && <div className='m-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'><img className='w-[150px]' src={noChatFound} alt=''/><p className='text-sm text-center mt-2 font-semibold text-slate-600'>No messages yet</p></div>}
            {(!error && !isLoading) && messages.map((message) => (
              <div ref={scrollRef} key={message._id}>
                <ChatItem message={message} key={message._id} own={message.sender === user._id}/>
              </div>
            ))}
        </div>
        {/* Bottom */}
        <form className="w-full sticky bottom-0 p-[3px] flex bg-opacity-10 bg-slate-300" style={{backdropFilter: `blur(5px)`}} onSubmit={handleSend}>
            <textarea ref={inputRef} id="chat" autoFocus={true} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} rows="1" className="resize-none bg-inherit outline-none block p-2.5 w-full text-sm text-slate-600 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a message..."></textarea>
            <button type="submit" className="inline-flex justify-center p-2 text-[#14A9F9] hover:text-[#145cf9] hover:bg-slate-200 cursor-pointer  dark:text-blue-500 dark:hover:bg-gray-600">
                <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                <span className="sr-only">Send</span>
            </button>
        </form>
    </div>
  )
}

export default Chats;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import "./conversation.css";

// export default function Conversation({ conversation, currentUser }) {
//   const [user, setUser] = useState(null);
// //   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
// // console.log(conversation, currentUser);
//   // useEffect(() => {
//   //   const friendId = conversation.members.find((m) => m !== currentUser._id);

//   //   const getUser = async () => {
//   //     try {
//   //       const response = await fetch(`/users?userId=${friendId}`, {
//   //           method: 'GET',
//   //       });
//   //       const data = await response.json();
//   //       if (!response.ok) {
//   //           throw new Error(data.message || 'Could not update service.');
//   //       }
//   //       // const res = await axios();
//   //       console.log(response.data)
//   //       setUser(response.data);
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   };
//   //   getUser();
//   // }, [currentUser, conversation]);

  // return (
  //   <div className="conversation">
  //     <img
  //       className="conversationImg border"
  //       src={
  //         user?.profilePicture
  //           ? "http://localhost:3000/images/" + user.profilePicture
  //           : "http://localhost:3000/images/person/noAvatar.png"
  //       }
  //       alt=""
  //     />
  //     <span className="conversationName">{user?.username}</span>
  //   </div>
  // );
// }
