const router = require("express").Router();
// const Conversation = require("../model/conversationModel");
const conversationController = require("../controller/conversationController");


router.post("/conversations", conversationController.addConversation);
router.get("/conversations/find/:userId", conversationController.getConversations);
router.get("/conversations/:userId1/:userId2", conversationController.getConversation);
router.patch("/conversations/:conversationId", conversationController.updateConversation);
// router.patch("/conversations/:id",conversationController.getConversation);
// router.delete("/conversations/:id",conversationController.deleteConveration);

module.exports = router;
