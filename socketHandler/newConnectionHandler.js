import { addNewConnectedUser } from "../serverStore.js";
import { updateFriends, updatePendingFriendsInvitations } from "./updates/friends.js";

export const newConnectionHandler = async (socket, io)=>{
    const userDetails = socket.user;
    addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId,
    });

    updatePendingFriendsInvitations(userDetails.userId) //update pending friends invitations list
    
    updateFriends(userDetails.userId) //update friends List

}

    