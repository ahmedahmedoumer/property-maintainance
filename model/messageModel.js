const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
// const Conversation = mongoose.model("Conversation", ConversationSchema);

const Message = mongoose.model("Message", MessageSchema);
exports.Message = Message;
