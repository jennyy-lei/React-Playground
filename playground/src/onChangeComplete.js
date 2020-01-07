import React from 'react';
import { PhotoshopPicker } from 'react-color';

class Component extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color, event) => {
    this.setState({ background: color.hex });
  };

  render() {
    return <PhotoshopPicker onChangeComplete={ this.handleChangeComplete } />;
  }
}