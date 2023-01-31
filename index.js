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
    // server._io.on('newRoom', roomName => {
    //     console.log(roomName)
    // })
};
ticTacToe();
