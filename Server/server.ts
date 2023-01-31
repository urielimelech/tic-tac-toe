import express from 'express'
import http from 'http'
import { Board } from '../Board/board'
import { Player } from '../Player/player'
import { Server, Socket } from 'socket.io'
import { Logger } from '../Logs/logs'
import { Position } from './position'

export class MyServer {
    _server
    _port: number
    _playerX: Player
    _playerO: Player
    _io
    _connectedUsers: string[]
    _logger: Logger
    constructor(private board: Board) {
        const app = express()
        this._port = 8080
        this._playerX = new Player('X', this.board)
        this._playerO = new Player('O', this.board)
        this._connectedUsers = []
        this._logger = new Logger()

        this._server = http.createServer(app)
        this._io = new Server(this._server, { cors: { origin: 'http://localhost:3000' } })

        this._io.on('connection', socket => {
            this._logger.log(`${socket.id} is connected`)
            this.socketLogic(socket)
        })
    }

    private socketLogic = (s: Socket) => {
        const rooms = this._io.of('/').adapter.rooms

        s.on('newRoom', (roomName: string) => {
            s.join(roomName)
            this._logger.log(`${s.id} created room: ${roomName}`)
        })

        s.on('joinRoom', (roomName: string) => {
            if (rooms.has(roomName)) {
                s.join(roomName)
                this._logger.log(`${s.id} joined room: ${roomName}`)
                this.definePlayers(roomName)
            }
        })

        s.on('playX', (position: Position) => {
            this._logger.log(`roomName ${position.room} - player X played ${position.row},${position.column}`)
            this.board.setItemInBoard(position.row, position.column, 'X')
            this._io.to(position.room).emit('board', this.board.getBoard())
            this._playerX.isWinner() ? this._io.to(position.room).emit('winner', 'X') : s.to(position.room).emit('turnO')
        })
        s.on('playO', (position: Position) => {
            this._logger.log(`roomName ${position.room} - player O played ${position.row},${position.column}`)
            this.board.setItemInBoard(position.row, position.column, 'O')
            this._io.to(position.room).emit('board', this.board.getBoard())
            this._playerO.isWinner() ? this._io.to(position.room).emit('winner', 'O') : s.to(position.room).emit('turnX')
        })
    }

    private definePlayers = (roomName: string) => {
        this._io.in(roomName).fetchSockets().then(clients => {
            if (clients.length === 2) {
                this._logger.log(`clients in ${roomName} - ${clients[0].id} is player X, ${clients[1].id} is player O`)
                clients[0].emit('player', 'X')
                clients[1].emit('player', 'O')
                this._io.to(roomName).emit('board', this.board.getBoard())
                this._io.to(roomName).emit('turnX')
            }
        })
    }

}
