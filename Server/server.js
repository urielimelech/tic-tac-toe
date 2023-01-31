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
const logs_1 = require("../Logs/logs");
class MyServer {
    constructor(board) {
        this.board = board;
        this.socketLogic = (s) => {
            const rooms = this._io.of('/').adapter.rooms;
            s.on('newRoom', (roomName) => {
                s.join(roomName);
                this._logger.log(`${s.id} created room: ${roomName}`);
            });
            s.on('joinRoom', (roomName) => {
                if (rooms.has(roomName)) {
                    s.join(roomName);
                    this._logger.log(`${s.id} joined room: ${roomName}`);
                    this.definePlayers(roomName);
                }
            });
            s.on('playX', (position) => {
                this._logger.log(`roomName ${position.room} - player X played ${position.row},${position.column}`);
                this.board.setItemInBoard(position.row, position.column, 'X');
                this._io.to(position.room).emit('board', this.board.getBoard());
                this._playerX.isWinner() ? this._io.to(position.room).emit('winner', 'X') : s.to(position.room).emit('turnO');
            });
            s.on('playO', (position) => {
                this._logger.log(`roomName ${position.room} - player O played ${position.row},${position.column}`);
                this.board.setItemInBoard(position.row, position.column, 'O');
                this._io.to(position.room).emit('board', this.board.getBoard());
                this._playerO.isWinner() ? this._io.to(position.room).emit('winner', 'O') : s.to(position.room).emit('turnX');
            });
        };
        this.definePlayers = (roomName) => {
            this._io.in(roomName).fetchSockets().then(clients => {
                if (clients.length === 2) {
                    this._logger.log(`clients in ${roomName} - ${clients[0].id} is player X, ${clients[1].id} is player O`);
                    clients[0].emit('player', 'X');
                    clients[1].emit('player', 'O');
                    this._io.to(roomName).emit('board', this.board.getBoard());
                    this._io.to(roomName).emit('turnX');
                }
            });
        };
        const app = (0, express_1.default)();
        this._port = 8080;
        this._playerX = new player_1.Player('X', this.board);
        this._playerO = new player_1.Player('O', this.board);
        this._connectedUsers = [];
        this._logger = new logs_1.Logger();
        this._server = http_1.default.createServer(app);
        this._io = new socket_io_1.Server(this._server, { cors: { origin: 'http://localhost:3000' } });
        this._io.on('connection', socket => {
            this._logger.log(`${socket.id} is connected`);
            this.socketLogic(socket);
        });
    }
}
exports.MyServer = MyServer;
