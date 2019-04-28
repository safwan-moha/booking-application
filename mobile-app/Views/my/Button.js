import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class Row extends Component {
  render = () => {
    const { text, style = {}, onPress } = this.props;
    style.width = "100%";
    style.height = 55;

    return (
      <TouchableOpacity style={style} onPress={() => onPress()}>
        <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }} >{text}</Text>
      </TouchableOpacity>
    );
  }
}
export default Row;