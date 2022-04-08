import React, { Component } from 'react';
import Contactform from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter';
import { nanoid } from 'nanoid';

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    };
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    for (const contact of this.state.contacts) {
      if (name === contact.name) {
        alert(`${name} is allready in contacts`)
        return
      }
    }
    
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
        
  };

  formSubmitHandler = ({name,number}) => {
    this.addContact(name,number);
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getRealContacts = () => {
    const {contacts, filter } = this.state;
    
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter),
    );

    
  }

  render() {

    const { filter } = this.state;
    const realContacts = this.getRealContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <Contactform
          onSubmit={this.formSubmitHandler} />
          
        <h2>Contacts</h2>
        <Filter
          value={filter}
          onChange={this.changeFilter}
        />
        
        <ContactList
          option={realContacts}
          onDeleteContact={this.deleteContact}
        />
        </>
    )
  
  }
}

export default Phonebook;
