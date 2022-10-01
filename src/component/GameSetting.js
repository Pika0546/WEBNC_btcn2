import React from 'react'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { BOARD_SIZE_OPTIONS, DEFAULT_BOARD_SIZE } from '../config/contants';

const GameSetting = ({
    applySetting,
}) => {
    
    const handleChange = (e) => {
        applySetting(e.target.value)
    }

    return (
        <Paper
            variant='outlined'
            sx={{
                padding: "0.5rem",
            }}
        >
            <p>Kích cỡ bảng:</p>
            <Select
                defaultValue={DEFAULT_BOARD_SIZE}
                fullWidth
                size="small"
                sx={{
                    margin: "0.5rem 0"
                }}
                onChange={handleChange}
            
            >

                {BOARD_SIZE_OPTIONS.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
            </Select>
            <Typography variant="caption" display="block" gutterBottom color="red">
                *Thay đổi cài đặt sẽ khiến trận đấu bắt đầu lại từ đầu.
            </Typography>
        </Paper>
    )
}

export default GameSetting