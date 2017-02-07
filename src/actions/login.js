import * as types from '../constants/actionTypes';
import { push } from 'react-router-redux';
import fetchGoogleAuth from '../services/fetchGoogleAuth';

// Action Creators
export function createSessionRequest() {
  return {
    type: types.CREATE_SESSION_REQUEST
  };
}

export function createSessionSuccess() {
  return {
    type: types.CREATE_SESSION_SUCCESS
  };
}

export function createSessionFailure(data) {
  return {
    type: types.CREATE_SESSION_FAILURE,
    error: data.error
  };
}

// thunk for create a user session
export function createSession(imediate) {
  return (dispatch) => {
    dispatch(createSessionRequest());

    return fetchGoogleAuth(false, () => {
      dispatch(createSessionSuccess());
    }, () => {
      dispatch(createSessionFailure({ error: 'Oops! Something went wrong and we couldn\'t login yout user'}));
    });
  };
}