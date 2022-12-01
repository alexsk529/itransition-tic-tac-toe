import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box'
import './Game.css';
import Board from "./Board";
import {TurnContext} from "../context/TurnContext.js";


const Game = () => {
    const {item, socket, itemRef} = useContext(TurnContext)
    const [gameStatus, setGameStatus] = useState('Waiting for the opponent')

    useEffect(()=> {
        socket.on('start-game', () => {
            console.log('start')
            itemRef.current === 'X' ?
            setGameStatus('Your turn') :
            setGameStatus('Waiting for the opponents\' turn');
        })
    }, [socket])

    socket.on('game-status', message => {
        setGameStatus(message)
    })

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: '#9fa8da'
            }}
        >
            <h1 className="game-text">Tic-Tac-Toe game</h1>
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
                <span>Player: alexsk529 ({item})</span>
                <span>Your opponent: yyyy ({item === 'X' ? 'O' : 'X'})</span>
            </Box>
            <Board gameStatus={gameStatus}/>
            <p className="game-text">{gameStatus}</p>
        </Box>
    );
};

export default Game;
