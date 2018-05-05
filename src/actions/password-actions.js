import {password} from './';
import axios from 'axios';

const url = 'https://react-password-manager-7.firebaseio.com/passwords';

/*
 * action types
 */

export const ADD_PASSWORD = 'ADD_PASSWORD';
export const ADD_PASSWORDS_FULFILLED = 'ADD_PASSWORDS_FULFILLED';

export const GET_PASSWORDS = 'GET_PASSWORDS';
export const FETCH_PASSWORDS_FULFILLED = 'FETCH_PASSWORDS_FULFILLED';

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const DELETE_PASSWORD = 'DELETE_PASSWORD';

/*
 * action creators
 */

export function requestPasswords() {
  return dispatch => {
    dispatch({type: GET_PASSWORDS});
    /*const request = password.get(`${url}.json`);*/
    const request = axios({
      method: 'GET',
      url: `${url}.json`
    });

    return request
      .then(response => dispatch(fetchPasswordsSuccess(response.data)))
  }
}

export function fetchPasswordsSuccess(passwords) {
  return  {
    type: FETCH_PASSWORDS_FULFILLED,
    payload: passwords
  }
}

//
export function addPassword(passwordItem) {
  return dispatch => {
    dispatch({type: ADD_PASSWORD});

    const request = axios({
      method: 'POST',
      url: `${url}.json`,
      data: passwordItem
    });

    return request
      .then(response => dispatch(addPasswordsSuccess(response.data)))
      .then(dispatch(requestPasswords))
  }
}

export function addPasswordsSuccess() {
  return  {
    type: ADD_PASSWORDS_FULFILLED
  }
}






export function updatePassword(passwordItem) {
  return dispatch => {
    dispatch({
      type: UPDATE_PASSWORD,
      payload: password.put(`${url}/${passwordItem.id}.json`, passwordItem)
    })
  }
}

export function deletePassword(id) {
  return dispatch => {
    dispatch({
      type: DELETE_PASSWORD,
      payload: password.delete(`${url}/${id}.json`)
    })
  }
}