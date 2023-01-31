import { Manager } from 'socket.io-client'
import React, { useEffect, useRef, useState } from 'react'
import { Board } from './Board'

export const Socket = () => {

    const [playerSign, setPlayerSign] = useState('')
    const [socket, setSocket] = useState()
    const [board, setBoard] = useState()
    const [isTurn, setIsTurn] = useState()
    const [currentRoom, setCurrentRoom] = useState('')
    const [winner, setWinner] = useState('')

    const create = useRef(null)
    const join = useRef(null)

    useEffect(() => {
        const manager = new Manager("http://localhost:8000")
        setSocket(manager.socket('/'))
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('board', b => {
                setBoard(b)
            })

            socket.on('player', r => {
                setPlayerSign(r)
            })
        }
    }, [socket])

    useEffect(() => {
        if (playerSign !== '') {
            socket.on('turnX', () => {
                playerSign === 'X' ? setIsTurn(true) : setIsTurn(false)
            })
            socket.on('turnO', () => {
                playerSign === 'O' ? setIsTurn(true) : setIsTurn(false)
            })
            socket.on('winner', win => {
                setWinner(win)
                setIsTurn(false)
            })
        }
    }, [playerSign])

    const createRoom = () => {
        const roomName = create.current.value
        setCurrentRoom(roomName)
        socket?.emit('newRoom', roomName)
    }

    const joinRoom = () => {
        const roomName = join.current.value
        setCurrentRoom(roomName)
        socket?.emit('joinRoom', roomName)
    }

    const onTurn = (room, sign, rowIndex, columnIndex) => {
        if (sign === 'X' || sign === 'O') return
        socket?.emit(`play${playerSign}`, { room, row: rowIndex, column: columnIndex })
        setIsTurn(!isTurn)
    }

    return <div>
        <div>trying to connect</div>
        <div>
            <input ref={create}></input>
            <button onClick={createRoom}>Create Room</button>
        </div>
        <div>
            <input ref={join}></input>
            <button onClick={joinRoom}>Join Room</button>
        </div>
        <div>
            <Board board={board} onTurn={onTurn} isTurn={isTurn} room={currentRoom} />
        </div>
        <div>
            <p>{winner ? `The winner is: ${winner}` : null}</p>
        </div>
    </div>
}