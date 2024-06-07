import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { api } from '../../functions/axiosDefault';
import { errorHandler } from '../../functions/errorHandle';
import Swal from 'sweetalert2';

export default function BoundaryWallApproveDpr  ({ fetchedData, projectName }) {

  const handleBoundaryWallApproveRequest = async (item) => {
    let result = await api.post('/approveDailyBoundaryWallDpr', { boundaryWallDprId: item, approvedBy: "Vedant As Dpr", status: "Approved" });
    result = await errorHandler(result);
    Swal.fire({
      title: result.data.message,
      timer: 3000,
      icon: 'success'
    });
  };
  


  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState('')

  const [modalData, setModalData] = useState('')

  const handleModal = (id)=>{
    setModalData(id)
    setOpenModal(true)
  }
  
  const handleChange = (e, fieldType) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
  setFormData(updatedFormData)
  };

  const handleBoundaryWallEditRequest = async () => {
    if(!formData.workDone){
      alert("please enter work Done")
      return;
    }

    // let result = await api.post('/approveDailyBoundaryWallDpr', { boundaryWallDprId: modalData, approvedBy: "Vedant As Dpr", status: "Approved" });
    // result = await errorHandler(result);

    let result = await api.post(`/editboundaryWallDailyDpr/${modalData}`, 
    { 
      gpName:fetchedData.data[0].gpName,
      typeOfUser:"Dpm",
      projectName:projectName,
      staffName:"Vedant Dpm",
      boundaryWallDate:new Date(fetchedData.data[0].boundaryWallDate),
      workDone:formData.workDone,
      workDoneRemarks:formData.workDoneRemarks,
      labourCount:formData.editLabourCount?formData.editLabourCount:fetchedData.data[0].labourCount,
      remarks:formData.dpmRemarks,
      editedBy:"Vedant Joshi",
      editedOn:new Date(),
      editedFields:[
        {
        fieldName:"workDone",
        originalValue:fetchedData.data[0].workDone,
      newValue:formData.workDone        
    },
        {
        fieldName:"labourCount",
        originalValue:fetchedData.data[0].labourCount,
      newValue:formData.editLabourCount      
    },
  
  ]
     });
    result = await errorHandler(result);
    Swal.fire({
      title: result.data.message,
      timer: 3000,
      icon: 'success'
    });
  };

  
  let options = [
    { name: "Layout", disabled: true },
    { name: "Excavation", disabled: true },
    { name: "PCC", disabled: true },
    { name: "Brickwork Substructure", disabled: true },
    { name: "Brickwork Superstructure", disabled: true },
    { name: "Plaster work", disabled: true },
    { name: "Painting Work", disabled: true },
  ];


  return (
    <div className="col-md-12 mt-4">
      <h5>Fetched Data: </h5>
      {fetchedData && fetchedData.data && (
        <table className="table">
          <thead>
            <tr>
              <th>GP Name</th>
              <th>BoundaryWall Date</th>
              <th>Type Of User</th>
              <th>Work Done</th>
              <th>Labour Count</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.data.map((item) => (
              <tr key={item._id}>
                <td>{item.gpName}</td>
                <td>{item.boundaryWallDate}</td>
                <td>{item.typeOfUser?item.typeOfUser:"Employee"}</td>
                <td>{item.workDone}</td>
                <td>{item.labourCount}</td>
                <td>{item.remarks}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === 'Pending For Approval' && (
                    <div>
                    <button className="btn btn-primary" onClick={() => handleBoundaryWallApproveRequest(item._id)}>
                      Approve
                    </button>
                    <button className="btn btn-primary" onClick={() => handleModal(item._id)}>
                      Edit
                    </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
       
        
      </div>
      {openModal && (
        <Modal show={openModal} onHide={()=>setOpenModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title> Editing Done By Dpm On That Day </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{ display: 'flex', flexDirection:'column' }}>
          <div>
            <label>Old Work Done For The Date</label>
            <input className="form-control" disabled value={fetchedData.data[0].workDone} />
          </div>
          <div>
          <label htmlFor="workDone">Work Done</label>
          <div>
            <select
              className="form-select"
              id="workDone"
              required
              name="workDone"
              onChange={(e) => handleChange(e, "workDone")}
              value={formData.workDone}
            >
              <option value="">Select an option</option>
              {options.map((option, index) => (
                <option
                  key={index}
                  value={option.name}
                  // disabled={option.disabled}
                >
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Work Done Remarks</label>
            <input className="form-control"
              name='workDoneRemarks'
              onChange={(e)=>handleChange(e,'workDoneRemarks')}
            />
          </div>
          </div>
          
          <div>
            <label>Old Labour Count</label>
            <input className="form-control" 
            type='number'
             name='labourCount'
             disabled
             onChange={(e)=>handleChange(e,'labourCount')}
             value={fetchedData.data[0].labourCount}
            />
          </div>
          <div>
            <label>Editing Labour Count</label>
            <input className="form-control" 
            type='number'
             name='editLabourCount'
             onChange={(e)=>handleChange(e,'editLabourCount')}
             value={formData.editLabourCount}
            />
          </div>
          <div>
            <label>Old Remarks</label>
            <input className="form-control"
              name='oldRemarks'
              disabled
              value={fetchedData.data[0].workDoneRemarks}
              onChange={(e)=>handleChange(e,'oldRemarks')}
            />
          </div>
         
          <div>
            <label>Remarks</label>
            <input className="form-control"
              name='dpmRemarks'
              onChange={(e)=>handleChange(e,'dpmRemarks')}
            />
          </div>
        </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>handleBoundaryWallEditRequest()}>
              Click To Submit This Edit
            </Button>
            <Button variant="secondary" onClick={()=>setOpenModal(false)}>
              Close
            </Button>
        
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

