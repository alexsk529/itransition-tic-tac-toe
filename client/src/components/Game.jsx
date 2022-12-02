import React, {useContext, useEffect, useMemo, useState} from 'react';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import './Game.css';
import Board from "./Board";
import {Context} from "../context/Context.js";
import {PlayAgain} from "./PlayAgain.jsx";

import io from 'socket.io-client';


const Game = () => {
    const {item, setItem, itemRef, name, exit} = useContext(Context)
    const [gameStatus, setGameStatus] = useState('Waiting for the opponent')
    const url = "https://itransition-tic-tac-toe-production.up.railway.app/"
    const socket = useMemo(()=> io(url), [url])
    const [room, setRoom] = useState()

    socket.on('connect', () => {

    })
    socket.on('item', (el) => {
        setItem(el);
        itemRef.current = el
    });

    socket.once('serverMsg', (No)=>{
        setRoom(No);
    })

    useEffect(()=> {
        socket.on('start-game', () => {
            itemRef.current === 'X' ?
            setGameStatus('Your turn') :
            setGameStatus('Waiting for the opponents\' turn');
        })
    }, [socket])

    socket.on('game-status', message => {
        setGameStatus(message)
    })
    const messagesEvokeButton = ['You won!', 'You lost!', 'Draw!']

    return (
        <React.Fragment>
            <Box
                m={0}
                sx={{
                    width: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    fontSize: 14,
                    color: '#4527a0'
                }}>
                <span>Player: {name} ({item})</span>
                <span>Your opponent ({item === 'X' ? 'O' : 'X'})</span>
            </Box>
            <Board gameStatus={gameStatus} socket={socket} room={room}/>
            <p className="game-text">{gameStatus}</p>
            <Box
                display='flex'
                gap={0.5}
            >
                {
                    messagesEvokeButton.includes(gameStatus) ? <PlayAgain socket={socket}/> : null
                }
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={()=> {
                        socket.disconnect()
                        exit();
                    }}
                >Exit the Game</Button>
            </Box>

        </React.Fragment>
    )
};

export default Game;
