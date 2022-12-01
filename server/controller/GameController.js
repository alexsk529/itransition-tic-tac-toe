import game from '../model/Game.js';

class GameController {
    makeTurn = (field, item) => {
        game.board[field] = item
    }
    getField = () => {
        return game.board;
    }
    clear = () => {
        game.board = [
            '', '', '',
            '', '', '',
            '', '', ''
        ]
    }
    getWinner = (board) => {
        const combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let comb of combs) {
            if (
                board[comb[0]] === board[comb[1]] &&
                board[comb[1]] === board[comb[2]] &&
                board[comb[0]] !== ''
            ) return board[comb[0]]
        }
        return null
    }
}

export default new GameController();