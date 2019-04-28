import React from 'react';
import {
  Dimensions, Alert, StyleSheet, View, Text,
  ActivityIndicator, TextInput, Keyboard, AsyncStorage
} from 'react-native';
import { Icon } from 'react-native-elements'
import { processJson } from '../logic/myLodash';
import mydb from '../api/mydb';
import { VIEWS } from './my/Constants.json';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  tryLogin() {
    Keyboard.dismiss();
    const { username, password } = this.state;
    this.setState({ isLoading: true });
    if (username == '' || password == '') {
      this.setState({ isLoading: false });
      Alert.alert(
        'Empty Field',
        'Please type username and password',
        [{ text: 'OK', onPress: () => { } }],
        { cancelable: true }
      )
    }
    else
      mydb.login({ username, password })
        .then((data) => { this.gotoHomeView(data) })
        .catch((err) => {
          this.setState({ isLoading: false });
          Alert.alert(
            'Internet Error',
            'Please check your connection: ' + err,
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: true }
          )
        });
  };

  componentDidMount() {
    AsyncStorage.getItem('defaultUsername')
      .then((defaultUsername) => {
        this.setState({ username: defaultUsername });
      })
      .catch((e) => { console.log(e) })

    this.gotoHomeView = this.gotoHomeView.bind(this);
    this.tryLogin = this.tryLogin.bind(this);
  };

  gotoHomeView = (data) => {
    this.setState({ isLoading: false });
    const formattedData = processJson(data._bodyText, {});

    if (formattedData.message === 'Auth Success') {
      global.user = this.state.username;
      this.props.switchView({ view: VIEWS.HOME })
    }
    else
      Alert.alert(
        'Wrong credentials', 'Username or password wrong',
        [{ text: 'OK', onPress: () => { } }],
        { cancelable: true }
      )
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.topic}>
          <Text style={{ fontSize: 24, textAlign: 'center', color: '#efefef' }}>{"TAZWEED LOGIN"}</Text>
          <Text style={{ fontSize: 17, textAlign: 'center', color: '#efefef' }}>{"Appointment Booking"}</Text>
          <Text style={{ fontSize: 17, textAlign: 'center', color: '#efefef' }}>{" "}</Text>
        </View>
        <View style={styles.textview}>
          <TextInput
            style={{ marginHorizontal: 30, textAlign: 'center', fontSize: 16, backgroundColor: 'white', borderRadius: 5, height: 52 }}
            type="text" placeholder="Username here"
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username} />
          <TextInput
            style={{ marginHorizontal: 30, textAlign: 'center', marginVertical: 20, fontSize: 16, backgroundColor: 'white', borderRadius: 5, height: 52 }}
            type="password" secureTextEntry={true} placeholder="Password here"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password} />
        </View>
        {this.state.isLoading
          ? <ActivityIndicator size="large" color="white" />
          : null}
        <View style={styles.next}>
          <Icon
            raised name='keyboard-tab'
            onPress={() => this.tryLogin()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topic: {
    position: 'absolute', top: 30, left: 16, right: 16, paddingTop: 60
  },
  next: {
    position: 'absolute', bottom: 10, right: 10
  },
  main: {
    top: 0, bottom: 0, backgroundColor: '#00796B',
    alignItems: 'stretch', flex: 1, color: '#efefef',
    flexDirection: 'column', width: Dimensions.get('window').width, height: '100%'
  },
  textview: {
    paddingTop: 180
  }
});

export default LoginView;


