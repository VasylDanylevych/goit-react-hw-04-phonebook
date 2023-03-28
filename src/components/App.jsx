import { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

class App extends Component {
  state = { 
    contacts: [],
    filter: "",
  } 

  componentDidMount() {
    if (localStorage.getItem("contactsList"))
			this.setState({
				contacts: JSON.parse(localStorage.getItem("contactsList")),
			})
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem("contactsList", JSON.stringify(this.state.contacts))
    };
  }

  addContact = (newContact) => {
    const { contacts } = this.state;
    const updateContact = [newContact, ...contacts];
    this.setState({contacts:updateContact})
  }

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleChangeFilter = evt => {
    this.setState({filter: evt.target.value})
  };


  getFilteredContacts = () => {
    const {filter, contacts} = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  render() {
    const { contacts, filter} = this.state;
    const filteredContact = this.getFilteredContacts();
    return (
      <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} addContact={this.addContact}/>
      </div>
      <div>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleChangeFilter}/>
        <ContactList contacts={filteredContact} deleteContact={this.deleteContact}/>
      </div>
      </>
    );
  }
}
 
export default App;