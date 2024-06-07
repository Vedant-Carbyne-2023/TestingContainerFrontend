import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { api } from '../../functions/axiosDefault';
import { errorHandler } from '../../functions/errorHandle';
import { Table } from 'react-bootstrap';
import moment from 'moment';

export default function Hydrotest({ projectName, gpName}) {

  const [vendorName, setVendorName] = useState('')
  const [oldHydrotestDprs, setOldHydrotestDprs] = useState([])

  useEffect(() => {
    const getData = async () => {
      let result = api.post(
        `/getHydrotestDpr`,
        {projectName:projectName, gpName:gpName}
      );
      result = await errorHandler(result);
      console.log(result)
      setVendorName(result.data.data.vendorName)     
      setOldHydrotestDprs(result.data.data.hydrotestDpr)
    };
    if(projectName, gpName)
    {getData()}
    
  
  }, [projectName, gpName]);



  console.log(oldHydrotestDprs)

    const [formData, setFormData] = useState("");
  
    
    const handleChange = (e, fieldType) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };

    
        setFormData(updatedFormData);
      };

      
      // useEffect(() => {
      //   if (latestDpr) {
         
      //     setFormData({...formData,
      //     ['cummulativeWork']:latestDpr.cummulativeWork
      //     })
      //   }
      // }, [latestDpr]);
      
// console.log(tableData)

   
      
  const handleSubmit = async (e) => {
    e.preventDefault()
    // if(!formData.workDone) return alert('Work Done Not Provided')

    // let total =  await calculateTotalWorkDoneToday()
    // console.log(total)
    console.log(projectName,gpName,formData.hydrotestDate, formData.labourCount,formData.reason, formData.remarks, formData.workDone, formData.cummulativeWork)

    // return

    if(!formData.labourCount) return alert('Labour Count Not Provided')
    let result = api.post("/hydrotestDailyDpr", {projectName,gpName,labourCount:formData.labourCount,reason:formData.reason, remarks:formData.remarks, workDone:formData.workDone, hydrotestDate:formData.hydrotestDate});
    result = await errorHandler(result);
    console.log(result);
    Swal.fire({
      title: result.data.message,
      timer: 5000,
      icon: "success",
    });
  };


  const options = [
    'PCC',
    'Brick Work Up to DPC',
    'Brick Work Up to Lintel Level',
    'Roof Slab',
    'Plaster Work',
    'Flooring',
    'Door Window Installation',
    'Plinth Protection',
    'Fixing of Grider & Chain Pulley',
    'Pump Installation',
    'Water Sample Testing',
  ];

  return (
    <form onSubmit={handleSubmit}>
    <div className="container mt-2">
    <div className="row d-flex justify-content-around">
      <div className="col-md-4">
        <label htmlFor="vendorName">
          Vendor Name
        </label>
        <input
          className="form-control"
          id="vendorName"
          disabled
          name="vendorName"
          value={vendorName}
        />
      </div>
  
      {/* <div className="col-md-4">
        <label htmlFor="scopeOfWork">
          Scope Of Work
        </label>
        <input
          className="form-control"
          id="scopeOfWork"
          disabled
          name="scopeOfWork"
          value={scopeOfWork}
        //   onChange={(e) => handleChange("e, "scopeOfWork")}
        />
      </div> */}
      
 <Table striped bordered hover>
    <thead>
      <tr>
        <th> Date</th>
        <th>Work Done On That Day</th>
        <th>Labour Count On That Day</th>
        <th>If Labout Count Zero</th>
        <th>Remarks</th>
      </tr>
    </thead>
    <tbody>
      {oldHydrotestDprs.length>0 &&
       oldHydrotestDprs.map((dpr, index) => (
        <tr key={index}>
          <td>{moment(dpr.dprDetails.hydrotestDate?dpr.dprDetails.hydrotestDate:dpr.dprDetails.todaysDate).format('DD/MM/YYYY')}</td>
          <td>{dpr.dprDetails.workDone}</td>
          <td>{dpr.dprDetails.labourCount}</td>
          <td>{dpr.dprDetails.reason}</td>
          <td>{dpr.dprDetails.remarks}</td>
        </tr>
      ))}
    </tbody>
  </Table>


      <div className="col-md-4">
            <label htmlFor="hydrotestDate">Date Of Work</label>
        <input
        name='hydrotestDate'
        type='date'
        required
        className='form-control'  
        value={formData.hydrotestDate}
              onChange={(e) => handleChange(e, "hydrotestDate")}
        />
          </div>
      <div className="col-md-4">
            <label htmlFor="workDone">Work Done</label>
      <select
          className="form-select"
        id="workDone"
        required
        name="workDone"
        onChange={(e)=>handleChange(e, "workDone")}
        value={formData.workDone}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
          </div>

  
      {/* <div className="col-md-4">
        <label htmlFor="cummulativeWork" >
          Cummulative Work
        </label>
        <input
          className="form-control"
          disabled
          type="tel"
          id="cummulativeWork"
          name="cummulativeWork"
          value={
            Number(formData.cummulativeWork || 0) +
            Number(formData.workDone || 0)
          }
          onChange={(e) => handleChange(e, "cummulativeWork")}
        />
      </div> */}
    </div>
  
    <div className="row mt-5" style={{ display: "flex", justifyContent: "space-around", flexWrap: 'wrap', flexDirection: 'row' }}>
        
  
      <div className="row" style={{ display: 'flex', justifyContent: "space-around" }}>
        <div className="col-md-6">
          <div className="row">
            <label htmlFor="labourCount">Labour Count</label>
            <input
              className="form-control"
              id="labourCount"
              required
              type="tel"
              name="labourCount"
              value={formData.labourCount}
              onChange={(e) => handleChange(e, "labourCount")}
            />
          </div>
          {formData.labourCount == 0 && (
            <div className="row">
              <label htmlFor="reason" className="form-label">
                Reason For Labour Count be Zero
              </label>
              <input
                className="form-control"
                id="reason"
                name="reason"
                required={formData.labourCount == 0}
                value={formData.reason}
                onChange={(e) => handleChange(e, "reason")}
              />
            </div>
          )}
        </div>
  
        <div className="col-md-6">
          <label htmlFor="remarks">Remarks</label>
          <input
            className="form-control"
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={(e) => handleChange(e, "remarks")}
          />
        </div>
      </div>
    </div>
  
    <button className="btn btn-primary mt-3" type='submit'>
      Submit
    </button>
  </div>
  </form>
   
);
}