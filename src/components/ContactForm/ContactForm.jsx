import { nanoid } from 'nanoid'
import { Component } from "react";
import { Form, Input } from './ContactForm.style';



class ContactForm extends Component {
    state = {     
        name: "",
        number: "", 
    } 

    handleChange = evt => {
        const { name, number, value } = evt.target;
        this.setState({ [name]: value, [number]: value });
      };
    
    handleSubmit = evt => {
        evt.preventDefault();
        const { contacts, addContact } = this.props;
        const { name, number } = this.state;
        const id = nanoid();
        const newContact = {id, name, number}
        // const updateContact = [newContact, ...contacts];
        // contacts.find(contact => contact.name === name ? alert(`${this.state.name} is already in contacts.`) : addContact(newContact))
        if (contacts.find(contact => contact.name === name)) {
            alert(`${this.state.name} is already in contacts.`)
            this.setState({name: "", number: ""})
            return;
        }
        addContact(newContact);
        this.setState({name: "", number: ""})
      };


    render() { 
        const { name, number} = this.state;

        return (
      <Form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <Input 
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Number:
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </Form>
        );
    }
}
 
export default ContactForm;
