const connectedUsers = new Map();

export const addNewConnectedUser = ({ socketId, userId})=>{
    connectedUsers.set(socketId, {userId})
    console.log("connected users \n", connectedUsers)
};

export const removeConnectedUser = (socketId)=>{
    if(connectedUsers.has(socketId)){
        connectedUsers.delete(socketId)
        console.log("disconnected user \n", connectedUsers)
    }
}