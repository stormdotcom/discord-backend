import mongoose from "mongoose";
const Schema = mongoose.Schema
const schemaConversation = mongoose.Schema({
    participants : [ {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages : [{
        type: Schema.Types.ObjectId,
        ref: "Messages",
    }]
});

const Conversation = mongoose.model('Conversation', schemaConversation)
export default Conversation;