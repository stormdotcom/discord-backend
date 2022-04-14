import mongoose from "mongoose";
const Schema = mongoose.Schema
const schemaFriendInvitation = mongoose.Schema({
    senderId: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const FriendInvitation = mongoose.model('FriendInvitation', schemaFriendInvitation)
export default FriendInvitation;