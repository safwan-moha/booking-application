export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const LOGIN_CLICKED = 'LOGIN_CLICKED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const APPOINTMENTS_FETCHED = 'APPOINTMENTS_FETCHED';

const url = 'http://18.191.138.76';

export function login(dispatch, username) {

  dispatch({ type: LOGIN_CLICKED });

  return fetch(`${url}:8000/login/SELLER/auth/${username}`, {
    method: "GET"
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      console.log(res);
      if (res.message === "Auth Success")
        dispatch({ type: LOGIN_SUCCESS, payload: {} });
      else dispatch({ type: LOGIN_ERROR });
    })
    .catch(error => console.log(error));
}

export function getBookings(dispatch) {

  return fetch(`${url}:8000/seller/appointments`, {
    method: "GET"
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      console.log(res);
      dispatch({ type: APPOINTMENTS_FETCHED, payload: res });
    })
    .catch(error => console.log(error));
}

export function usernameChanged(dispatch, payload) {
  dispatch({ type: USERNAME_CHANGED, payload: payload.target.value });
}
