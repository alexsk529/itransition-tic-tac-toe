import React, {useContext} from 'react';
import {Box, TextField, Button} from "@mui/material";
import {Context} from "../context/Context.js";


const Auth = () => {
    const {enter, name, setName} = useContext(Context)

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
                onClick={()=> enter(name)}
                color="secondary"
            >Enter the Game</Button>
        </Box>
    );
};

export default Auth;
