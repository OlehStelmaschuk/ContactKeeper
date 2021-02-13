import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import uuid from 'react-uuid';
import * as TYPE from '../types';
const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);
  // Set alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: TYPE.SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(
      () => dispatch({ type: TYPE.REMOVE_ALERT, payload: id }),
      timeout
    );
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
