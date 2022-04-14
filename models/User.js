import mongoose from "mongoose";
const Schema = mongoose.Schema
const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,
    friends:[{ type: Schema.Types.ObjectId, ref: 'User'}],
    status:{
        type:Boolean,
        default:true,
        required:true
    },
    createdAt:{
        type: Date,
        required: true,
        default: new Date()
    }

})

const User = mongoose.model('User', userSchema)

export default User;