"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor() {
        this._board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }
    getBoard() {
        return this._board;
    }
    getRow(rowNumber) {
        return this._board[rowNumber];
    }
    getColum(colum) {
        return this._board.map((i) => {
            return i[colum];
        });
    }
    getSlant(isRight) {
        const slant = isRight ? [this._board[0][0], this._board[1][1], this._board[2][2]] : [this._board[2][0], this._board[1][1], this._board[0][2]];
        return slant;
    }
    setItemInBoard(row, colum, player) {
        if (this._board[row][colum] === ' ') {
            this._board[row][colum] = player;
        }
    }
}
exports.Board = Board;
