import React from "react";
// import {Button} from './Button';

export class Img extends React.Component {
  // handleClick(){
  //     console.log('btn clicked');
  // }
  handleSrc() {
    switch (this.props.team) {
    }
  }

  render() {
    return (
      <p>
        Hi World
        <br />
        {this.props.text}
        <br />
        {/* <Button onClick={this.handleClick} /> */}
      </p>
    );
  }
}
