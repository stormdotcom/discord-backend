import { removeConnectedUser } from "../serverStore.js"
export const disconnectHandler = (socket)=> {
    removeConnectedUser(socket.id)
}
