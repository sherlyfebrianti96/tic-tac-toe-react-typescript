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
    switch(true) {
      case this.checkWinnerHorizontal():
        console.log('winner found');
        break;
      default:
        console.log('change turn');
        this.changeTurn();
        break;
    }
  }

  checkWinnerHorizontal(): boolean {
    let winnerFound = false;
    const isOwnByCurrentPlayer = (currentValue: PlayerEnum) => currentValue === this.state.turn;
    this.state.boardDimension.forEach((horizontalBoxes: PlayerEnum[]) => {
      const hBoxesOwnedByCurrentPlayer = horizontalBoxes.every(isOwnByCurrentPlayer);
      if (hBoxesOwnedByCurrentPlayer) {
        winnerFound = true;
        this.setWinner();
      }
    });

    return winnerFound;
  }

  setWinner() {
    this.setState({'winner': this.state.turn});
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
