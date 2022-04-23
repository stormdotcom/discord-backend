import Conversation from "../../models/Conversation.js";
import { getActiveConnection, getSocketServerInstance } from "../../serverStore.js";

export const updateChatHistory  = async (conversationId, toSpecifiedId=null)=> {
    const conversation = await Conversation.findById(conversationId)
    .populate({ path: 'messages', model: 'Messages', populate : { path: 'auth', model: 'User', select : 'username _id' } })

    if(conversation) {
        const io = getSocketServerInstance();
        if(toSpecifiedId) {
            return io.to(toSpecifiedId).emit('direct-chat-history', {messages: conversation.messages, participants: conversation.participants})
        }

        //check of user are of the conversation online
        // if yes emit to them the updates of messages
        conversation.participants.forEach(userId=> {
            const activeConnections = getActiveConnection(userId.toString());

            activeConnections.forEach(socketId => {
                io.to(socketId).emit('direct-chat-history', { messages: conversation.messages, participants: conversation.participants})
            })
        })

    }
}