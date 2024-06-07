import React from 'react';

const Card = ({ title, onClick, children }) => {
  return (
    <div className="mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title" onClick={onClick} style={{cursor:"pointer"}}>
            {title}
          </h5>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
