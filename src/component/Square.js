import React from 'react'

import Button from "@mui/material/Button"
import Zoom from "@mui/material/Zoom"

import { SQUARE_SIZE } from '../config/contants'
import { keyToIcon } from '../utilities';

const Square = ({
    onClick,
    pos,
    value,
    isWinSquare,
    turn,
}) => {
    return (
        <Button
            variant="outlined"
            onClick={() => {
                onClick(pos)
            }}
            sx={{
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: SQUARE_SIZE,
                border: "1px solid #d2d2d2",
                ...(isWinSquare && { background: "yellow !important" }),
                ...(!turn && {
                    "&:hover": {
                        background: "#ff00000f",
                        borderColor: "#ff0000"
                    }
                })
            }}
            disableTouchRipple
        >
            {value && (
                <Zoom in={true}>
                    {keyToIcon(value)}
                </Zoom>
            )}
        </Button>
    )
}

export default Square