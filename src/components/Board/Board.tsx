import React from 'react';
import './Board.css';
import Box from "../Box/Box";
import {PlayerEnum} from '../../enum/PlayerEnum';

interface BoardProps {
  size: number
}

class Board extends React.Component<BoardProps> {
  state = {
    boardDimension: [],
    turn: PlayerEnum.playerOne,
    selectBox: this.selectBox,
    winner: null,
  };

  componentDidMount() {
    this.initiateNewBoard();
  }

  initiateNewBoard() {
      const boardDimension: string[][] = this.state.boardDimension;

      for (let i = 0; i < this.props.size; i++) {
        const horizontalBoard: string[] = [];
        for (let j = 0; j < this.props.size; j++) {
          horizontalBoard.push('');
        }
        boardDimension.push(horizontalBoard);
      }

      this.setState({'boardDimension': boardDimension});
  }

  changeTurn() {
    let currentTurn;
    if (this.state.turn === PlayerEnum.playerOne) {
      currentTurn = PlayerEnum.playerTwo;
    } else {
      currentTurn = PlayerEnum.playerOne;
    }
    this.setState({turn: currentTurn});
  }

  selectBox(x: number, y: number) {
    // Disable selection after the winner has been defined
    if (this.state.winner) {
      return;
    }

    const boardDimension = this.state.boardDimension.map((board: Array<string>, boardIndex: number) => {
      let boxes = board;
      if (boardIndex === x) {
        boxes = board.map((box, boxIndex) => {
          if (boxIndex === y) {
            return this.state.turn;
          } else {
            return box;
          }
        })
      }
      return boxes;
    });
    this.setState({'boardDimension': boardDimension});
    setTimeout(() => this.defineWinner(), 100);
  }

  defineWinner() {
    this.checkWinner();
    this.changeTurn();
  }

  checkWinner() {
    const dimension = this.state.boardDimension;
    let countZl = 0;
    let countZr = 0;
    for (let i = 0; i < this.props.size; i++) {
      let countX = 1;
      let countY = 1;
      for (let j = 0; j < this.props.size; j++) {
        // Escape last box since it doesn't have comparator
        if ((i >= this.props.size -1) || (j >= this.props.size -1)) {
          continue;
        }

        // Defining winner horizontally
        const currentXBoxOwnByCurrentPlayer = (dimension[i][j] === this.state.turn);
        const nextXBoxOwnByCurrentPlayer = (dimension[i][j+1] === this.state.turn);
        if (currentXBoxOwnByCurrentPlayer && nextXBoxOwnByCurrentPlayer) {
          countX++;
        }

        // Defining winner vertically
        const currentYBoxOwnByCurrentPlayer = (dimension[j][i] === this.state.turn);
        const nextYBoxOwnByCurrentPlayer = (dimension[j+1][i] === this.state.turn);
        if (currentYBoxOwnByCurrentPlayer && nextYBoxOwnByCurrentPlayer) {
          countY++;
        }
      }

      // Defining winner left-diagonally
      const currentZlBoxOwnByCurrentPlayer = (dimension[i][i] === this.state.turn);
      const nextZlBoxOwnByCurrentPlayer = (dimension[i][i] === this.state.turn);
      if (currentZlBoxOwnByCurrentPlayer && nextZlBoxOwnByCurrentPlayer) {
        countZl++;
      }

      // Defining winner right-diagonally
      const lastIndex = this.props.size - 1;
      const currentZrBoxOwnByCurrentPlayer = (dimension[lastIndex - i][i] === this.state.turn);
      const nextZrBoxOwnByCurrentPlayer = (dimension[lastIndex - i][i] === this.state.turn);
      if (currentZrBoxOwnByCurrentPlayer && nextZrBoxOwnByCurrentPlayer) {
        countZr++;
      }

      // Checking winner has been found
      if (this.checkAxisWin(countX) || this.checkAxisWin(countY) || this.checkAxisWin(countZl) || this.checkAxisWin(countZr)) {
        console.log('winner found!');
        this.setWinner();
        return;
      }
    }
  }

  checkAxisWin(countAxis: number) {
    return (countAxis === this.props.size);
  }

  setWinner() {
    this.setState({'winner': this.state.turn});
    console.log('winner : ', this.state.turn);
  }

  render() {
    return (
      <div className="board">
      {
        this.state.boardDimension.map((board: Array<string>, boardIndex: number) => {
          const boardKey = 'board' + boardIndex;
          const boxes = board.map((box, boxIndex) => {
            const boxKey = boardKey + '-box' + boxIndex;
            return <Box content={box} key={boxKey} x={boardIndex} y={boxIndex} selectBox={this.selectBox.bind(this)} />;
          })

          boxes.push(<br className="clear" key={boardKey}/>);

          return boxes;
        })
      }
      </div>
    );
  }
}

export default Board;
