// ChangesTable.js
import React, { useState, useEffect } from 'react';
import { api } from '../../functions/axiosDefault';
import Swal from 'sweetalert2';

const ChangeRequest = () => {
  const [changesData, setChangesData] = useState([]);
  const [status, setStatus] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.post('/getAllChanges'); 
        setChangesData(result.data);
        console.log("changes",result);
      } catch (error) {
        console.error('Error fetching changes:', error);
        // Handle the error (e.g., show an error message)
      }
    };

    fetchData();
  }, [status]);

  const handleBorewell = async (data) =>{
    let result1 = await api.post('/updateChanges', {
      changeId: data._id,
      
      // borewellCount:totalBoreWell.length+1
    })
    let result = await api.post('/borewellDailyDpr', {
      projectName: data.projectName,
      gpName: data.gpName,
      // borewellCount:totalBoreWell.length+1
    })
    setStatus(!status)
    Swal.fire({title:result.data.data.message,
    icon:'success',
    timer:2000
    })
  }

  return (
    <div>
      <h1>Changes Table</h1>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>GP Name</th>
            <th>Type Of Work </th>
            <th>Message</th>
            <th>Is Previous Borewell Completed</th>
            <th>Create New BoreWell</th>
          </tr>
        </thead>
        <tbody>
          {changesData && changesData.length>0 && changesData.map(change => (
            <tr key={change._id}>
              <td>{change.projectName}</td>
              <td>{change.gpName}</td>
              <td>{change.typeOfWork}</td>
              <td>{change.message}</td>
              <td>{change.borewellCompleted?"Yes":"No"}</td>
              <td>{change.createBorewell && change.typeOfWork=="Borewell"?<button className='btn btn-primary' disabled={change.workDone==true} onClick={()=>handleBorewell(change)}>Create Borewell</button>:""}</td>
              {/* <td>{change.createBorewell && change.typeOfWork=="Borewell"?<button className='btn btn-primary' onClick={()=>handleBorewell(change)}>Create Borewell</button>:""}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChangeRequest;
