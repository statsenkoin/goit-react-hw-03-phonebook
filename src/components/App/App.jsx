import React, { Component } from 'react';
import { initialContacts } from 'dataBase';
import {
  Layout,
  Title,
  Notification,
  ContactsTitle,
  ContactListBox,
} from './App.styled';
import { Filter, ContactList, FormikForm } from 'components';
import { localStorageService as storage } from 'utils';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const data = storage.load('contacts');
    if (data) this.setState({ contacts: data });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) storage.save('contacts', contacts);
  }

  addContact = newContact => {
    const { name: userName } = newContact;
    const { contacts } = this.state;

    let isContactExists = contacts.some(({ name }) => name === userName);
    if (isContactExists) {
      return alert(`${userName} is already in contacts!`);
    }

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

  addTestData = () => {
    // storage.add('contacts', initialContacts);

    /**
     * initialContacts as test data may be added several times
     * It checks items and prevents adding if some of initialContacts
     * are in this.state.contacts
     */
    const newTestContactsList = initialContacts.filter(
      ({ id: newId }) =>
        !this.state.contacts
          .reduce((acc, { id: prevId }) => [...acc, prevId], [])
          .includes(newId)
    );
    this.setState(({ contacts }) => ({
      contacts: [...contacts, ...newTestContactsList],
    }));
  };

  render() {
    const filteredContacts = this.filterContactsByName();
    const { contacts, filter } = this.state;
    return (
      <Layout>
        <button type="button" onClick={this.addTestData}>
          Add test data
        </button>
        <Title>Phonebook</Title>
        <FormikForm onSubmit={this.addContact}></FormikForm>
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
