import game from '../model/Game.js';

class GameController {
    turn = (field, item) => {
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
}

export default new GameController();