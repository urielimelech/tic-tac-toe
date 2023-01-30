import { Board } from "./Board/board"
import { Player } from "./Player/player"
import { MyServer } from "./Server/server"

const ticTacToe = () => {
    const board = new Board()
    const server = new MyServer(board)
    server._server.listen(8000, () => {
        console.log('listening on port 8000')
    })
}

ticTacToe()