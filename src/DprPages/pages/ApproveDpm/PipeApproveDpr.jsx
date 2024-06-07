import React, { useEffect, useState } from "react";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import Swal from "sweetalert2";

export default function PipeApproveDpr({ fetchedData, projectName }) {
  
  console.log(fetchedData)
  
  const [cummulativeWork, setCummulativeWork] = useState(0);
  const [labourCount, setLabourCount] = useState(0)
  const [reason, setReason] = useState('')
  const handlePipeApproveRequest = async (pipeDprId) => {

    console.log(fetchedData)
    return
    let result = api.post('/approveDailyPipeDpr', { pipeDprId, approvedBy: "Vedant", status: "Approved" })
    result = await errorHandler(result)
    Swal.fire({
      title: result.data.message,
      timer: 3000,
      icon: 'success'
    })
  }
  const [dpmRemarks, setDpmRemarks] = useState('')
  const handlePipeEditRequest = async (pipeDprId) => {
    if(!dpmRemarks){

      alert('Dpm Remarks Necessary')
      return
    }
    console.log(fetchedData)
    console.log(cummulativeWork)
    const calculateTotalWorkDoneToday = async() => {
      let total = 0;
      for (const data of fetchedData.data[fetchedData.data.length-1].pipeData) {
        if(data.workDoneToday)
        {total += parseInt(data.workDoneToday, 10);}
      }
      return total;
    };
    // return

try {
  let data = await calculateTotalWorkDoneToday()
  let result = api.post('/pipeDailyDpr', { 
    todaysDate:fetchedData.data[fetchedData.data.length-1].todaysDate,
    tableData:fetchedData.data[fetchedData.data.length-1].pipeData,
    cummulativeWork:cummulativeWork ,
    dpmRemarks:dpmRemarks,
    status:"Approved",
    typeOfUser:"Dpm",
    labourCount:labourCount?labourCount:fetchedData.data[fetchedData.data.length-1].labourCount,
    gpName:fetchedData.data[fetchedData.data.length-1].gpName,
    projectName:projectName
   })
  result = await errorHandler(result)
  Swal.fire({
    title: result.data.message,
    timer: 3000,
    icon: 'success'
  })
} catch (error) {
  console.log(error)
}
    // return
   
  }

  
  useEffect(() => {
    if (fetchedData.data[fetchedData.data.length-1]) {
      setCummulativeWork(fetchedData.data[fetchedData.data.length-1].cummulativeWork);
      setLabourCount(fetchedData.data[fetchedData.data.length-1].labourCount);
      setReason(fetchedData.data[fetchedData.data.length-1].reason?fetchedData.data[fetchedData.data.length-1].reason:"")
    }
  }, [fetchedData]);

  const [editedWorkDoneToday, setEditedWorkDoneToday] = useState({});

  const handleEdit = (pipeIndex) => {
    setEditedWorkDoneToday({ ...editedWorkDoneToday, [pipeIndex]: true });
  };

  const handleSave = async (pipeIndex, pipe) => {
    // Perform your calculations and API calls here
    const updatedWorkDoneToday = parseInt(editedWorkDoneToday[pipeIndex], 10) || 0;
    const newCummulativeWork = cummulativeWork - pipe.workDoneToday + updatedWorkDoneToday;

    // Update the cumulative work in the state
    setCummulativeWork(newCummulativeWork);

    // Update the server data
    const updatedPipeData = [...fetchedData.data[fetchedData.data.length-1].pipeData];
    updatedPipeData[pipeIndex].workDoneToday = updatedWorkDoneToday;

    // Update the API with the new data
 

    setEditedWorkDoneToday({ ...editedWorkDoneToday, [pipeIndex]: false });
  };

  const handleInputChange = (pipeIndex, value) => {
    setEditedWorkDoneToday({
      ...editedWorkDoneToday,
      [pipeIndex]: value,
    });
  };


  return (
    <div className="container-fluid px-4 mt-5">
    <div className="mb-4" style={{ border: "5px solid black" }}>
        {/* Project Details */}
       
        <h6>Pipe Data</h6>
        <table className="table">
          <thead>
            <tr>
              <th>Pipe Type</th>
              <th>Work Done Till Date</th>
              <th>Work Done Today</th>
              <th>Work Done Edited</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData && 
            fetchedData.data.length>0 &&
            fetchedData.data[fetchedData.data.length-1].pipeData.map((pipe, pipeIndex) => (
              <tr key={pipeIndex}>
                <td>{pipe.pipeDia}</td>
                <td>{pipe.workDoneTillDate}</td>
                <td>{pipe.workDoneToday}</td>
                <td>
                  {editedWorkDoneToday[pipeIndex] ? (
                    <input
                      type="number"
                      value={editedWorkDoneToday[pipeIndex]}
                      onChange={(e) =>
                        handleInputChange(pipeIndex, e.target.value)
                      }
                    />
                  ) : (
                    pipe.workDoneToday
                  )}
                </td>
                <td>
                  {editedWorkDoneToday[pipeIndex] ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleSave(pipeIndex, pipe)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(pipeIndex)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* DPR Details */}
        <h6>DPR Details</h6>
        <table className="table">
          <tbody>
            <tr>
              <th>DPR Date:</th>
              <td>{fetchedData.data.length>0 && fetchedData.data[fetchedData.data.length-1].todaysDate}</td>
            </tr>
            <tr>
              <th>Labour Count:</th>
              <td>{ fetchedData.data.length>0 && fetchedData.data[fetchedData.data.length-1].labourCount}</td>
            </tr>
            <tr>
              <th> If Labour Count is Changed</th>
              <td> 
                <input value={labourCount} onChange={(e)=>setLabourCount(e.target.value)} className="form-control"/>
              </td>
            </tr>
            <tr>
              <th>Cummulative Work:</th>
              <td>{cummulativeWork}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>{fetchedData.data.length>0 && fetchedData.data[fetchedData.data.length-1].status}</td>
            </tr>
            <tr>
              <th>Remarks:</th>
              <td>{fetchedData.data.length>0 && fetchedData.data[fetchedData.data.length-1].remarks}</td>
            </tr>
            <tr>
              <th>Dpm Remarks:</th>
              <td>{fetchedData.data.length>0 && fetchedData.data[fetchedData.data.length-1].dpmRemarks}</td>
            </tr>
            <tr>
              <th>Reason For Less Labour Count:</th>
              
              {labourCount == 0 
              &&
              <td> <input required value={reason} onChange={(e)=>setReason(e.target.value)} className="form-control"/></td>
              }
            </tr>

            {fetchedData.data.length>0 && fetchedData.data[fetchedData.data.length-1].status === 'Approved' && (
              <>
                <tr>
                  <th>Status Approved:</th>
                  <td>{fetchedData.data[fetchedData.data.length-1].status}</td>
                </tr>
                <tr>
                  <th>Approved By:</th>
                  <td>{fetchedData.data[fetchedData.data.length-1].approvedBy}</td>
                </tr>
                <tr>
                  <th>Approved On:</th>
                  <td>{fetchedData.data[fetchedData.data.length-1].approvedOn}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>

{fetchedData.data.length>0 &&
  fetchedData.data[fetchedData.data.length-1].status !== 'Approved'

  &&

          <>
        <label>
          Dpm Remarks
        </label>
        <input value={dpmRemarks} onChange={(e)=>setDpmRemarks(e.target.value)}  className="form-control"/>

        <button className='btn btn-primary' onClick={() => handlePipeEditRequest(fetchedData.data[fetchedData.data.length-1]._id)}>Approve</button>
  </>

}
      </div>
      
    </div>
  );
}
