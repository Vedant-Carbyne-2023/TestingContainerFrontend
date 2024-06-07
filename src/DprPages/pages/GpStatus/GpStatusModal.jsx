import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ShowPreviousPipeDpr from './ShowPreviousPipeDpr';

export default function GpStatusModal({ data }) {
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
      {data && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{data.gpName.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3" style={{ marginLeft: "20px" }}>
              {/* Display extracted data */}
              <div>
                <h5>Fhtc DPR</h5>
                {data.fhtcDpr.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        {/* <th>GP Name</th> */}
                        <th>Labour Count</th>
                        <th>Work Done</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td>{data.fhtcDpr[0].gpName}</td> */}
                        <td>{data.fhtcDpr[0].labourCount}</td>
                        <td>{data.fhtcDpr[0].workDone}</td>
                        <td>{data.fhtcDpr[0].remarks}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p>No Fhtc DPR data available.</p>
                )}

                <h5>Pipe DPR</h5>
                {data.pipeDpr.length > 0 ? (
                  <div style={{height:'40vh', overflow:'scroll'}}>
                   <ShowPreviousPipeDpr previousDprs={data.pipeDpr} />
                   </div>
                  // <table className="table">
                  //   <thead>
                  //     <tr>
                  //       {/* <th>GP Name</th> */}
                  //       <th>Work Done Today </th>
                  //       <th>Work Done Today (Cummulative)</th>
                  //       <th>Labour Count</th>
                  //       <th>Remarks</th>
                  //     </tr>
                  //   </thead>
                  //   <tbody>
                  //     <tr>
                  //       <td>{data.pipeDpr[0].pipeData.map(data =>
                  //       <p>{data.pipeDia} - {data.workDoneToday}</p>
                        
                  //       )
                  //       }</td>
                  //       <td>
                  //         {data.pipeDpr[0].pipeData.reduce(
                  //           (total, pipe) => total + pipe.workDoneToday,
                  //           0
                  //         )}
                  //       </td>
                  //       <td>{data.pipeDpr[0].labourCount}</td>
                  //       <td>{data.pipeDpr[0].remarks}</td>
                  //     </tr>
                  //   </tbody>
                  // </table>
                ) : (
                  <p>No Pipe DPR data available.</p>
                )}
   
                <h5>PumpHouse DPR</h5>
                {data.pumpHouseDpr.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        {/* <th>GP Name</th> */}
                        <th>Work Done Today</th>
                        <th>Labour Count</th>
                        <th>Remarks</th>
                        <th>Work Done Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td>{data.pumpHouseDpr[0].gpName}</td> */}
                        <td>{data.pumpHouseDpr[0].workDone}</td>
                        <td>{data.pumpHouseDpr[0].labourCount}</td>
                        <td>{data.pumpHouseDpr[0].remarks}</td>
                        <td>{data.pumpHouseDpr[0].workDoneRemarks}</td>
                      </tr>
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
