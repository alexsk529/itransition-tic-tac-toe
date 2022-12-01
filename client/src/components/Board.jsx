import React, {useContext} from 'react';
import './Board.css';
import Box from '@mui/material/Box'
import Cell from "./Cell";
import {TurnContext} from "../context/TurnContext";

const Board = ({gameStatus}) => {
    const [board, setBoard] = React.useState(Array(9).fill(null))
    const {socket} = useContext(TurnContext);
    socket.on('refresh-board', (boardNew) => {
        setBoard(boardNew);
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
                    return (<Cell value={cell} key={i} id={i} gameStatus={gameStatus}/>)
                })
            }

        </Box>
    );
};

export default Board;
