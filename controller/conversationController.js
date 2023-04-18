const { Conversation, validateConversation } = require("../model/conversationModel");

const addConversation = async (req, res) => {
  console.log(req.body.userId1, req.body.userId2);
    const newConversation = new Conversation({
      members: [req.body.userId1, req.body.userId2],
      lastMessage: req.body.lastMessage
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
};
const updateConversation = async (req, res) => {
  console.log(req.params.conversationId);
  
  try {
      const newConversation = await Conversation.findByIdAndUpdate(req.params.conversationId, { lastMessage: req.body.lastMessage }, {
        new: true, // to return the updated (new) document
        runValidators: true,
    })
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
};
  
// get conversation of a user
const getConversations = async (req, res) => {
    console.log(req.params.userId);
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      console.log(conversation);
      res.status(200).json({conversations: conversation});
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
};
  

// get conv includes two userId
const getConversation = async (req, res) => {
// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  console.log("IDs");
  console.log(req.params.userId1, req.params.userId2);
  console.log("IDs");
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.userId1, req.params.userId2] },
      });
      console.log(conversation);
      res.status(200).json({conversation: conversation})
    } catch (err) {
      res.status(500).json(err);
    }
};

module.exports = { addConversation, getConversation, getConversations, updateConversation };
