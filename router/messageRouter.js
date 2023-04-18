const router = require("express").Router();
const Message = require("../model/messageModel");
const messageController = require("../controller/messageController");


router.post("/messages", messageController.addMessage);
router.get("/messages/:conversationId", messageController.getMessages);

module.exports = router;
