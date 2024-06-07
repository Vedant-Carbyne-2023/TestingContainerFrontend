import React from 'react';

const Card = ({ title, onClick, children }) => {
  const cardStyles = {
    width: '50%',
    height: '25vh',
    maxWidth: '500px', /* Adjust the maximum width as needed */
    minWidth: '400px',
    margin: '0 auto', /* This centers the card horizontally */
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const titleStyles = {
    marginTop: '10px',
    cursor: 'pointer',
  };

  const contentStyles = {
    marginTop: '8px',
  };

  return (
    <div className="mb-3">
      <div style={cardStyles}>
        <div className="card-body">
          <h5 className="card-title" style={titleStyles} onClick={onClick}>
            {title}
          </h5>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
