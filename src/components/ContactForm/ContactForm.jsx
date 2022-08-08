import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './ContactForm.module.css';
import PropTypes from 'prop-types';

class ContactForm extends Component {
static defaultProps = {
  onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
      id: nanoid(),
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={style.form} onSubmit={this.handleSubmit}>
        <label className={style.label}>
          Name
          <input
            className={style.input}
            type="text"
            onChange={this.handleChange}
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={style.label}>
          Number
          <input
            className={style.input}
            type="tel"
            onChange={this.handleChange}
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={style.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}


export default ContactForm;