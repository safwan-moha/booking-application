import React from 'react';
import {
  Text, ScrollView, ActivityIndicator, Alert, Keyboard,
  TextInput, StyleSheet, View, Dimensions
} from 'react-native';
import Events from 'react-native-simple-events';
import { Icon } from 'react-native-elements'
import mydb from '../api/mydb';
import { processJson } from '../logic/myLodash';
import Row from './my/RowSingle';
import { EVENTS, VIEWS } from './my/Constants.json';

class ServiceSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerName: '',
      isLoading: false,
      items: []
    };

    this.onSelectService = this.onSelectService.bind(this);
  }

  componentDidMount() {
    this.fetchServiceProviders();
  };

  serachServiceProviders() {
    Keyboard.dismiss();
    const { sellerName } = this.state;
    if (sellerName == '') {
      Alert.alert(
        'Empty Search',
        'Please type a Service Name',
        [{ text: 'OK', onPress: () => { } }],
        { cancelable: true }
      )
      this.populateServiceProviders([]);
    } else this.fetchServiceProviders();
  }

  fetchServiceProviders() {
    this.setState({ isLoading: true });
    mydb.getServiceProviders()
      .then((data) => { this.populateServiceProviders(data) })
      .catch((err) => {
        Alert.alert(
          'Internet Error',
          'Please check your connection: ' + err,
          [{ text: 'OK', onPress: () => { } }],
          { cancelable: true }
        )
      });
  };

  onSelectService(index) {
    Events.trigger(EVENTS.SERVICE_SELECTED, { seller: this.state.items[index] });
  };

  populateServiceProviders(data) {
    const formattedData = processJson(data._bodyText || '[]');
    console.log('formattedData', formattedData)
    this.setState({
      items: formattedData || [], isLoading: false
    });
  };

  render() {
    const datagrid = this.state.items.map((item, i) => {
      return <Row
        key={i} i={i} id={item.id} name={item.username}
        location={item.location}
        rating={item.rating} resTime={item.response_time}
        onPress={this.onSelectService}
      />;
    }, this)

    return (
      <View style={styles.main}>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            raised name='keyboard-backspace'
            onPress={() => this.props.switchView({ view: VIEWS.HOME })} />
          <TextInput
            style={{ margin: 10, marginLeft: 12, fontSize: 14, flex: 2, backgroundColor: 'white', borderRadius: 3, height: 42 }}
            type="text" placeholder="  Search service provider"
            onChangeText={(sellerName) => this.setState({ sellerName })}
            value={this.state.sellerName} />
          <Icon
            raised name='search'
            onPress={() => this.serachServiceProviders()} />
        </View>

        <View style={styles.datagrid}>
          {this.state.isLoading
            ? <ActivityIndicator size="large" color="#00796B" />
            : <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              {this.state.items.length === 0
                ? <Text style={{ textAlign: 'center', padding: 50 }}>Empty results</Text>
                : datagrid}
            </ScrollView>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  datagrid: {
    position: 'absolute', top: 70, left: 0, backgroundColor: 'white',
    right: 0, bottom: 10, flexDirection: 'column', flex: 1, paddingTop: 15
  },
  search: {
    position: 'absolute', width: 40, top: 10, right: 10, flex: 1,
    backgroundColor: '#00796B', padding: '4%'
  },
  back: {
    position: 'absolute', bottom: 10, right: 10,
    backgroundColor: '#00796B', padding: '4%'
  },
  main: {
    top: 20, bottom: 0, backgroundColor: '#00796B',
    alignItems: 'stretch', flex: 1, alignSelf: 'stretch',
    flexDirection: 'column', width: Dimensions.get('window').width, height: '100%'
  }
});

export default ServiceSelector;


