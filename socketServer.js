import { Server } from "socket.io";
import { verifyTokenSocket } from "./middleware/authSocket.js";
import { getOnlineUsers, setSocketServerInstance } from "./serverStore.js";
import { disconnectHandler } from "./socketHandler/disconnectHandler.js";
import { newConnectionHandler } from "./socketHandler/newConnectionHandler.js";

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

        socket.on('disconnect', ()=>{
            disconnectHandler(socket);
        })
    })

    setInterval(()=>{ 
        emitOnlineUsers()
    }, [8000])

}

