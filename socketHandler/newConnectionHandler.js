import { addNewConnectedUser } from "../serverStore.js";

export const newConnectionHandler = async (socket, io)=>{
    const userDetails = socket.user;

    addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId,
    });
}

