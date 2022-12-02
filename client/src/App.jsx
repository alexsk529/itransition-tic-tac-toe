import './App.css';
import io from 'socket.io-client';
import React from 'react';
import {useEffect, useState} from 'react';
import Game from "./components/Game.jsx";
import Auth from './components/Auth.jsx';
import {useAuth} from "./hooks/useAuth.js";
import {Context} from "./context/Context.js";
import Box from "@mui/material/Box";


function App() {
    const {enter, exit, name, setName, isLogin} = useAuth()
    const [item, setItem] = useState('');
    const itemRef = React.useRef(item)


    return (
            <Context.Provider
                value={{item, setItem, enter, exit, name, setName,/* socket,*/ itemRef }}
            >
                <div className="App">
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
                        {isLogin ? <Game/> : <Auth/>}
                    </Box>
                </div>
            </Context.Provider>

    );
}

export default App;
