import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styles from '../../../../AdminPages/TableModule/TableSticky.module.css';

export default function FhtcModal({ data, closeModal }) {
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
            <Modal.Title>Fhtc Dpr</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3" style={{ marginLeft: "20px" }}>
              {/* Display extracted data */}
              <div>
                {data.length > 0 ? (
                 <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
                 <div className={`${styles.tableWrapper} col`}>
                   <table className={`${styles.table} table`}>
                     <thead className={`${styles.stickyHeader} sticky`}>
                       <tr>
                        {/* <th>GP Name</th> */}
                        <th>Date Of Dpr</th>
                        <th>Work Done</th>
                        <th>Labour Count</th>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th>Approved By</th>
                      </tr>
                    </thead>
                    <tbody>
                        {/* <td>{data.fhtcDpr[0].gpName}</td> */}
                        {
                          data.map(fhtc =>
                      <tr>
                            
                        <td>{moment(fhtc.fhtcDate).format('DD-MM-YYYY')}</td>
                        <td>{fhtc.workDone}</td>
                        <td>{fhtc.labourCount}</td>
                        <td>{fhtc.remarks}</td>
                        <td>{fhtc.status}</td>
                        <td>{fhtc.approvedBy?fhtc.approvedBy:"Not Approved"}</td>
                      </tr>
                            )
                        }
                    </tbody>
                  </table>
                  </div>
                  </div>
                ) : (
                  <p>No Fhtc DPR data available.</p>
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
