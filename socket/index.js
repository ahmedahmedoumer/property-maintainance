const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  console.log("USER REMOVED");
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  // console.log(users);
  // console.log(userId);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log(users);
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    console.log("addUser: ",userId, socket.id);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("sendMessage: ", senderId, receiverId, text);
    const user = getUser(receiverId);
    // if(user){
      console.log(users);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    // }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
