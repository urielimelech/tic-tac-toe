import express from 'express'
import http from 'http'
import { Board } from '../Board/board'
import { Player } from '../Player/player'
import { Server } from 'socket.io'

export class MyServer {
    _server
    _port: number
    _playerX: Player
    _playerO: Player
    _io
    _connectedUsers: string[]
    constructor(private board: Board) {
        const app = express()
        this._port = 8080
        this._playerX = new Player('X', this.board)
        this._playerO = new Player('O', this.board)
        this._connectedUsers = []

        this._server = http.createServer(app)
        this._io = new Server(this._server, { cors: { origin: 'http://localhost:3000' } })
        
        const rooms = this._io.of('/').adapter.rooms


        this._io.on('connection', socket => {
            console.log("trying to connect")
            console.log(socket.rooms)
            if (this._connectedUsers.length < 2) {
                if (this._connectedUsers.find(e => e === 'X')) {
                    socket.join("room1")
                    socket.data.username = 'O'
                    console.log(socket.data)
                    socket.emit('player', 'O')
                    return this._connectedUsers.push('O')
                }
                socket.join("room1")
                socket.data.username = 'X'
                console.log(socket.data)
                socket.emit('player', 'X')
                return this._connectedUsers.push('X')
            }
        })
    }

}
