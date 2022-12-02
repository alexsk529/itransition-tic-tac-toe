import React from 'react';
import Button from '@mui/material/Button';
import {useContext} from 'react';
import './Cell.css'
import {Context} from "../context/Context.js";

const Cell = ({value, gameStatus, id, socket}) => {
    const {item} = useContext(Context)
    const handlerClick = () => {
        if (gameStatus.startsWith('Waiting')) return
        if (gameStatus === 'You won' || gameStatus === 'You lost') return
        socket.emit('turn', id, item)
    }
    return (
        <Button
            onClick={handlerClick}
            disabled={Boolean(value)}
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
            {value}
        </Button>
    );
};

export default Cell;
