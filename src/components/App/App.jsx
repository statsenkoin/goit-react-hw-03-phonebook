import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { initialContacts } from 'dataBase';
import {
  Layout,
  Title,
  FormsWrapper,
  Notification,
  ContactsTitle,
  ContactListBox,
} from './App.styled';
import { Filter, ContactList, FormikForm } from 'components';
// import { ContactForm } from 'components';

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addContact = newContact => {
    const { name: userName } = newContact;
    const { contacts } = this.state;

    let isContactExists = contacts.some(({ name }) => name === userName);
    if (isContactExists) {
      return alert(`${userName} is already in contacts!`);
    }

    newContact = { ...newContact, id: nanoid(8) };
    this.setState(({ contacts }) => ({ contacts: [newContact, ...contacts] }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterContactsByName = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filteredContacts = this.filterContactsByName();
    const { contacts, filter } = this.state;
    return (
      <Layout>
        <Title>Phonebook</Title>
        <FormsWrapper>
          {/* <ContactForm onSubmit={this.addContact}></ContactForm> */}
          <FormikForm onSubmit={this.addContact}></FormikForm>
        </FormsWrapper>
        <ContactsTitle>Contacts</ContactsTitle>
        {contacts.length ? (
          <ContactListBox>
            <Filter value={filter} onChange={this.onFilter}></Filter>
            <ContactList
              contacts={filteredContacts}
              onClick={this.deleteContact}
            ></ContactList>
          </ContactListBox>
        ) : (
          <Notification>No any contacts in phonebook</Notification>
        )}
      </Layout>
    );
  }
}

export { App };
