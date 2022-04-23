import { Server } from "socket.io";
import { verifyTokenSocket } from "./middleware/authSocket.js";
import { getOnlineUsers, setSocketServerInstance } from "./serverStore.js";
import { disconnectHandler } from "./socketHandler/disconnectHandler.js";
import { newConnectionHandler } from "./socketHandler/newConnectionHandler.js";
import { directMessageHandler , directChatHistoryHandler} from './socketHandler/directHandler.js'

export const registerSocketServer = (server)=>{
   const io= new Server(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"],

        },
    });
    setSocketServerInstance(io)
    io.use((socket, next)=> {
        verifyTokenSocket(socket, next)
    })
    const emitOnlineUsers = ()=> {
        const onlineUsers = getOnlineUsers();
        io.emit('online-user', { onlineUsers })
    }
    io.on('connection', (socket)=>  {
        newConnectionHandler(socket, io);
        emitOnlineUsers()

        socket.on('direct-message', (data)=> {
            directMessageHandler(socket, data)
        })

        socket.on('direct-chat-history', (data)=> {
            directChatHistoryHandler(socket, data)
        })

        socket.on('disconnect', ()=>{
            disconnectHandler(socket);
        })
    })

    setInterval(()=>{ 
        emitOnlineUsers()
    }, [8000])

}

