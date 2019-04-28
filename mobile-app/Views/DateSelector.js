import React from 'react';
import {
  Dimensions, StyleSheet, Button, View, Text, Alert
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Card } from 'react-native-elements';
import Row from './my/RowSingle';
import mydb from '../api/mydb';
import { VIEWS } from './my/Constants.json';

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2019-05-01",
      isLoading: false
    }
  }

  addAppointment() {
    this.setState({ isLoading: true });
    const { date } = this.state;
    mydb.addAppointment({
      date,
      time: "dummy",
      buyer_id: this.props.loggedInId,
      seller_id: this.props.selectedService.uid
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === "Success") {
          Alert.alert(
            'Booking added',
            'Your booking has been added',
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: true }
          )
          this.props.switchView({ view: VIEWS.HOME })
        } else {
          Alert.alert(
            'Error Occured',
            'Unknown error while booking',
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: true }
          )
        }
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        Alert.alert(
          'Internet Error',
          'Please check your connection: ' + err,
          [{ text: 'OK', onPress: () => { } }],
          { cancelable: true }
        )
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { switchView, selectedService } = this.props;
    return (
      <View style={styles.main}>
        <View style={styles.form}>
          <Card title="Appointment Details" containerStyle={{ height: '90%' }}>
            <View style={{ flexDirection: 'column', width: '80%', left: "10%" }}>
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 15, textAlign: 'center', color: '#111111' }}>{"Service Provider: "}</Text>
                <Row name={selectedService.username} location={selectedService.location}
                  rating={selectedService.rating} />
              </View>
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 15, textAlign: 'center', color: '#111111' }}>{"Date selected: "}</Text>
                <DatePicker
                  style={{ width: 200 }}
                  date={this.state.date}
                  mode="date"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                  minDate="2019-01-01"
                  maxDate="2020-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      display: 'none',
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  onDateChange={(date) => { this.setState({ date }) }}
                />
              </View>
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 15, textAlign: 'center', color: '#111111' }}>{"Time selected:"}</Text>
                <Row name={"Time"} location={"10:30"} />
              </View>
              <View style={{ margin: 10 }}>
                <Button color="#00796B" title="Back"
                  onPress={() => { switchView({ view: VIEWS.LOGIN }) }} />
              </View>
              <View style={{ margin: 10 }}>
                <Button color="#00796B" title="Book"
                  onPress={() => { this.addAppointment() }} />
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
    alignItems: 'stretch', flex: 1, height: '100%',
    flexDirection: 'column', width: Dimensions.get('window').width
  }
});

export default DateSelector;