import moment from 'moment';
import React from 'react';

export default function ShowPreviousPipeDpr({ previousDprs }) {
  console.log(previousDprs);

  return (
    <div>
      {previousDprs && (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Dpr Date</th>
              <th>Type Of User</th>
              <th colSpan="3">Pipe Data</th>
              <th>Cummulative Work</th>
              <th>Labour Count</th>
              <th>C.C. Dismantling</th>
              <th>Laying</th>
              <th>Per Labour Efficiency</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Dpm Remarks</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>Pipe Dia</th>
              <th>Work Done Till Date</th>
              <th>Work Done Today</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {previousDprs.map((dpr, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{moment(dpr.dprDetails.todaysDate?dpr.dprDetails.todaysDate:'').format('DD-MM-YYYY')}</td>
                <td>{dpr.dprDetails.typeOfUser ? dpr.dprDetails.typeOfUser : "Employee"}</td>
                <td colSpan="3">
                  <table style={{ width: '100%' }}>
                    <tbody>
                      {dpr.dprDetails.pipeData.map((dia, diaIndex) => (
                        <tr key={diaIndex}>
                          <td>{dia.pipeDia}</td>
                          <td>{dia.workDoneTillDate}</td>
                          <td>{dia.workDoneToday}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{dpr.dprDetails.cummulativeWork}</td>
                <td>{dpr.dprDetails.labourCount}</td>
                <td>{dpr.dprDetails.ccDismantling}</td>
                <td>{dpr.dprDetails.pipeLaying}</td>
                <td>{dpr.dprDetails.pipeData.reduce((acc, total) => acc + total.workDoneToday, 0) / dpr.dprDetails.labourCount}</td>


                <td>{dpr.dprDetails.status}</td>
                <td>{dpr.dprDetails.remarks}</td>
                <td>{dpr.dprDetails.dpmRemarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
