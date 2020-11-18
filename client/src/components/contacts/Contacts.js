import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'

export const Contacts = () => {

  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;


  //let msg = contacts.length + ' contacts'

  let msg = (filtered === null) ? contacts.length + ' contacts in records' : filtered.length + ' contacts matching'


  if (contacts.length === 0) {
    msg = 'Please add a contact'
    // return <span>Please add a contact</span>
  }

  if (filtered !== null && filtered.length === 0) {

    msg = 'No matching contact'
    // return <span>No matching contact</span>
  }




  return (
    <Fragment>

      <div style={{ height: '1em' }}>{msg}

      </div>
      {/* {(filtered !== null) ? filtered.length + ' contacts matching' : null} */}
      <TransitionGroup>

        {(filtered !== null) ?
          (filtered.map(contact =>
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          )) :
          (contacts.map(contact =>
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem key={contact.id} contact={contact} />
            </CSSTransition>
          ))}

      </TransitionGroup>
    </Fragment >
  )
}

export default Contacts;