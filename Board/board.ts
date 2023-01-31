export class Board {
    private _board: Array<string[]>
    constructor() {
        this._board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]
    }
    getBoard() {
        return this._board
    }
    getRow(rowNumber: number) {
        return this._board[rowNumber]
    }
    getColum(colum: number) {
        return this._board.map((i: string[]) => {
            return i[colum]
        })
    }
    getSlant(isRight: boolean) {
        const slant = isRight ? [this._board[0][0], this._board[1][1], this._board[2][2]] : [this._board[2][0], this._board[1][1], this._board[0][2]]
        return slant
    }
    setItemInBoard(row: number, colum: number, player: string) {
        if (this._board[row][colum] === ' ') {
            this._board[row][colum] = player
        }
    }
}