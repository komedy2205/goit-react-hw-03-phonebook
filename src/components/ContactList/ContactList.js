import React from "react";
import PropTypes from 'prop-types';

const ContactList = ({option, onDeleteContact}) => {
    
        return (
        <ul>
            {option.map((type) => (
                <li key={type.id}>
                    {type.name}: {type.number} 
                    <button type="button" onClick={() => onDeleteContact(type.id)}>Удалить</button>
                </li>
            ))}
            </ul>
        )
    };

ContactList.propTypes = {
  option: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
}

export default ContactList