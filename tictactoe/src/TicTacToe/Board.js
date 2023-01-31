import React from 'react'

export const Board = ({ board = [], onTurn, isTurn, room }) => {
    const table = board?.map((row, rIndex) => {
        return <div key={rIndex}>
            {row.map((sign, cIndex) => {
                return <button key={cIndex} onClick={() => onTurn(room, sign, rIndex, cIndex)} disabled={!isTurn}>{sign}</button>
            })}
        </div>
    })
    return <div>
        {table}
    </div>
}