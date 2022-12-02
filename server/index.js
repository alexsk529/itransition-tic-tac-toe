import {createServer} from 'http';
import {Server} from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import GameController from "./controller/GameController.js";

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


let clientsNo = 0;
const fields = new Map()


io.on("connection", async (socket) => {
    clientsNo++
    let board;
    if (clientsNo % 2 === 0) board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ]

    let roomNo = Math.round(clientsNo/2)
    fields.set(roomNo, board)
    socket.join(roomNo, board)
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

    socket.on('turn', async (field, item, room) => {
        let board = fields.get(room)
        let nextTurn = item === 'X' ? 'O' : 'X'
        GameController.makeTurn(board,field, item);
        io.to(room).emit('refresh-board', board)
        const sockets = await io.in(room).fetchSockets();


        const sendMsg = (id, msgs) => {
            io.to(id).emit('game-status', msgs.pop());
        }

        const winner = GameController.getWinner(board);
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

        if (GameController.isDraw(board)) {
            nextTurn = 'end';
            io.to(room).emit('game-status', 'Draw!')
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

    socket.on('play-again', ()=> {
        console.log('tick')
        const room = Array.from(socket.rooms)[1]
        console.log(room)
        let board = fields.get(room)
        console.log(board)
        board = [
            '', '', '',
            '', '', '',
            '', '', ''
        ]
        fields.set(room, board)
        io.to(room).emit('refresh-board', board)
        io.to(room).emit('start-game')
    })



    socket.on('disconnecting', (r) => {
        clientsNo--
        const room = Array.from(socket.rooms)[1]
        board = [
            '', '', '',
            '', '', '',
            '', '', ''
        ]
        io.to(room).emit('refresh-board', board)
        io.to(room).emit('game-status', 'Waiting for the opponent')
        console.log('Clients amount: ', io.engine.clientsCount)

    })

})

http.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})


