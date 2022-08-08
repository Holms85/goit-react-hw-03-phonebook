
import style from 'components/App.module.css';
import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
// import ContactItem from 'components/ContactItem/ContactItem';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      console.log('contacts were updated');
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContacts = data => {
    const { contacts } = this.state;


    contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? alert(`${data.name} is already in contact`)
      : this.setState(prevState => ({
          contacts: [data, ...prevState.contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizedfilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();
    return (
      <div>
        <h2 className={style.title}>Phonebook</h2>
        <ContactForm onSubmit={this.addContacts} />
        <h3 className={style.title}>Contacts</h3>
        <Filter filter={filter} onChange={this.changeFilter} />
          <ContactList contacts={visibleContact}
          onDeleteContact={this.deleteContact}/>
      </div>
    );
  }
}

export default App;