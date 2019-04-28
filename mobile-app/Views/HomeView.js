import React from 'react';
import {
  Dimensions, StyleSheet, Button, View, BackAndroid
} from 'react-native';
import { Card } from 'react-native-elements';
import { VIEWS } from './my/Constants.json';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { switchView } = this.props;
    return (
      <View style={styles.main}>
        <View style={styles.form}>
          <Card title="TAZWEED APP - HOME" containerStyle={{ height: '90%' }}>
            <View style={{ flexDirection: 'column', width: '80%', left: "10%" }}>
              <View style={{ margin: 10 }}>
                <Button color="#00796B" title="Book Appointment" borderRadius={15}
                  buttonStyle={{ borderRadius: 15 }} containerViewStyle={{ borderRadius: 15 }}
                  onPress={() => { switchView({ view: VIEWS.SERVICE_SELECTION }) }} />
              </View>
              <View style={{ margin: 10 }}>
                <Button color="#00796B" title="View Appointments"
                  onPress={() => { switchView({ view: VIEWS.HOME }) }} />
              </View>
              <View style={{ margin: 10 }}>
              </View>
              <View style={{ margin: 10 }}>
                <Button color="#00796B" title="My profile"
                  onPress={() => { switchView({ view: VIEWS.HOME }) }} />
              </View>
              <View style={{ margin: 10 }}>
                <Button color="#00796B" title="My discounts"
                  onPress={() => { switchView({ view: VIEWS.HOME }) }} />
              </View>
              <View style={{ margin: 10 }}>
                <Button color="#00796B" title="Logout"
                  onPress={() => { switchView({ view: VIEWS.LOGIN }) }} />
              </View>
              <View style={{ margin: 10 }}>
                <Button color="#00796B" title="Exit"
                  onPress={() => { BackAndroid.exitApp() }} />
              </View>
            </View>
          </Card>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  form: {
    position: 'absolute', top: 10, left: 10, bottom: 10,
    flexDirection: 'column', right: 10, backgroundColor: 'white'
  },
  main: {
    top: 10, bottom: 0, backgroundColor: 'white',
    alignItems: 'stretch', flex: 1,
    flexDirection: 'column', width: Dimensions.get('window').width, height: '100%'
  }
});

export default HomeView;