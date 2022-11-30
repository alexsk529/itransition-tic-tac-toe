import React, {useContext} from 'react';
import './Board.css';
import Box from '@mui/material/Box'
import Cell from "./Cell";
import {TurnContext} from "../context/TurnContext";

const Board = () => {
    const [board, setBoard] = React.useState(Array(9).fill(null))
    const [nextTurn, setNextTurn] = React.useState('')
    const {socket} = useContext(TurnContext);
    socket.on('refresh-board', (boardNew, turn) => {
        setBoard(boardNew);
        setNextTurn(turn);
    })

    return (
        <Box
            sx={{
                width: 300,
                height: 300,
                backgroundColor: '#455a64',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}
        >
            {
                board.map ((cell, i) => {
                    return (<Cell value={cell} key={i} id={i} nextTurn={nextTurn}/>)
                })
            }

        </Box>
    );
};

export default Board;
