import FriendInvitation from '../models/FriendInvitation.js';
import User from '../models/User.js'

export const postInvite =async (req, res)=> {
    const { targetMailAddress } = req.body;

    const { userId, email} = req.user;

    const formattedEmail = targetMailAddress.toLowerCase()

    if(formattedEmail=== email.toLowerCase()) return res.status(409).send('Please enter Mail ID other than yours')

    const targetUser = await User.findOne({email:formattedEmail})

    if(!targetUser) return res.status(404).send(`Friend of ${formattedEmail} has not been found, Please check mail address`)

    const invitationAlreadyReceived = await FriendInvitation.findOne({senderId:userId, receiverId: targetUser._id})

    if(invitationAlreadyReceived) return res.status(409).send('Invitation has been already sent')

    const userAlreadyFriends = targetUser.friends.find(id => id.toString() === targetUser._id.toString() )

    if(userAlreadyFriends) return res.status(409).send('Friends already added, Please check the friend`s list')

    const newInvitation = await FriendInvitation.create({senderId: userId, receiverId: targetUser._id})
    
    return res.status(201).send("Invitation sent Successfully")



}