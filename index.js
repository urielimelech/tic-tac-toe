"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("./Board/board");
const server_1 = require("./Server/server");
const ticTacToe = () => {
    const board = new board_1.Board();
    const server = new server_1.MyServer(board);
    server._server.listen(8000, () => {
        console.log('listening on port 8000');
    });
    server._io.on('hello', () => {
        server._io.emit('player', 'X');
    });
    // server._io.listen(3000)
    // const playerX = new player('X', board)
    // const playerO = new player('O', board)
    // while(!(playerX.isWinner || playerO.isWinner)){
    //     // playerX.play(/*input*/)
    //     // playerO.play(/*input*/)
    // }
    // playerX.play(0,0)
};
ticTacToe();
