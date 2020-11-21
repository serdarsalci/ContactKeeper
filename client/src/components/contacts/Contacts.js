import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'
import Spinner from '../layout/Spinner';

export const Contacts = () => {

  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  let msg;

  if (filtered !== null && contacts !== null && !loading) {

    msg = (filtered === null) ? contacts.length + ' contacts in records' : filtered.length + ' contacts matching'
  }


  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, [])

  if (contacts !== null && contacts.length === 0 && !loading) {

    return <span>Please add a contact</span>
  }

  if (filtered !== null && filtered.length === 0) {

    return <span>No matching contact</span>
  }

  return (
    <Fragment>

      {contacts !== null && !loading ? (<TransitionGroup>

        <span>{msg}</span>

        {(filtered !== null) ?
          (filtered.map(contact =>
            <CSSTransition key={contact._id} timeout={300} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          )) :
          (contacts.map(contact =>
            <CSSTransition key={contact._id} timeout={300} classNames="item">
              <ContactItem key={contact._id} contact={contact} />
            </CSSTransition>
          ))}
      </TransitionGroup>) : <Spinner />}
    </Fragment>
  );
}

export default Contacts;