import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = localStorage.getItem('contactsList');
    if (localContacts) setContacts(JSON.parse(localContacts));
  }, []);

  useEffect(() => {
    localStorage.setItem('contactsList', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = id => {
    const updatedContact = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContact);
  };

  const handleChangeFilter = evt => {
    setFilter(evt.target.value);
  };

  const getFilteredContacts = (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContact = getFilteredContacts(contacts, filter);

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} addContact={addContact} />
      </div>
      <div>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList contacts={filteredContact} deleteContact={deleteContact} />
      </div>
    </>
  );
}
