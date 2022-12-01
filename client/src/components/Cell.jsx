import React from 'react';
import Button from '@mui/material/Button';
import {useContext} from 'react';
import './Cell.css'
import {TurnContext} from "../context/TurnContext.js";

const Cell = (props) => {
    const {item, socket} = useContext(TurnContext)
    let handlerClick = () => {
        if (props.gameStatus.startsWith('Waiting')) return
        if (props.gameStatus === 'You won' || props.gameStatus === 'You lost') return
        socket.emit('turn', props.id, item)
        console.log(item)
    }
    return (
        <Button
            onClick={handlerClick}
            disabled={Boolean(props.value)}
            sx={{
                width: 100,
                height: 100,
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 2,
                borderRadius: 1,
                borderColor: '#263238',
                backgroundColor: '#546e7a',
                fontSize: 90,
                color: '#263238',
            }}
        >
            {props.value}
        </Button>
    );
};

export default Cell;
