import { Manager } from 'socket.io-client'
import React, { useEffect, useState } from 'react'

export const Socket = () => {

    const [playerSign, setPlayerSign] = useState('')
    const [socket, setsocket] = useState()
    const [board, setBoard] = useState()

    useEffect(() => {
        const manager = new Manager("http://localhost:8000")
        setsocket(manager.socket('/'))
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('board', b => {
                setBoard(b)
            })

            socket.on('player', r => {
                setPlayerSign(r)
            })

            socket.on('turnX', () => {
                if (playerSign === 'X') {
                    socket.emit('playX', { row: 0, column: 0 })
                }
            })
            socket.on('turnO', () => {
                if (playerSign === 'O') {
                    socket.emit('playO', { row: 0, column: 0 })
                }
            })
        }
    }, [socket])

    return <div>trying to connect</div>
}