
class GameController {
    // board = [
    //     '', '', '',
    //     '', '', '',
    //     '', '', ''
    // ]
    makeTurn = (board,field, item) => {
        board[field] = item
    }
    // getField = () => {
    //     return this.board;
    // }
    // clear = (board) => {
    //     board = [
    //         '', '', '',
    //         '', '', '',
    //         '', '', ''
    //     ]
    // }
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
    isDraw = (board) => {
        if (!board.includes('') && !this.getWinner(board)) return true
        return false
    }
}

export default new GameController();
