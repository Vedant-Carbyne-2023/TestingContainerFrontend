import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ShowPreviousBorewellDpr from './ShowPreviousBorewellDpr'; // Import your existing component

const BorewellDprModal = ({ previousBorewellDpr }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} title={"Click Here To Get Previous Filled Borewell Details"}>
        Previous Dprs
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Previous Borewell DPR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {previousBorewellDpr && <ShowPreviousBorewellDpr previousDprs={previousBorewellDpr} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BorewellDprModal;
