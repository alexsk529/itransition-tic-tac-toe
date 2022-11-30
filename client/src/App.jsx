import './App.css';
import io from 'socket.io-client';
import React from 'react';
import {useEffect, useState} from 'react';
import Game from "./components/Game";
import {useTurn} from './hooks/useTurn.js';
import {TurnContext} from "./context/TurnContext.js";

const socket = io("http://localhost:5000")
console.log(socket)

function App() {
    const {item, setItem} = useTurn();
    socket.on('item', (item) => setItem(item));

    return (
        <React.StrictMode>
            <TurnContext.Provider
                value={{item, setItem, socket}}
            >
                <div className="App">
                    <Game/>
                </div>
            </TurnContext.Provider>
        </React.StrictMode>

    );
}

export default App;
