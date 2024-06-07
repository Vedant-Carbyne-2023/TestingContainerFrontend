import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function PumpHouseStatusModal({ data }) {
  const [showModal, setShowModal] = useState(!!data);
console.log(data)
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if(data)
    {
        setShowModal(true)

    }
  }, [data])
  
  return (
    <div>
      <h5><center>Pump House DPR</center></h5>
      {data && (
        
            <div className="mt-3" style={{ marginLeft: "20px" }}>
              {/* Display extracted data */}
              <div>
                {data.length > 0 ? (
                  <table className="table table-bordered">
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
          
      )}
    </div>
  );
}
