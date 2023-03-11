import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

function EmailContent({ match }) {
  // State for email and socket
  const [email, setEmail] = useState(null);
  const [socket] = useState(() => io());

  // Use history hook for navigation
  const navigate = useNavigate();

  // Fetch email by id from backend on mount
  useEffect(() => {
    axios.get(`http://localhost:3001/emails/${match.params.id}`)
      .then(res => setEmail(res.data))
      .catch(err => console.error(err));
  }, [match.params.id]);

  // Listen for real-time updates from socket
  useEffect(() => {
    socket.on('msgToClient', (msg) => {
      setEmail(msg.find(e => e._id === match.params.id));
    });
    return () => socket.off('msgToClient');
  }, [socket, match.params.id]);

  // Handle updating read status of email
  const handleRead = () => {
    axios.put(`http://localhost:3001/emails/${match.params.id}`, { read: true })
      .then(res => setEmail(res.data))
      .catch(err => console.error(err));
  };

  // Handle deleting email by id
  const handleDelete = () => {
    axios.delete(`http://localhost:3001/emails/${match.params.id}`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
    navigate('/emails');
  };

  // Render email content or loading message
  return (
    <div className="email-content">
      {email ? (
        <>
          <h1>Email Content</h1>
          <p>From: {email.sender}</p>
          <p>To: {email.recipient}</p>
          <p>Subject: {email.subject}</p>
          <p>Content: {email.content}</p>
          {!email.read && (
            <button onClick={handleRead}>Mark as read</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}

export default EmailContent;