import { connect } from 'react-redux'
import { login, usernameChanged } from '../actions'
import Login from '../components/Login'

const mapStateToProps = (state, ownProps) => {
  return {
    isLogged: state.loginReducer.isLogged,
    isLoading: state.loginReducer.isLoading,
    username: state.loginReducer.username
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginClicked: (name) => login(dispatch, name),
    nameTyped: (name) => usernameChanged(dispatch, name)
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
