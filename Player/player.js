"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(sign, board) {
        this.sign = sign;
        this._board = board;
    }
    play(row, colum) {
        this._board.setItemInBoard(row, colum, this.sign);
    }
    hasRow() {
        for (let i = 0; i < 3; i++) {
            if (this._board.getRow(i).every((val) => val === this.sign)) {
                return true;
            }
        }
        return false;
    }
    hasColum() {
        for (let i = 0; i < 3; i++) {
            if (this._board.getColum(i).every((val) => val === this.sign)) {
                return true;
            }
        }
        return false;
    }
    hasSlant() {
        let t;
        t = this._board.getSlant(false).every((val) => val === this.sign);
        return t ? t : this._board.getSlant(true).every((val) => val === this.sign);
    }
    isWinner() {
        return (this.hasColum() || this.hasRow() || this.hasSlant());
    }
}
exports.Player = Player;
