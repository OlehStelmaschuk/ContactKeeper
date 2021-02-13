import React, { Fragment, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const { contacts, filtered, getContacts, loading } = useContext(
    ContactContext
  );

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading)
    return <h4>Please add contact</h4>;

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <AnimatePresence>
          {filtered !== null
            ? filtered.map((contact) => (
                <motion.div
                  key={contact._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ContactItem contact={contact} />
                </motion.div>
              ))
            : contacts.map((contact) => (
                <motion.div
                  key={contact._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ContactItem contact={contact} />
                </motion.div>
              ))}
        </AnimatePresence>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
