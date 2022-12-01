import './App.css';
import io from 'socket.io-client';
import React from 'react';
import {useEffect, useState} from 'react';
import Game from "./components/Game";
import {useTurn} from './hooks/useTurn.js';
import {TurnContext} from "./context/TurnContext.js";

const socket = io("http://localhost:5000")

function App() {
    const {item, setItem} = useTurn();
    const itemRef = React.useRef(item)
    socket.on('connect', () => {
        socket.on('item', (el) => {
            setItem(el);
            itemRef.current = el
        });
    })
    return (
        <React.StrictMode>
            <TurnContext.Provider
                value={{item, socket, itemRef}}
            >
                <div className="App">
                    <Game/>
                </div>
            </TurnContext.Provider>
        </React.StrictMode>

    );
}

export default App;
