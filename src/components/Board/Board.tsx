import React from 'react';
import './Board.css';
import Box from "../Box/Box";

class Board extends React.Component {
  render() {
    return (
      <div className="board">
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <br className="clear"/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <br className="clear"/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <br className="clear"/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <br className="clear"/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
        <Box/>
      </div>
    );
  }
}

export default Board;
