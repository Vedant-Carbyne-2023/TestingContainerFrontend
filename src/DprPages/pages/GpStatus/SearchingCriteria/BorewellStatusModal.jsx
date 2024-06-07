import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

export default function BorewellStatusModal({ data }) {
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
      <h5> <center>Borewell DPR</center></h5>
      {data && (
   
            <div className="mt-3" style={{ marginLeft: "20px" }}>
              {/* Display extracted data */}
              <div>

                <label>Dpr Date</label>
      <input className='form-control' disabled value={moment(data[data.length-1].todaysDate).format('DD-MM-YYYY')}/>

      <label>Drilling Date</label>
                {data[data.length-1].drillingDates.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Type Of Date</th>
                  <th> Date</th>
                  <th>Status On That Date</th>
                  <th> Drilling Depth</th>
                  <th>Reason For Non Active</th>
                </tr>
              </thead>
              <tbody>
                {data[data.length-1].drillingDates.map((drillingDate, index) => (
                  <tr key={index}>
                    <td>{drillingDate.typeOfDate}</td>
                    <td>{moment(drillingDate.workingDate).format('DD/MM/YYYY')}</td>
                    <td>{drillingDate.status}</td>
                    <td>{drillingDate.drillingDepth}</td>
                    <td>{drillingDate.status === 'Non Active' ? drillingDate.reason : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {
            data[data.length-1].loweringDate
            &&
            <div className="row">
              <div className="col-md-6">
     <label>Lowering Date</label>
      <input className='form-control' disabled value={moment(data[data.length-1].loweringDate).format('DD-MM-YYYY')}/>
      </div>
              <div className="col-md-6">
     <label>Lowering Depth</label>
      <input className='form-control' disabled value={data[data.length-1].loweringDepth}/>
      </div>
      </div>
          }
{
  data[data.length-1].gravellingDate &&
  <div className="row">
    <div className="col-md-6">
      <label>Gravelling Date</label>
      <input className='form-control' disabled value={moment(data[data.length-1].gravellingDate).format('DD-MM-YYYY')}/>
      </div>
    <div className="col-md-6">
      <label>Gravelling Packaging Quantity</label>
      <input className='form-control' disabled value={data[data.length-1].gravelPackagingQty}/>
      </div>
      </div>
}
  
{data[data.length-1].compressorDates.length > 0 && (
       <Table striped bordered hover className="mt-3">
       <thead>
         <tr>
           <th >Type Of Date</th>
           <th  >Date</th>
           <th >Status On That Date</th>
           <th colSpan={2}>Time Gap</th>
           <th >Reason For Non Active</th>
         </tr>
         <tr>
           <th colSpan={1}></th>
           <th colSpan={1}></th>
           <th colSpan={1}></th>
           <th>Start Time</th>
           <th>End Time</th>
           <th colSpan={1}></th>
         </tr>
       </thead>
       <tbody>
         {data[data.length-1].compressorDates.map((compressorDate, index) => (
           <tr key={index}>
             <td>{compressorDate.typeOfDate}</td>
             <td>{moment(compressorDate.workingDate).format('DD/MM/YYYY')}</td>
             <td>{compressorDate.status}</td>
             <td colSpan={1}>
          {compressorDate.timeGap.map((dates, idx) => (
            <div key={idx}>
              <p>{moment(dates.startTime).format('HH:mm')}</p>
            </div>
          ))}
        </td>
        <td colSpan={1}>
          {compressorDate.timeGap.map((dates, idx) => (
            <div key={idx}>
              <p>{moment(dates.endTime).format('HH:mm')}</p>
            </div>
          ))}
        </td>
             <td>
               {compressorDate.status === 'Non Active'
                 ? compressorDate.reason
                 : '-'}
             </td>
           </tr>
         ))}
       </tbody>
     </Table>

     
      )}

{data[data.length-1].opUnitDates.length > 0 && (
       <Table striped bordered hover className="mt-3">
       <thead>
         <tr>
           <th >Type Of Date</th>
           <th  >Date</th>
           <th >Status On That Date</th>
           <th colSpan={2}>Time Gap</th>
           <th >Reason For Non Active</th>
         </tr>
         <tr>
           <th colSpan={1}></th>
           <th colSpan={1}></th>
           <th colSpan={1}></th>
           <th>Start Time</th>
           <th>End Time</th>
           <th colSpan={1}></th>
         </tr>
       </thead>
       <tbody>
         {data[data.length-1].opUnitDates.map((opUnitDate, index) => (
           <tr key={index}>
             <td>{opUnitDate.typeOfDate}</td>
             <td>{moment(opUnitDate.workingDate).format('DD/MM/YYYY')}</td>
             <td>{opUnitDate.status}</td>
             <td colSpan={1}>
          {opUnitDate.timeGap.map((dates, idx) => (
            <div key={idx}>
              <p>{moment(dates.startTime).format('HH:mm')}</p>
            </div>
          ))}
        </td>
        <td colSpan={1}>
          {opUnitDate.timeGap.map((dates, idx) => (
            <div key={idx}>
              <p>{moment(dates.endTime).format('HH:mm')}</p>
            </div>
          ))}
        </td>
             <td>
               {opUnitDate.status === 'Non Active'
                 ? opUnitDate.reason
                 : '-'}
             </td>
           </tr>
         ))}
       </tbody>
     </Table>

            
      )}
 
      <label>Remarks</label>
      <input className='form-control' value={data[data.length-1].remarks}/>
 
      <label>Dpm Remarks</label>
      <input className='form-control' value={data[data.length-1].dpmRemarks}/>

                
              </div>
            </div>
          
      )}
    </div>
  );
}
