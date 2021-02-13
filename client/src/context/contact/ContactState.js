import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import * as TYPE from '../types';
const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts

  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: TYPE.GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: TYPE.CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Add Contact

  const addContact = async (contact) => {
    // contact.id = uuid();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: TYPE.ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: TYPE.CONTACT_ERROR, payload: err.response.msg });
    }
  };
  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: TYPE.DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: TYPE.CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: TYPE.UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: TYPE.CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Set current contact

  const setCurrent = (contact) => {
    dispatch({ type: TYPE.SET_CURRENT, payload: contact });
  };

  // Clear Current Contact

  const clearCurrent = () => {
    dispatch({ type: TYPE.CLEAR_CURRENT });
  };

  // Filter Contact
  const filterContact = (text) => {
    dispatch({ type: TYPE.FILTER_CONTACTS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: TYPE.CLEAR_FILTER });
  };

  // Clear Contacts

  const clearContacts = () => {
    dispatch({ type: TYPE.CLEAR_CONTACTS });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
