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
  }

  render() {
    return (
      <div className="board">
      {
        this.state.boardDimension.map((board: Array<string>, boardIndex: number) => {
          const boardKey = 'board' + boardIndex;
          const boxes = board.map((box, boxIndex) => {
            const boxKey = boardKey + '-box' + boxIndex;
            return <Box key={boxKey}/>;
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
