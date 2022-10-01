
import React, { useMemo, useState } from 'react'
import './App.css';

import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

import Board from './component/Board';
import { DEFAULT_BOARD_SIZE } from './config/contants';
import { calculateWinner, convertMoveListToMatrix, isEqualSquare } from './utilities';
import GameInfo from './component/GameInfo';

const App = () => {

	const [state, setState] = useState({
		moves: [],
		players: [
			{
				key: "X",
				name: "Pikachu",
			},
			{
				key: "O",
				name: "Raichu",
			},
		],
		turn: 0,
		boardSize: DEFAULT_BOARD_SIZE,
		displayMoves: [],
		isAsc: true,
		selectedMove: undefined,
	})

	const {selectedMove, players, turn, moves, boardSize, isAsc, displayMoves } = useMemo(()=>{
		return state;
	},[state]);

	const board = useMemo(()=>{
		return convertMoveListToMatrix(displayMoves, boardSize)
	},[displayMoves, boardSize])

	const winSquares = useMemo(()=>{
		return calculateWinner(board);
	},[board])

	const onSquareClick = (pos) => {
		setState((prev) => {
			if (!board[pos.row][pos.col].length && !winSquares) {
				const newState = {
					...prev,
					turn: (!prev.turn) << 0,
					moves: [...prev.displayMoves, {
						...pos,
						value: prev.players[prev.turn].key,
						index: prev.displayMoves.length,
					}],
					selectedMove: undefined,
				};
				newState.displayMoves = [...newState.moves];
				return newState;
			}
			return prev;
		})
	}

	const jumpTo = (step) => {

		if (!step) {
			setState(prev => ({
				...prev,
				displayMoves: [],
				turn: 0,
				selectedMove: null,
			}))
		}
		else {
			setState(prev => {
				const index = prev.moves.findIndex(move => isEqualSquare(move, step));
				const turn = prev.players.findIndex(item => item.key === step.value);
				if (index >= 0) {
					return {
						...prev,
						displayMoves: prev.moves.slice(0, index + 1),
						turn: (!turn) << 0,
						selectedMove: step,
					}
				}
				return {
					...prev,
				}
			})
		}
	}

	const sortMoves = () => {
		setState(prev => {
			return {
				...prev,
				isAsc: !prev.isAsc
			}
		})
	}

	const changeBoardSize = (newSize) => {
		setState(prev => ({
			...prev,
			boardSize: newSize,
		}));
		jumpTo(null)
	}



	return (
		<Paper
			sx={{
				padding: 2,
			}}
		>
			<Typography component={"h3"} variant={"h4"} textAlign="center">Tic tac toe</Typography>
			<Stack
				direction="row"
				marginTop={2}
				spacing={2}
			>
				<Board
					turn={turn}
					board={board}
					onSquareClick={onSquareClick}
					winSquares={winSquares}
				/>

				<GameInfo
					winSquares={winSquares}
					moves={moves}
					boardSize={boardSize}
					players={players}
					sortMoves={sortMoves}
					isAsc={isAsc}
					jumpTo={jumpTo}
					turn={turn}
					changeBoardSize={changeBoardSize}
					selectedMove={selectedMove}
				/>
			</Stack>
		</Paper>
	)
}

export default App