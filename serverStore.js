const connectedUsers = new Map();

let io = null;
export const setSocketServerInstance = (ioInstance)=>{
    io = ioInstance;
}

export const getSocketServerInstance = ()=>{
    return io
}

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

export const getActiveConnection = (userId)=> {
    const activeConnections = [];

    connectedUsers.forEach((value, key)=>{
        if(value.userId === userId){
            activeConnections.push(key)
        }
    });
    return activeConnections;
}

export const getOnlineUsers = ()=>{
    const onlineUsers =[]
    connectedUsers.forEach((value, key)=>{
        onlineUsers.push({ socketId:key, userId: value.userId})
    })
    return onlineUsers;
    }
