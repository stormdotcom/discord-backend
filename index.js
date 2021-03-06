import express from 'express'
import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from "./routes/authRoutes.js"
import friendInvitationRoutes from './routes/friendInvitationRoutes.js'
import {registerSocketServer} from './socketServer.js'
dotenv.config()


const PORT = process.env.PORT || process.env.API_PORT;
const CONNECTION_URL = process.env.DB_URI
const app = express()

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes)
app.use('/api/friend-invitation', friendInvitationRoutes)
const server = http.createServer(app)
registerSocketServer(server)

mongoose.connect(CONNECTION_URL)
.then(()=>{
    console.log("DB Connected")
    server.listen(PORT, ()=> {
        console.log(`Server running on port ${PORT}`)
    });
})
.catch((err)=>{
    console.log(`Error connecting database \n ${err.message}`);
})
