import User from '../../models/User.js'
import FriendInvitation from '../../models/FriendInvitation.js'
import { getActiveConnection, getSocketServerInstance } from  '../../serverStore.js'

export const updatePendingFriendsInvitations = async (userId)=> {

      try {
        const pendingInvitations = await FriendInvitation.find({receiverId : userId}).populate('senderId', '_id username email')

        const receiverList = getActiveConnection(userId);

        const io = getSocketServerInstance()

        receiverList.forEach(receiverSocketId => {
            io.to(receiverSocketId).emit('friends-invitation', {
                pendingInvitations: pendingInvitations ? pendingInvitations : [],
            })
        })


      } catch (error) {
            console.log(error)
      }
}


export const updateFriends = async (userId)=> {
        try {
          

          // find active connections of specific id (online)
          const receiverList = getActiveConnection(userId);
          let friendsList;
          if(receiverList.length > 0) {

          const user = await User.findById(userId, { _id:1, friends: 1}).populate('friends', '_id username email');
            
            if(user) {
             friendsList = user.friends.map((f)=> {
            return { id: f._id, email: f.email, username: f.username  }
              })
            }
            // get io instance
            const io = getSocketServerInstance();
            receiverList.forEach(receiverSocketId => {
            io.to(receiverSocketId).emit('friends-list', { friends: friendsList ? friendsList:  [], })
            })

          }
        } catch (error) {
          console.log(error)
        }
}
