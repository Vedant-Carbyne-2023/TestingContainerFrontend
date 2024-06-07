import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ShowPreviousPipeDpr from '../ShowPreviousPipeDpr';

export default function PipeModal({ data, closeModal }) {
  console.log(data)
  const [showModal, setShowModal] = useState(!!data);

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal(false)
  };

  useEffect(() => {
    if (data) {
      setShowModal(true);
    }
  }, [data]);

  return (
    <div>
      {data && (
        <Modal show={showModal} onHide={handleCloseModal} size="xl">
          <Modal.Header closeButton>
            {/* Uncomment the line below if the title is necessary */}
            <Modal.Title>Pipe Dpr</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3" style={{ marginLeft: "20px" }}>
              
              {data.length > 0 ? (
                <div style={{ height: '60vh', overflow: 'scroll' }}>
                  <ShowPreviousPipeDpr previousDprs={data} />
                </div>
              ) : (
                <p>No Pipe DPR data available.</p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
