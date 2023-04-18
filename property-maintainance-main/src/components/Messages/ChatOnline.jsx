// import axios from "axios";
import { useEffect, useState } from "react";
import { createConversation } from "../../APIs/chatAPIs";
// import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, users, currentId, setCurrentChat, setUserSelected }) {
  // const [users, setUsers] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
console.log(onlineUsers);
// useEffect(() => {
//   const getUsers = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/users`, {
//         method: 'GET'
//       });
//       const data = await response.json();
//       if (!response.ok) {
//           throw new Error(data.message || 'Could not get users.');
//       }
//       console.log(data.users);
//       if(data.users){
//         setUsers(data.users);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getUsers();
// }, []);

  useEffect(() => {
    setOnlineFriends(users.filter((f) => onlineUsers.includes(f._id)));
  }, [users, onlineUsers]);

  const handleClick = async (user) => {
    try{
      console.log(currentId, user._id);
      const url = `http://localhost:5000/conversations/${currentId}/${user._id}`;
      const response = await fetch(url, {
          method: 'GET',
      });
      const data = await response.json();
      if (!response.ok) {
          throw new Error(data.message || 'Cannot get conversation.');
      }
      console.log(data.conversation);
      if(!data.conversation){
        console.log(currentId, user._id)
        const newConversation = await createConversation(currentId, user._id);
        console.log(newConversation);
        setCurrentChat(newConversation);
      }else{
        console.log(data.conversation);
        setCurrentChat(data.conversation);
      }
      setUserSelected(true);
    } catch(error){
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {users.map((o) => (
        <div className="chatOnlineFriend" key={o._id} onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? "http://localhost:3000/images/" + o.profilePicture
                  : "http://localhost:3000/images/" + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
