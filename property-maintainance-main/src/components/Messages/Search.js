import React, {  useState, useEffect, useCallback } from "react";
// import {
//   setDoc,
//   doc,
//   // updateDoc,
//   // serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { db } from '../../firebase'
// import { useAuth } from "../../store/auth-context";
import { Input } from "@material-tailwind/react";
// import { searchUsers } from "../../api/userApi";
const Search = (props) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  // const { currentUser } = useAuth();
  // const { user, setUserSelected, selectUserHandler } = props;
  
  const handleKey = async (e) => {
  //   console.log(e.target.value);
  //   const userData = await searchUsers(e.target.value, {setError, setUsername});
  //   setUsers(userData);
  };

  // const handleSelect = useCallback(async (user) => {
  //   console.log(user);
  //   //check whether the group(chats in firestore) exists, if not create
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;
  //       console.log(combinedId);
  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));
  //     if (!res.exists()) {
  //         console.log(res);
  //       //create a chat in chats collection
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });
  //     }
  //     selectUserHandler(user);
  //     setUserSelected(true);
  //   } catch (err) {
  //       setError(err?.message)
  //       console.log(err);
  //   }

  //   setUsers(null);
  //   setUsername("")
  // },[currentUser.displayName, currentUser.photoURL, currentUser.uid, setUserSelected, selectUserHandler]);

  // useEffect(() => {
  //   console.log(user);
  //   user && handleSelect(user);
  // }, [handleSelect, user])
  return (
    <div className="search w-full relative px-2">
      <div className="searchForm">
        <Input
          type="text"
          label="Search user"
          variant='outlined'
          onChange={(e) => {handleKey(e); setUsername(e.target.value)}}
          value={username}
        />
      </div>
      {error && <span>{error}</span>}
      {users && username && (
        <div className="user-list z-10 flex flex-col w-full left-0 bg-[#f5f5f5]/90 absolute top-full shadow-md rounded-md">
          {users.map((u) => (
            <div key={u.id} className="user flex items-center text-slate-600 py-2 pl-2 border-b border-gray-300 hover:bg-[#f7f7f7] cursor-pointer" /*onClick={() => handleSelect(u)}*/>
              <img className="w-8 h-8 rounded-full object-cover" src={u.photoURL} alt="User profile pic" />
              <div className="userChatInfo ml-2">
                  <span>{u.displayName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;