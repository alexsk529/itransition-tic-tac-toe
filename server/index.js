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
    console.log('Clients amount: ', io.engine.clientsCount)
    console.log(`User connected: ${socket.id}`)
    clients.push(socket.id)
    clients.forEach((id,index) => {
        index === 0 ?
            io.to(id).emit('item', 'X') :
            io.to(id).emit('item', 'O');
    })

    if (clients.length > 1) io.emit('start-game', 'turn')

    socket.on('turn', (field, item) => {
        const nextTurn = item === 'X' ? 'O' : 'X'
        gameController.makeTurn(field, item);
        io.emit('refresh-board', gameController.getField(), nextTurn)
        const winner = gameController.getWinner(gameController.getField());
        if (winner) io.emit('result', winner)
    })



    socket.on('disconnecting', (r) => {
        gameController.clear()
        clients.splice(clients.indexOf(socket.id), 1)
        io.emit('refresh-board', gameController.getField())
        console.log('Clients amount: ', io.engine.clientsCount)

    })

})

http.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})


