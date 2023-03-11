import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmailList from './component/EmailList';
import EmailContent from './component/EmailContent';
import Modal from './component/Modal';

// App component with routing

function App() {

  // State for showing modal

  const [showModal, setShowModal] = useState(false);

  // Handler for opening modal

  const handleNewEmail = () => {
    setShowModal(true);
  };

  // Handler for closing modal

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Render app with routing

  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/emails">Emails</Link>
            </li>
            <li>
              <button onClick={handleNewEmail}>New Email</button>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/emails" element={<EmailList />} />
          <Route path="/emails/:id" element={<EmailContent />} />
        </Routes>
        <Modal show={showModal} onClose={handleCloseModal} />
      </Router>
    </div>
  );
}

export default App;
