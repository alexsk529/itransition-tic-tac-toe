import React, {useContext} from 'react';
import {Box, TextField, Button} from "@mui/material";
import {Context} from "../context/Context.js";

import io from 'socket.io-client';



const Auth = () => {
    const {/*socket,*/ itemRef, setItem, enter, name, setName, setGameStatus} = useContext(Context)

    const handlerEnterClick = () => {
        // const socket = io("http://localhost:5000")
        //
        // socket.on('connect', () => {
        //     socket.on('item', (el) => {
        //         setItem(el);
        //         itemRef.current = el
        //     });
        // })
        //
        // socket.on('start-game', () => {
        //     console.log('start')
        //     itemRef.current === 'X' ?
        //         setGameStatus('Your turn') :
        //         setGameStatus('Waiting for the opponents\' turn');
        // })
        //
        // socket.on('game-status', message => {
        //     setGameStatus(message)
        // })
        //
        enter(name)
    }

    return (
        <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
            noValidate
            sx={{
                mt: 7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
            }}>
            <TextField
                id="standard-basic"
                label="Your name"
                name="name"
                variant="standard"
                onChange={(e) => setName(e.target.value)}
            >
            </TextField>
            <Button
                variant="contained"
                onClick={handlerEnterClick}
                color="secondary"
            >Enter the Game</Button>
        </Box>
    );
};

export default Auth;
