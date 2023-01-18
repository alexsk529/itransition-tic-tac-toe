import React, { useContext, useMemo, useState } from 'react';
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { Context } from "../context/Context.js";
import io from 'socket.io-client';

const Auth = () => {
    const REACT_APP_URL = process.env.REACT_APP_URL || 'http://localhost:5000'
    const { enter, name, setName } = useContext(Context)
    const socket = useMemo(() => io(REACT_APP_URL), [REACT_APP_URL])
    const [isLoading, setIsLoading] = useState(true)

    socket.on('connect', () => {
        setIsLoading(false)
    })

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
            {
                isLoading ?
                    <CircularProgress color="secondary" /> :
                    <Button
                        variant="contained"
                        onClick={() => enter(name)}
                        color="secondary"
                    >Enter the Game</Button>
            }
        </Box>
    );
};

export default Auth;
