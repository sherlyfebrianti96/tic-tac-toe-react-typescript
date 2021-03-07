import React from 'react';
import './Body.css';
import Board from "../Board/Board";

class Body extends React.Component {
  render() {
    return (
      <div className="body">
        <h3>Game description :</h3>
        <ul>
          <li>There will be a board</li>
          <li>There will be a box</li>
          <ul>
            <li>There will be a box of N x N (N = dimension of X,Y)</li>
            <li>There will be a custom input for N</li>
            <li>N cannot be update after game started</li>
            <li>N can be updated again after the game has been reset</li>
          </ul>
          <li>There will be a start button to start the game play</li>
          <li>There will be a stop button to stop the game play</li>
          <li>There will be a reset button to reset the game play</li>
          <li>There will be 2 players (X and O)</li>
          <li>Each of player will be a winner after one of them can cross the horizontal/vertical/diagonal line of the board</li>
        </ul>

        <div className="gameplay">
          <h2>Let's play !</h2>

          {/* Input Board Dimension (X,Y) */}

          {/* Board */}
          <Board/>
        </div>
      </div>
    );
  }
}

export default Body;
