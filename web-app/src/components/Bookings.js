import React from 'react';
import Header from './templates/Header';
import BodyPanel from './templates/BodyPanel';
import { Redirect } from "react-router-dom";

function Bookings(props) {

  const { isLogged, username, getBookings, appointments } = props;

  if (!isLogged)
    return <Redirect to='/login' />

  return (<React.Fragment>
    <Header name={username} />
    <BodyPanel getBookings={getBookings} appointments={appointments} />
  </React.Fragment>);
}

export default Bookings;