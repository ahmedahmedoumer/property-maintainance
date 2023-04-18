import Spinner from "../UI/Spinner";
import { useEffect, useContext, useState, useRef } from "react";
import UserItem from "./UserItem";
import Search from "./Search";
import { ChatContext } from "../../store/chat-context";
// import { useMediaQuery } from 'react-responsive';
import Toast from "../UI/Toast";
import "../../index.css";
// import conversations from "./Chats";
// import ChatItem from "./ChatItem";
// import ChatOnline from "./ChatOnline";
import { AuthContext, useAuth } from "../../store/AuthContext";
import { getConversations } from "../../APIs/chatAPIs";

// import { setDoc, getDoc} from "firebase/firestore";
const UsersList = (props) => {
  const { socket, className, currentChat, setCurrentChat, userSelected, setUserSelected } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [users, setUsers] = useState([]);
  const { user } = useAuth();

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
    async function fetchData () {
      const conversations = await getConversations(user._id);
      console.log(conversations);
      setConversations(conversations);
    }
    fetchData();
  }, []);

  
  // const handleSelect = useCallback(async (user) => {
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;
  //       console.log(combinedId);
  //   dispatch({ type: "CHANGE_USER", payload: user });
  //   setUserSelected(true);
  // },[dispatch, setUserSelected, setSidebarShown]);
  // useEffect(() => {
  //   user && handleSelect(user);
  // }, [handleSelect, user])
  return (
    <div className={`scroll5 ${className}`}>
      <div className='pt-5 h-full w-full bg-clip-padding bg-opacity-25 text-slate-600 bg-slate-300'>
        <Search user={user} /*selectUserHandler={handleSelect}*/ setUserSelected={setUserSelected}/>
        {/* {!isLoggedIn && <p>Please <Link to="/login">login</Link> to your account</p>} */}
      <div className="mt-4">
        {(!isLoading && error) && <p>Couldn't fetch users</p>}
        {/* Sort by date */}
        {conversations && conversations.map((chat) => (
          // chat.lastMessage &&
            <UserItem
              key={chat._id}
              id={chat._id}
              chat={chat}
              setUser={props.setUser}
              currentUser={user}
              onClick={() => setCurrentChat(chat)}
            />
          ))
        }
      </div>
      </div>
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
    </div>
  )
}

export default UsersList;