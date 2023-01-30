import { Board } from "../Board/board";

export class Player {
    _board
    constructor(private sign: string, board: Board) {
        this._board = board
    }
    play(row: number, colum: number) {
        this._board.setItemInBoard(row, colum, this.sign)
    }
    hasRow(): boolean {
        for (let i: number = 0; i < 3; i++) {
            if (this._board.getRow(i).every((val: string) => val === this.sign)) {
                return true
            }
        }
        return false
    }
    hasColum(): boolean {
        for (let i: number = 0; i < 3; i++) {
            if (this._board.getColum(i).every((val: string) => val === this.sign)) {
                return true
            }
        }
        return false
    }
    hasSlant(): boolean {
        let t: boolean
        t = this._board.getSlant(false).every((val: string) => val === this.sign)
        return t ? t : this._board.getSlant(true).every((val: string) => val === this.sign)
    }
    isWinner(): boolean {
        return this.hasColum() || this.hasRow() || this.hasSlant()
    }
}