import React from 'react';
import './Board.css';
import Box from "../Box/Box";

interface BoardProps {
  size: number
}

class Board extends React.Component<BoardProps> {
  state = {
    boardDimension: [],
  };

  constructor(props: BoardProps) {
    super(props);
  }

  componentDidMount() {
    const boardDimension: string[][] = this.state.boardDimension;

    for (let i = 0; i < this.props.size; i++) {
      const horizontalBoard: string[] = [];
      for (let j = 0; j < this.props.size; j++) {
        horizontalBoard.push('');
      }
      boardDimension.push(horizontalBoard);
    }

    this.setState({'boardDimension': boardDimension});
    console.log('this.state.boardDimension : ', this.state.boardDimension);
  }

  render() {
    return (
      <div className="board">
      {
        this.state.boardDimension.map((board: Array<string>) => {
          const boxes = board.map(() => {
            return <Box/>;
          })

          boxes.push(<br className="clear"/>);

          return boxes;
        })
      }
      </div>
    );
  }
}

export default Board;
