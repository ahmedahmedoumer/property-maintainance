import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
import Conversation from "./Chats";
import Message from "./ChatItem";
import ChatOnline from "./ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, useAuth } from "../../store/AuthContext";

export default function Messenger({socket}) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [userSelected, setUserSelected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const scrollRef = useRef();

  console.log(socket);
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(), 
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    console.log(user);
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        users.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/conversations/find/${user._id}`, {
          method: 'GET'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get conversations.');
        }
        console.log(data.conversations);
        if(data.conversations.length){
          setConversations(data.conversations);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users`, {
          method: 'GET'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get users.');
        }
        console.log(data.users);
        if(data.users){
          setUsers(data.users);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/messages/${currentChat?._id}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not update service.');
        }
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newMessage === ''){
      return;
    }
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log(user._id,receiverId,newMessage,);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

      // const res = await axios.post("/messages", message);
      
    fetch(`http://localhost:5000/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
          'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if(res.ok){
          return res.json();
      }else{
        return res.json().then((data) => {
          console.log(data);
          let errorMessage = 'Error on sending message!';
          if (data && data.error || data.error.message) {
              errorMessage = data.error.message || data.error;
          }
          throw new Error(errorMessage);
        });
      }
    }).then((data) => {
      setMessages([...messages, data]);
      setNewMessage("");

    }).catch(err => {
      console.log(err);
    })

  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {userSelected ? (
              <>
                <div className="chatBoxTop">
                  {!messages.length && <p>No chats</p>}
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              users={users}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
              setUserSelected={setUserSelected}
            />
          </div>
        </div>
      </div>
    </>
  );
}
