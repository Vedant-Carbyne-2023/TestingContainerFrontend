import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function PumpHouseModal({ data, closeModal }) {
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
            <Modal.Title>PumpHouse Dpr</Modal.Title>
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
                        {/* <td>{data.pumpHouseDpr[0].gpName}</td> */}
                        {
                          data.map(pumpHouse =>
                      <tr>
                            
                        <td>{moment(pumpHouse.pumpHouseDate).format('DD-MM-YYYY')}</td>
                        <td>{pumpHouse.workDone}</td>
                        <td>{pumpHouse.workDoneRemarks}</td>
                        <td>{pumpHouse.labourCount}</td>
                        <td>{pumpHouse.remarks}</td>
                        <td>{pumpHouse.status}</td>
                        <td>{pumpHouse.approvedBy?pumpHouse.approvedBy:"Not Approved"}</td>
                      </tr>
                            )
                        }
                    </tbody>
                  </table>
                ) : (
                  <p>No PumpHouse DPR data available.</p>
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
