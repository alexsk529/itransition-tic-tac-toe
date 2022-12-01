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

    if (clients.length > 1) io.emit('start-game')


    socket.on('turn', (field, item) => {
        let nextTurn = item === 'X' ? 'O' : 'X'
        gameController.makeTurn(field, item);
        io.emit('refresh-board', gameController.getField())

        const sendMsg = ([id1, id2], [message1, message2])=>{
            io.to(id1).emit('game-status', message1)
            io.to(id2).emit('game-status', message2)
        }

        const winner = gameController.getWinner(gameController.getField());
        if (winner) {
            nextTurn = 'end';
            const messageWin = ['You won', 'You lost']
            if (winner === 'X') sendMsg(clients, messageWin);
            else sendMsg([clients[1], clients[0]], messageWin)
        }
        const messageTurn = ['Your turn', 'Waiting for the opponents\' turn']
        if (nextTurn!=='end' && nextTurn === 'X') sendMsg(clients, messageTurn);
        else if (nextTurn!=='end' && nextTurn === 'O') sendMsg([clients[1], clients[0]], messageTurn)
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


