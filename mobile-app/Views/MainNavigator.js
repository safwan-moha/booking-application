import React from 'react';
import { View } from 'react-native';
import Events from 'react-native-simple-events';
import LoginView from './LoginView';
import HomeView from './HomeView';
import ServiceSelector from './ServiceSelector';
import DateSelector from './DateSelector';
import { EVENTS, VIEWS } from './my/Constants.json';

class MainNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showView: VIEWS.LOGIN,
      loggedInId: 1,
      selectedService: { uid: 21321, username: 'Sara', location: 'Sri lanka', rating: 5 } //deletee tihs
    };
  }

  componentDidMount() {
    this.switchView = this.switchView.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    Events.on(EVENTS.SERVICE_SELECTED, EVENTS.SERVICE_SELECTED, this.showDatePicker)
  };

  componentWillUnmount() {
    Events.rm(EVENTS.SERVICE_SELECTED, EVENTS.SERVICE_SELECTED)
  };

  switchView = ({ view, data }) => {
    this.setState({ showView: view, defaultUsername: data || '' });
  }

  showDatePicker({ seller }) {
    this.setState({
      selectedService: seller,
      showView: VIEWS.DATE_SELECTION
    });
  };

  render() {
    const { showView, selectedService, loggedInId } = this.state;
    return (
      <View>
        {(showView === VIEWS.LOGIN)
          ? <LoginView switchView={this.switchView} />
          : (showView === VIEWS.HOME)
            ? <HomeView switchView={this.switchView} />
            : (showView === VIEWS.SERVICE_SELECTION)
              ? <ServiceSelector switchView={this.switchView} />
              : (showView === VIEWS.DATE_SELECTION)
                ? <DateSelector
                  switchView={this.switchView}
                  loggedInId={loggedInId}
                  selectedService={selectedService} />
                : null
        }
      </View>
    );
  }
}

export default MainNavigator;
