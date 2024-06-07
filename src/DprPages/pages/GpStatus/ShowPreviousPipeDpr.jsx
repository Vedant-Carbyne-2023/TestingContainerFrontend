import moment from 'moment';
import React from 'react';
import styles from '../../../AdminPages/TableModule/TableSticky.module.css';


export default function ShowPreviousPipeDpr({ previousDprs }) {
  console.log(previousDprs);

  return (
    <div>
      {previousDprs && (
        <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
        <div className={`${styles.tableWrapper} col`}>
          <table className={`${styles.table} table`}>
            <thead className={`${styles.stickyHeader} sticky`}>
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
            {previousDprs && previousDprs.map((dpr, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{moment(dpr.todaysDate?dpr.todaysDate:'').format('DD-MM-YYYY')}</td>
                <td>{dpr.typeOfUser ? dpr.typeOfUser : "Employee"}</td>
                <td colSpan="3">
                  <table style={{ width: '100%' }}>
                    <tbody>
                      {dpr.pipeData.map((dia, diaIndex) => (
                        <tr key={diaIndex}>
                          <td>{dia.pipeDia}</td>
                          <td>{dia.workDoneTillDate}</td>
                          <td>{dia.workDoneToday}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{dpr.cummulativeWork}</td>
                <td>{dpr.labourCount}</td>
                <td>{dpr.ccDismantling}</td>
                <td>{dpr.pipeLaying}</td>

                <td>{dpr.dprDetails.pipeData.reduce((acc, total) => acc + total.workDoneToday, 0) / dpr.dprDetails.labourCount}</td>

                <td>{dpr.status}</td>
                <td>{dpr.remarks}</td>
                <td>{dpr.dpmRemarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      )}
    </div>
  );
}
