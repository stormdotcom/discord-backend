import FriendInvitation from '../models/FriendInvitation.js';
import User from '../models/User.js'
import { updateFriends, updatePendingFriendsInvitations } from '../socketHandler/updates/friends.js';

export const postInvite =async (req, res)=> {
    const { targetMailAddress } = req.body;

    const { userId, email} = req.user;

    const formattedEmail = targetMailAddress.toLowerCase()

    if(formattedEmail=== email.toLowerCase()) return res.status(409).send('Please enter Mail ID other than yours')

    const targetUser = await User.findOne({email:formattedEmail})

    if(!targetUser) return res.status(404).send(`Friend of ${formattedEmail} has not been found, Please check mail address`)

    const invitationAlreadyReceived = await FriendInvitation.findOne({senderId:userId, receiverId: targetUser._id})

    if(invitationAlreadyReceived) return res.status(409).send('Invitation has been already sent')

    const userAlreadyFriends = targetUser.friends.filter(id => id.toString() === targetUser._id.toString() )

    if(userAlreadyFriends.length > 0) return res.status(409).send(`Friend  ${formattedEmail} already added, Please check the friend's list`)

    const newInvitation = await FriendInvitation.create({senderId: userId, receiverId: targetUser._id})
    
    updatePendingFriendsInvitations(targetUser._id.toString()); 

    return res.status(201).send("Invitation sent Successfully")



}

export const postAccept = async (req, res)=> {
    const { id} = req.body;

    try {
        
        const invitation = await FriendInvitation.findById(id)

        if(!invitation) return res.status(401).send('Error occurred, No invitation exists')

        const { receiverId, senderId} = invitation;

        //add friends to both users    console.log(userDetails)
        const senderUser = await User.findById(senderId)  
        senderUser.friends = [...senderUser.friends, receiverId]

        const receiverUser = await User.findById(receiverId)
        receiverUser.friends = [...receiverUser.friends, senderId]

        await receiverUser.save();
        await senderUser.save();

        // delete invitation delete
        await FriendInvitation.findByIdAndDelete(id);

        // update list of friends if users are online
        updateFriends(senderId.toString())
        updateFriends(receiverId.toString())

        // update list of friends pending invitations
        updatePendingFriendsInvitations(receiverId.toString())
        

        return res.status(200).send('Successfully added to friends List')


    } catch (error) {
        console.log(error)
        return res.status(500).send('Something went wrong')
    }
}

export const postReject = async (req, res)=> {
    const { id} = req.body;
    const { userId } = req.user;

    try {
        
        const isExists = await FriendInvitation.exists({_id: id})

        if(!isExists) return res.status(400).send('No Invitation found for to reject')

        await FriendInvitation.findByIdAndDelete(id);

        updatePendingFriendsInvitations(userId)

        return res.status(200).send('Invitation successfully rejected')


    } catch (error) {
        console.log(error)
        return res.status(500).send('Something went wrong')
    }
}