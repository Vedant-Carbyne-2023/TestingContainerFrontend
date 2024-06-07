import React, { useState } from 'react';

const EmailInputForm = () => {
  const [emails, setEmails] = useState(['']); // Initial email input

  const handleAddEmail = () => {
    setEmails([...emails, '']); // Add a new empty email input
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  return (
    <div className="container mt-4">
      <h2>Email Input Form</h2>
      {emails.map((email, index) => (
        <div key={index} className="mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleEmailChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type='button' className="btn btn-primary" onClick={handleAddEmail}>
        Add Email
      </button>
    </div>
  );
};

export default EmailInputForm;
