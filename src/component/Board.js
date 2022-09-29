import React from 'react'
import Stack from "@mui/material/Stack"
import Square from './Square';

const Board = ({
    board,
    winSquares,
    turn,
    onSquareClick,
}) => {
    return (
        <Stack
            direction="column"
        >
            {board.map((row, rowIndex) => {
                return (
                    <Stack direction="row" key={rowIndex}>
                        {row.map((value, colIndex) => {
                            return (
                                <Square
                                    turn={turn}
                                    isWinSquare={winSquares && winSquares.find(item => item.row === rowIndex && item.col === colIndex)}
                                    pos={{
                                        row: rowIndex,
                                        col: colIndex,
                                    }}
                                    key={`${rowIndex}-${colIndex}`}
                                    value={value}
                                    onClick={onSquareClick}
                                />
                            )
                        })}
                    </Stack>
                )
            })}
        </Stack>
    )
}

export default Board