import React, { useMemo } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { isEqualSquare } from '../utilities';

const MoveList = ({
    moves,
    itemClick,
    isAsc,
    selectedMove,
}) => {

    const arr = useMemo(() => {
        const result = [...moves];
        result.sort((a, b) => {
            if (isAsc) {
                return a.index - b.index;
            }
            return b.index - a.index;
        });
        return result;
    }, [moves, isAsc]);

    if (!arr.length) {
        return (
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => { itemClick(null) }}
                        sx={{
                            ...(selectedMove === null && { fontWeight: "bold" })
                        }}
                    >
                        Trở về lúc bắt đầu!
                    </ListItemButton>
                </ListItem>
            </List>
        )
    }

    return (
        <ol>
            {arr.map((item) => {
                return (
                    <React.Fragment key={`${item.row}-${item.col}`}>
                        {isAsc && item.index === 0 && (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => { itemClick(null) }}
                                    sx={{
                                        ...(selectedMove === null && { fontWeight: "bold" })
                                    }}
                                >
                                    Trở về lúc bắt đầu!
                                </ListItemButton>
                            </ListItem>
                        )}
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => itemClick(item)}
                                sx={{
                                    ...(selectedMove && isEqualSquare(selectedMove, item) && { fontWeight: "bold" })
                                }}
                            >
                                Trở về lượt {`#${item.index + 1} (${item.row}, ${item.col}, ${item.value})`}
                            </ListItemButton>
                        </ListItem>
                        {!isAsc && item.index === 0 && (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => { itemClick(null) }}
                                    sx={{
                                        ...(selectedMove === null && { fontWeight: "bold" })
                                    }}
                                >
                                    Trở về lúc bắt đầu!
                                </ListItemButton>
                            </ListItem>
                        )}
                    </React.Fragment>
                )
            })}
        </ol>
    )
}

export default MoveList