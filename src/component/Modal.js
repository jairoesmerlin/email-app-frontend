import React, { useState } from 'react';
import axios from 'axios';

function Modal({ show, onClose }) {

  // State for email fields

  const [sender, setSender] = useState('');

  const [recipient, setRecipient] = useState('');

  const [subject, setSubject] = useState('');

  const [content, setContent] = useState('');

  // Handle submitting new email to backend

  const handleSubmit = (e) => {

    e.preventDefault();

    axios.post('http://localhost:3001/emails', {

      sender,

      recipient,

      subject,

      content,

    })

      .then(res => console.log(res.data))

      .catch(err => console.error(err));

    onClose();

  };

  // Render modal or null

  return (

    show ? (

      <div className="modal">

        <div className="modal-content">

          <h1>New Email</h1>

          <form onSubmit={handleSubmit}>

            <label>From:</label>

            <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} required />

            <label>To:</label>

            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />

            <label>Subject:</label>

            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />

            <label>Content:</label>

            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />

            <button type="submit">Send</button>

            <button type="button" onClick={onClose}>Cancel</button>

          </form>

        </div>

      </div>

    ) : null

  );

}

export default Modal;
