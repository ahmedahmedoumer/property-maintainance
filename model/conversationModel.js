const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    lastMessage: {
      type: String
    }
  },
  { timestamps: true }
);


const Conversation = mongoose.model("Conversation", ConversationSchema);

const validateConversation = (Conversation) => {
  const validationSchema = Joi.object({
    members: Joi.Array().required(),
  });
  return validationSchema.validate(Conversation);
};

exports.Conversation = Conversation;
exports.validateConversation = validateConversation;