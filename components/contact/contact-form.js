import axios from 'axios';
import classes from './contact-form.module.css';
import { useState, useEffect } from 'react';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
  const response = await axios.post('/api/contact', {
    email: contactDetails.email,
    name: contactDetails.name,
    message: contactDetails.message
  });

  const data = response.data;
  if (response.status !== 201) {
    throw new Error(data.message || 'Something went wrong');
  }
}

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestError, setRequestError] = useState();

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredEmail,
        message: enteredMessage,
      });
      setEnteredMessage('');
      setEnteredEmail('');
      setEnteredName('');
    } catch (error) {
      setRequestError(error.message);
    }
  };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required value={enteredEmail} onChange={(e) => setEnteredEmail(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='name' id='name' required value={enteredName} onChange={(e) => setEnteredName(e.target.value)} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea id='message' rows='5' value={enteredMessage} onChange={(e) => setEnteredMessage(e.target.value)}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  )
}

export default ContactForm