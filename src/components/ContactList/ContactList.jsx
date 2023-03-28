import { List } from "./ContactList.style";
import PropTypes from 'prop-types';



export const ContactList = ({contacts, deleteContact}) => {
    return (
        <List>
          {contacts.map(({id, name, number}) => {
            return <li key={id}>{name}: {number} <button onClick={() => deleteContact(id)}>Delete</button></li>
          })}
        </List>
    )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
};