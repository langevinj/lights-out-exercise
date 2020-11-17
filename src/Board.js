import React, { useState } from "react";
import Cell from "./Cell";
import { getRandomTF, getSurroundingCells } from './helpers.js'
import "./Board.css";
// import { render } from "@testing-library/react";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    while(initialBoard.length < ncols){
      let tempCol = []
      for(let i=0; i<nrows; i++){
        tempCol.push(getRandomTF());
      }
      initialBoard.push(tempCol);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let copy = [...board]
    let flattenedCopy = copy.flat();
    if(!flattenedCopy.includes(true)){
      return true
    }
    return false
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        } 
      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = JSON.parse(JSON.stringify(board));
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy)
      const surroundingCells = getSurroundingCells(y, x);
      for(let i = 0; i < surroundingCells.length; i++){
        let y = surroundingCells[i][0]
        let x = surroundingCells[i][1]
        //check that the cell exists
        if(y < ncols && x < nrows){
          flipCell(y, x, boardCopy)
        } 
      }

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  const winningMessage = (<h1 data-testid="win-message">YOU WON!!!</h1>)
  // TODO

  const tableArray = []
  for(let x=0; x<ncols; x++){
    let tempRow = []
    for(let y=0; y<nrows; y++){
      let coord = `${y}-${x}`
      tempRow.push(<Cell flipCellsAroundMe={() => flipCellsAround(coord)} isLit={board[y][x]} key={coord} coord={coord}/>);
    }
    tableArray.push(<tr key={`row-${x}`}>{tempRow}</tr>)
  }

  const tableBoard = (<table data-testid="board"><tbody>{tableArray}</tbody></table>)

  // make table board
  return(
    <div>
      {hasWon() === true ? winningMessage : tableBoard}
    </div>
  )
  // TODO
}

Board.defaultProps = {
  "nrows": 3,
  "ncols": 3,
  "chanceLightStartsOn": 0.25
}

export default Board;
