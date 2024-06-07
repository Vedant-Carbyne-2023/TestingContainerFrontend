import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function FhtcStatusModal({ data }) {
  const [showModal, setShowModal] = useState(!!(data && data.length > 0));

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setShowModal(true);
    }
  }, [data]);

  return (
    <div>
      <h5> <center>FHTC DPR</center></h5>
      {data && (
        <div className="mt-3" style={{ marginLeft: "20px" }}>
          {/* Display extracted data */}
          <div>
            {data.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {/* <th>GP Name</th> */}
                    <th>Labour Count</th>
                    <th>Work Done</th>
                    <th>Cummulative Work Done</th>
                    <th>Remarks</th>
                    <th>Status</th>
                    <th>Approved By</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.labourCount}</td>
                      <td>{row.workDone}</td>
                      <td>{row.cummulativeWork}</td>
                      <td>{row.remarks}</td>
                      <td>{row.status}</td>
                      <td>{row.approvedBy?row.approvedBy:"Not Approved"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Fhtc DPR data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
