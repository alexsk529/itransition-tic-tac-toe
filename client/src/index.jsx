import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

window.onunload = () => {
    sessionStorage.removeItem('board')
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

