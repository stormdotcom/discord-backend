import mongoose from "mongoose";
const Schema = mongoose.Schema
const schemaMessage = mongoose.Schema({
    auth: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    content : {type: String},
    date : {type: Date},
    type: {type : String},
    
});

const Messages = mongoose.model('Messages', schemaMessage)
export default Messages;