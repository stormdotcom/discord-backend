import Conversation from "../models/Conversation.js";
import Messages from "../models/Messages.js";
import { updateChatHistory } from "./updates/chat.js";

export const directMessageHandler =async(socket, data)=>{

    try {
        console.log('event handled')
        const {userId} = socket.user;

        const {receiverUserId, content} = data;

        const message = await Messages.create({content: content, authorId : userId, data: new Date(), type: 'DIRECT'})

        const conversation = await Conversation.findOne({ participants :  {$all : [userId, receiverUserId]} })

        if(conversation) {
            conversation.messages.push(message._id)
            await conversation.save();

            // perform an update
            updateChatHistory(conversation._id.toString());
        }
        else {
            //create new conversation
            const newConversation = await Conversation.create({ messages: [message._id], participants: [userId, receiverUserId]})
        }
        //perform an update to sender and receiver if online



    } catch (error) {
        console.log(error)
    }
}

export const directChatHistoryHandler = async (socket, data)=> {

    try {
        const { userId } = socket.user;

        const { receiverUserId } = data;

        const conversation = await Conversation.findOne( { participants:{$all : [userId, receiverUserId ]} })

        if(conversation) {
            updateChatHistory(conversation._id.toString(), socket.id)
        }


    } catch (error) {
        console.log(error)
    }
} 