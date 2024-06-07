import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';

const Card = ({ title, onClick, children }) => {
  const cardStyles = {
    width: '50%',
    height: '200px',
    maxWidth: '500px', /* Adjust the maximum width as needed */
    minWidth: '380px',
    margin: '0 auto', /* This centers the card horizontally */
    border: '1px solid #ccc',
    borderRadius: '8px',
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
    // <div className="mb-3">
    //   <div style={cardStyles}>
    //     <div className="card-body">
    //       <h5 className="card-title" style={titleStyles} onClick={onClick}>
    //         {title}
    //       </h5>
    //       {children}
    //     </div>
    //   </div>
    // </div>
    <MDBContainer fluid className="p-0 m-0 mb-3">
      <MDBCard  style={cardStyles}>
        <MDBCardBody>
          <h5 className="card-title" onClick={onClick} style={{ cursor: 'pointer' }}>
            {title}
          </h5>
          {children}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Card;
