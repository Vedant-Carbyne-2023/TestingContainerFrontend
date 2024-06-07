import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import moment from 'moment';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import MyToggleComponent from './ActiveToggle';
import { api } from '../../functions/axiosDefault';
import { errorHandler } from '../../functions/errorHandle';
import Swal from 'sweetalert2';

const Drilling = forwardRef(({ latestDpr,

  drillingVendorName,selectedDates
}, ref) => {


  const [formData, setFormData] = useState({
    drillingDate: '',
    drillingDepth: '',
  });

  const [isEndDrillingDate, setIsEndDrillingDate] = useState(false);
  const [activeDrilling, setActiveDrilling] = useState(false);
  const [nonActiveReason, setNonActiveReason] = useState('');
  const [drillingDates, setDrillingDates] = useState([]);
  const [ifLastDrillingDate, setIfLastDrillingDate] = useState(false);

  // useEffect(() => {

  // },[selectedDates]);
 
  useEffect(() => {
    console.log("dpr",latestDpr?"true":"false");

    if (latestDpr && latestDpr.drillingDates) {

      setDrillingDates(latestDpr.drillingDates);
      setIfLastDrillingDate(latestDpr.drillingDates.slice(-1)[0]?.typeOfDate === 'End Date');
    }
    else{
      setDrillingDates([]);
    }
  }, [latestDpr]);

  const handleChange = (e, fieldType) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.drillingDate) {
      // Display an error message or handle the validation error
      Swal.fire({
        icon: 'error',
        title: 'Drilling Date',
        text: 'Drilling Date is required',
      });
      return "cancel"; // Form is not valid
    }
    console.log("here")
    const startDate = drillingDates.length === 0;

    const newDate = {
      workingDate: formData.drillingDate,
      drillingDepth:formData.drillingDepth,
      typeOfDate: startDate ? 'Start Date' : isEndDrillingDate ? 'End Date' : 'Regular Date',
      status: activeDrilling ? 'Active' : isEndDrillingDate
      ? 'Drilling Was Ended': 'Non Active',
      reason: activeDrilling ? '' : nonActiveReason,
    };

    let allDates = drillingDates
    allDates.push(newDate)
    console.log(allDates, "vedant")
    // Additional logic for submitting to the server
    // ...
    setFormData({ drillingDate: '', drillingDepth:'' });
    setActiveDrilling(false);
    setNonActiveReason('');
    setIsEndDrillingDate(false);
    return allDates


  };

  console.log(formData, "drilling")
  useImperativeHandle(ref, () => ({
    handleSubmit
  }));
  return (
    <form onSubmit={(e)=>handleSubmit(e)} >
      <Container className="mt-3">
        <Row className="d-flex justify-content-around" style={{ alignItems: 'center' }}>
          <h4 className="p-0">Drilling</h4>
          
          <Col md={3}>
            <Form.Label htmlFor="drillingVendorName">Drilling Vendor Name</Form.Label>
            <Form.Control id="drillingVendorName" disabled value={drillingVendorName} />
          </Col>

          {drillingDates.length > 0 && (
           <Table striped bordered hover style={{ border: "1px solid #000" , marginTop: "30px"}}>
           <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
             <tr>
               <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)" }}>Type Of Date</th>
               <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)" }}>Date</th>
               <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)" }}>Drilling Depth</th>
               <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)" }}>Status On That Date</th>
               <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)" }}>Reason For Non Active</th>
             </tr>
           </thead>
           <tbody>
             {drillingDates.map((drillingDate, index) => (
               <tr key={index}>
                 <td style={{ border: "1px solid #000", padding: "8px" }}>{drillingDate.typeOfDate}</td>
                 <td style={{ border: "1px solid #000", padding: "8px" }}>{moment(drillingDate.workingDate).format('DD/MM/YYYY')}</td>
                 <td style={{ border: "1px solid #000", padding: "8px" }}>{drillingDate.drillingDepth}</td>
                 <td style={{ border: "1px solid #000", padding: "8px" }}>{drillingDate.status}</td>
                 <td style={{ border: "1px solid #000", padding: "8px" }}>{drillingDate.status === 'Non Active' ? drillingDate.reason : '-'}</td>
               </tr>
             ))}
           </tbody>
         </Table>
         
          )}

          {ifLastDrillingDate && <p>Drilling Was Ended</p>}

          {!ifLastDrillingDate && drillingDates.length > 0 && (
            <>
              <div>
              <Form.Label htmlFor="drillingDepth"  title='Enter Depth Of Drilling'>Drilling Depth</Form.Label>
                <Form.Control
                  id="drillingDepth"
                 
                  type="tel"
                  // disabled={ifLastDrillingDate}
                  required
                  name="drillingDepth"
                  value={formData.drillingDepth}
                  onChange={(e) => handleChange(e, 'drillingDepth')}
                />


              <Form.Label>If End Of Drilling Press The End Button </Form.Label>
<Form.Check
  type="radio"
  label="Drilling End Date"
  id="drillingEndDateRadio"
  
  checked={isEndDrillingDate}
  onClick={() => setIsEndDrillingDate(!isEndDrillingDate)}
/>
              </div>

              <Col md={3}>
                <Form.Label htmlFor="drillingDate"  title='Select Date Of Drilling'>Drilling Date</Form.Label>
                <Form.Control
                  id="drillingDate"
                 
                  type="date"
                  disabled={ifLastDrillingDate}
                  required
                  name="drillingDate"
                  value={formData.drillingDate}
                  onChange={(e) => handleChange(e, 'drillingDate')}
                />
              </Col>
             
              <Col md={3}>
                <MyToggleComponent
                  setChecked={(check) => setActiveDrilling(check)}
                  setReason={(reason) => setNonActiveReason(reason)}
                />
              </Col>
            </>
          )}

          {drillingDates.length < 1 && (
            <Col md={3}>
              <Form.Label htmlFor="drillingDate">Drilling Start Date</Form.Label>
              <Form.Control
                id="drillingDate"
                type="date"
                required
                name="drillingDate"
                value={formData.drillingDate}
                onChange={(e) => handleChange(e, 'drillingDate')}
              />
              
              <Form.Label htmlFor="drillingDepth"  title='Enter Depth Of Drilling'>Drilling Depth</Form.Label>
                <Form.Control
                  id="drillingDepth"
                 
                  type="tel"
                  // disabled={ifLastDrillingDate}
                  required
                  name="drillingDepth"
                  value={formData.drillingDepth}
                  onChange={(e) => handleChange(e, 'drillingDepth')}
                />

              <MyToggleComponent
                setChecked={(check) => setActiveDrilling(check)}
                setReason={(reason) => setNonActiveReason(reason)}
              />
            </Col>
          )}
        </Row>


      </Container>
    </form>
  );
})
export default Drilling;