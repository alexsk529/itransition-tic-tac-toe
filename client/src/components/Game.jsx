import React, {useContext} from 'react';
import Box from '@mui/material/Box'
import './Game.css';
import Board from "./Board";
import {TurnContext} from "../context/TurnContext.js";


const Game = () => {
    const {item} = useContext(TurnContext)

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
                <span>Your opponent: yyyy (O)</span>
            </Box>
            <Board/>
            <p className="game-text">Waiting for the opponent/Your turn/Waiting for your turn/You lose/You won</p>
        </Box>
    );
};

export default Game;
