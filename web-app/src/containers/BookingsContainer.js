import { connect } from 'react-redux'
import { getBookings } from '../actions'
import Bookings from '../components/Bookings'

const mapStateToProps = (state, ownProps) => {
  return {
    isLogged: state.loginReducer.isLogged,
    username: state.loginReducer.username,
    appointments: state.bookingReducer.appointments || []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBookings: () => getBookings(dispatch)
  }
}

const BookingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookings)

export default BookingsContainer
