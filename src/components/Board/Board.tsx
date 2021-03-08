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
    this.changeTurn();
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
