import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'

class Row extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const { name, location, rating, resTime, id, i } = this.props;

    return (
      <TouchableOpacity onPress={() => { this.props.onPress(i) }}>
        <Card containerStyle={{ marginVertical: 0 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 17, flex: 2 }} >{name} - {location}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ display: "none" }} >{i}</Text>
            <Text style={{ display: "none" }} >{id}</Text>
            {resTime
              ? <Text style={{ fontSize: 14, flex: 2 }} >Typically responds in {resTime} mins</Text>
              : null}
            {rating
              ? <Text style={{ fontSize: 14, flex: 1, textAlign: 'right' }}>{rating}* rating</Text>
              : null}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default Row;