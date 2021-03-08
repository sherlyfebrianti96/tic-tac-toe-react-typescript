import React from 'react';
import './Box.css';

interface BoxProps {
  content: string;
  x: number;
  y: number;
  selectBox: (x: number, y: number) => void;
}

class Box extends React.Component<BoxProps> {
  selectingBox() {
    this.props.selectBox(this.props.x, this.props.y);
  }

  render() {
    return (
        <div className="box" onClick={this.selectingBox.bind(this)}>
          {this.props.content}
        </div>
    );
  }
}

export default Box;
