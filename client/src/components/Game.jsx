import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box'
import './Game.css';
import Board from "./Board";
import {TurnContext} from "../context/TurnContext.js";


const Game = () => {
    const {item, socket, itemRef} = useContext(TurnContext)
    const [gameStatus, setGameStatus] = useState('Waiting for the opponent')
    const [nextTurn, setNextTurn] = React.useState('')
    socket.on('refresh-board', (boardNew, turn) => {
        setNextTurn(turn);
    })


    useEffect(()=> {
        socket.once('start-game', (status)=> setGameStatus(status))
    },[socket])
    // useEffect(()=> {
    //     if (gameStatus !== 'Waiting for the opponent' && gameStatus !== 'You won' && gameStatus !== 'You lost') {
    //         !nextTurn && itemRef.current === 'X' ? setGameStatus('Your turn') : setGameStatus('Waiting for the opponents\' turn')
    //         if (nextTurn && nextTurn === itemRef.current)  setGameStatus('Your turn')
    //         else if (nextTurn) setGameStatus('Waiting for the opponents\' turn')
    //     }
    // },[gameStatus, nextTurn, itemRef])
    useEffect(()=> {
        socket.once('result', (winner) => {
            winner === itemRef.current ?
                setGameStatus('You won') :
                setGameStatus('You lost')
                // console.log('you won') :
                // console.log('you lost')

        })
    },[socket, itemRef, gameStatus])


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
            <Board gameStatus={gameStatus} nextTurn={nextTurn}/>
            <p className="game-text">{gameStatus}</p>
        </Box>
    );
};

export default Game;
