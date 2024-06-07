import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function PipeStatusModal({ data }) {
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
      <h5><center>Pipe DPR</center></h5>
      {data && (
     
            <div className="mt-3" style={{ marginLeft: "20px", textAlign:'center' }}>
              {/* Display extracted data */}
              <div>
               
                {data.length > 0 ? (
                 <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
                 <thead>
                   <tr style={{ borderBottom: '1px solid #ddd' }}>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>Dpr Date</th>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>Type Of User</th>
                     <th colSpan="3" style={{ border: '1px solid #ddd' }}>Pipe Data</th>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>Cummulative Work</th>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>Labour Count</th>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>C.C. Dismantling</th>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>Laying</th>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>Per Labour Efficiency</th>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>Status</th>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>Remarks</th>
                     <th rowSpan="2" style={{ border: '1px solid #ddd' }}>Dpm Remarks</th>
                   </tr>
                   <tr style={{ borderBottom: '1px solid #ddd' }}>
                     <th style={{ border: '1px solid #ddd', width:'6rem' }}>Pipe Dia</th>
                     <th style={{ border: '1px solid #ddd', width:'5rem' }}>Work Done Till Date</th>
                     <th style={{ border: '1px solid #ddd', width:'5rem' }}>Work Done Today</th>
                   </tr>
                 </thead>
                 <tbody>
                   {data.map((dpr, index) => (
                     <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                       <td  style={{ border: '1px solid #ddd' }}>{moment(dpr.todaysDate ? dpr.todaysDate : '').format('DD-MM-YYYY')}</td>
                       <td  style={{ border: '1px solid #ddd' }}>{dpr.typeOfUser ? dpr.typeOfUser : "Employee"}</td>
                       <td colSpan="3" style={{ border: '1px solid #ddd' }}>
                         <table style={{ width: '100%' }}>
                           <tbody>
                             {dpr.pipeData.map((dia, diaIndex) => (
                               <tr key={diaIndex} style={{ border: '1px solid #ddd' }}>
                                 <td style={{ border: '1px solid #ddd', width:'6rem'  }}>{dia.pipeDia}</td>
                                 <td style={{ border: '1px solid #ddd', width:'5rem' }}>{dia.workDoneTillDate}</td>
                                 <td style={{ border: '1px solid #ddd', width:'5rem' }}>{dia.workDoneToday}</td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
                       </td>
                       <td style={{ border: '1px solid #ddd' }}>{dpr.cummulativeWork}</td>
                       <td  style={{ border: '1px solid #ddd' }}>{dpr.labourCount}</td>
                       <td  style={{ border: '1px solid #ddd' }}>{dpr.ccDismantling}</td>
                       <td  style={{ border: '1px solid #ddd' }}>{dpr.pipeLaying}</td>
                       <td  style={{ border: '1px solid #ddd' }}>{dpr.pipeData.reduce((acc, total) => acc + total.workDoneToday, 0) / dpr.labourCount}</td>

                       <td  style={{ border: '1px solid #ddd' }}>{dpr.status}</td>
                       <td  style={{ border: '1px solid #ddd' }}>{dpr.remarks}</td>
                       <td  style={{ border: '1px solid #ddd' }}>{dpr.dpmRemarks}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
                         
                ) : (
                  <p>No Pipe DPR data available.</p>
                )}

              
            </div>
              
            </div>
         
      )}
    </div>
  );
}
