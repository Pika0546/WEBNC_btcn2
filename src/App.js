
import React, { useMemo, useState } from 'react'
import './App.css';

import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

import Board from './component2/Board';
import { DEFAULT_BOARD_SIZE } from './config/contants';
import { calculateWinner, convertMoveListToMatrix, createMatrix, isEqualSquare } from './utilities';
import GameInfo from './component2/GameInfo';

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
		board: createMatrix(DEFAULT_BOARD_SIZE, DEFAULT_BOARD_SIZE),
		displayMoves: [],
		isAsc: true,
		selectedMove: undefined,
	})

	const onSquareClick = (pos) => {
		setState((prev) => {
			if (!prev.board[pos.row][pos.col].length && !calculateWinner(prev.board)) {
				const newState = {
					turn: (!prev.turn) << 0,
					moves: [...prev.displayMoves, {
						...pos,
						value: prev.players[prev.turn].key,
						index: prev.displayMoves.length,
					}],
					selectedMove: undefined,
				};
				newState.board = convertMoveListToMatrix(newState.moves, prev.boardSize);
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
				board: convertMoveListToMatrix([], prev.boardSize),
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
						board: convertMoveListToMatrix(prev.moves.slice(0, index + 1), prev.boardSize),
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

	const {selectedMove, board, players, turn, moves, boardSize, isAsc } = useMemo(()=>{
		return state;
	},[state]);

	const winSquares = useMemo(()=>{
		return calculateWinner(board);
	},[board])

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