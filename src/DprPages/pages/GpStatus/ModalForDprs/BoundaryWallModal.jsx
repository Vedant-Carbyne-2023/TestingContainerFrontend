import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function BoundaryWallModal({ data, closeModal }) {
  const [showModal, setShowModal] = useState(!!data);
console.log(data)
  const handleCloseModal = () => {
    setShowModal(false);
    closeModal(false)
  };

  useEffect(() => {
    if(data)
    {
        setShowModal(true)

    }
  }, [data])
  
  return (
    <div>
      {data && (
        <Modal show={showModal} onHide={handleCloseModal} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>BoundaryWall Dpr</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3" style={{ marginLeft: "20px" }}>
              {/* Display extracted data */}
              <div>
                {data.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        {/* <th>GP Name</th> */}
                        <th>Date Of Dpr</th>
                        <th>Work Done</th>
                        <th>Work Done Remarks</th>
                        <th>Labour Count</th>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th>Approved By</th>
                      </tr>
                    </thead>
                    <tbody>
                        {/* <td>{data.boundaryWallDpr[0].gpName}</td> */}
                        {
                          data.map(boundaryWall =>
                      <tr>
                            
                        <td>{moment(boundaryWall.boundaryWallDate).format('DD-MM-YYYY')}</td>
                        <td>{boundaryWall.workDone}</td>
                        <td>{boundaryWall.workDoneRemarks}</td>
                        <td>{boundaryWall.labourCount}</td>
                        <td>{boundaryWall.remarks}</td>
                        <td>{boundaryWall.status}</td>
                        <td>{boundaryWall.approvedBy?boundaryWall.approvedBy:"Not Approved"}</td>
                      </tr>
                            )
                        }
                    </tbody>
                  </table>
                ) : (
                  <p>No BoundaryWall DPR data available.</p>
                )}

             </div>
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
