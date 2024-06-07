import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ShowPreviousPipeDpr from './ShowPreviousPipeDpr'; // Import your existing component

const PipeDprModal = ({ previousPipeDpr }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} title="Click To See Previous Pipe Dprs">
        Previous Dprs
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Previous Pipe DPR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {previousPipeDpr && <ShowPreviousPipeDpr previousDprs={previousPipeDpr} />}
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

export default PipeDprModal;
