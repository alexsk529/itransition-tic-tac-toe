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

let clientsNo = 0;


io.on("connection", async (socket) => {
    clientsNo++
    let roomNo = Math.round(clientsNo/2)
    socket.join(roomNo)
    socket.emit('serverMsg', roomNo)
    console.log('Clients amount: ', io.engine.clientsCount)
    console.log(`User connected: ${socket.id}`)
    const sockets = await io.in(roomNo).fetchSockets();
    let items = ['O', 'X']
    if (sockets.length > 1) {
        for (const socket of sockets) {
            io.to(socket.id).emit('item', items.pop())
        }
        io.to(roomNo).emit('start-game')
    }




    socket.on('turn', async (field, item) => {
        let nextTurn = item === 'X' ? 'O' : 'X'
        gameController.makeTurn(field, item);
        io.to(roomNo).emit('refresh-board', gameController.getField())
        const sockets = await io.in(roomNo).fetchSockets();


        const sendMsg = (id, msgs) => {
            io.to(id).emit('game-status', msgs.pop());
            console.log(msgs)
        }

        const winner = gameController.getWinner(gameController.getField());
        if (winner) {
            nextTurn = 'end';
            if (winner === 'X') {
                const messageWin = ['You lost!', 'You won!']
                for (const socket of sockets) sendMsg(socket.id, messageWin)
            } else {
                const messageWin = ['You won!', 'You lost!'];
                for (const socket of sockets) sendMsg(socket.id, messageWin)
            }
        }

        if (gameController.isDraw(gameController.getField())) {
            nextTurn = 'end';
            io.to(roomNo).emit('game-status', 'Draw!')
        }
        if (nextTurn!=='end' && nextTurn === 'X'){
            const messageTurn = ['Waiting for the opponents\' turn', 'Your turn']
            for (const socket of sockets) io.to(socket.id).emit('game-status', messageTurn.pop());
        }
        else if (nextTurn!=='end' && nextTurn === 'O') {
            const messageTurn = ['Your turn', 'Waiting for the opponents\' turn']
            for (const socket of sockets) io.to(socket.id).emit('game-status', messageTurn.pop());
        }
    })



    socket.on('disconnecting', (r) => {
        clientsNo--
        gameController.clear()
        clients.splice(clients.indexOf(socket.id), 1)
        io.emit('refresh-board', gameController.getField())
        io.emit('game-status', 'Waiting for the opponent')
        console.log('Clients amount: ', io.engine.clientsCount)

    })

})

http.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})


