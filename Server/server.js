"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const player_1 = require("../Player/player");
const socket_io_1 = require("socket.io");
class MyServer {
    constructor(board) {
        this.board = board;
        const app = (0, express_1.default)();
        this._port = 8080;
        this._playerX = new player_1.Player('X', this.board);
        this._playerO = new player_1.Player('O', this.board);
        this._connectedUsers = [];
        // this._io = new Server(8000)
        // this._io = new Server(8001, { cors: { origin: 'http://localhost:3000' } })
        this._server = http_1.default.createServer(app);
        // this._io = new Server(this._server)
        this._io = new socket_io_1.Server(this._server, { cors: { origin: 'http://localhost:3000' } });
        // app.get('/', (req, res) => {
        //     res.send({ body: board.getBoard() })
        // })
        // this._io.on('connect', s => {
        //     // console.log(s)
        // })
        this._io.on('connection', socket => {
            console.log("trying to connect");
            console.log(socket.rooms);
            if (this._connectedUsers.length < 2) {
                if (this._connectedUsers.find(e => e === 'X')) {
                    socket.join("room1");
                    socket.data.username = 'O';
                    console.log(socket.data);
                    socket.emit('player', 'O');
                    return this._connectedUsers.push('O');
                }
                socket.join("room1");
                socket.data.username = 'X';
                console.log(socket.data);
                socket.emit('player', 'X');
                return this._connectedUsers.push('X');
            }
        });
        // this._io.on('hello', () => {
        //     console.log('hello')
        //     this._io.emit('player', 'X')
        // })
        // server.listen(this._port, () => { console.log("listening") })
        // this._io.listen(8000)
        // this._io
        // this._app.get('/connect', (req, res) => {
        //     if (this._playerX) {
        //         this._playerO = new Player('O', this.board)
        //     }
        //     this._playerX = new Player('X', this.board)
        //     res.send()
        // })
    }
}
exports.MyServer = MyServer;
// app.set("v")
