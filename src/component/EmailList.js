import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import io from 'socket.io-client';

function EmailList() {
  // State for emails and socket
  const [emails, setEmails] = useState([]);
  const [socket] = useState(() => io());

  // Fetch emails from backend on mount
  useEffect(() => {
    axios.get(`http://localhost:3001/emails`)
      .then(res => setEmails(res.data))
      .catch(err => console.error(err));
  }, []);

  // Listen for real-time updates from socket
  useEffect(() => {
    socket.on('msgToClient', (msg) => {
      setEmails(msg);
    });
    return () => socket.off('msgToClient');
  }, [socket]);

  // Render email list with pagination
  return (
    <div className="email-list">
      <h1>Email List</h1>
      <InfiniteScroll
        dataLength={emails.length}
        next={() => { }}
        hasMore={false}
        loader={<h4>Loading...</h4>}
      >
        {emails.map(email => (
          <Link to={`/emails/${email._id}`} key={email._id}>
            <div className="email-item">
              <p>{email.sender}</p>
              <p>{email.subject}</p>
              <p>{email.read ? 'Read' : 'Unread'}</p>
            </div>
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default EmailList;
