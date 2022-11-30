import {createServer} from 'http';
import {Server} from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import gameController from './controller/GameController.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

const http = createServer(app)

const io = new Server(http, {
    cors: {
        origin: "*"
    },
    maxHttpBufferSize: 1e10,
})

const clients = []


io.on("connection", (socket) => {
    io.socketsJoin('room1')
    console.log('Clients amount: ', io.engine.clientsCount)
    console.log(`User connected: ${socket.id}`)
    clients.push(socket.id)
    clients.forEach((item,index) => {
        index === 0 ? io.to(item).emit('item', 'X') : io.to(item).emit('item', 'O');
    })
    socket.on('turn', (field, item) => {
        const nextTurn = item === 'X' ? 'O' : 'X'
        gameController.turn(field, item);
        io.emit('refresh-board', gameController.getField(), nextTurn)
    })
    socket.on('disconnecting', (r) => {
        gameController.clear()
        clients.splice(clients.indexOf(socket.id), 1)
        io.emit('refresh-board', gameController.getField())
    })

})

http.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})


