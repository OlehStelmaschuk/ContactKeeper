import * as TYPE from '../types';
import { CLEAR_CONTACTS, GET_CONTACTS } from '../types';

export default (state, { payload, type }) => {
  switch (type) {
    case TYPE.ADD_CONTACT:
      return {
        ...state,
        contacts: [payload, ...state.contacts],
        loading: false,
      };
    case TYPE.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact._id !== payload),
        loading: false,
      };
    case TYPE.SET_CURRENT:
      return {
        ...state,
        current: payload,
      };
    case TYPE.CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case TYPE.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === payload._id ? payload : contact
        ),
        loading: false,
      };
    case TYPE.FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case TYPE.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case TYPE.CONTACT_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
      };
    default:
      return state;
  }
};
