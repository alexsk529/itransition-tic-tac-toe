import {useState} from 'react';

export const useTurn = () => {
    const [item, setItem] = useState('');



    return {item, setItem};
}