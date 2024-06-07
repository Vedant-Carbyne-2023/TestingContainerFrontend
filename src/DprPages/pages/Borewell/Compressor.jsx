import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import moment from 'moment';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import MyToggleComponent from './ActiveToggle';
import { api } from '../../functions/axiosDefault';
import { errorHandler } from '../../functions/errorHandle';
import Swal from 'sweetalert2';
import TimePicker from 'react-time-picker';
import DateTimePicker from 'react-datetime-picker';
import Clock from '../../functions/Clock';
import styles from '../../../AdminPages/TableModule/TableSticky.module.css';

const Compressor = forwardRef(({  latestDpr,
    compressorVendorName}, ref) =>
    {
  const [formData, setFormData] = useState({
    compressorDate: '',
    startTime: '',
    endTime: '',
  });

  const [isEndCompressorDate, setIsEndCompressorDate] = useState(false);
  const [activeCompressor, setActiveCompressor] = useState(false);
  const [nonActiveReason, setNonActiveReason] = useState('');
  const [compressorDates, setCompressorDates] = useState([]);
  const [ifLastCompressorDate, setIfLastCompressorDate] = useState(false);
  const [timeGap, setTimeGaps] = useState([]);

  useEffect(() => {
    if (latestDpr && latestDpr.compressorDates) {
      setCompressorDates(latestDpr.compressorDates);
      setIfLastCompressorDate(
        latestDpr.compressorDates.slice(-1)[0]?.typeOfDate === 'End Date'
      );
    }
  }, [latestDpr]);

 

  const handleChange = (e, fieldType) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleAddTimeGap = () => {
    const { compressorDate, startTime, endTime } = formData;
  
    if (compressorDate && startTime && endTime) {
      const startDateTime = moment(`${compressorDate} ${startTime}`, 'YYYY-MM-DD h:mm a').utcOffset(0);
      const endDateTime = moment(`${compressorDate} ${endTime}`, 'YYYY-MM-DD h:mm a').utcOffset(0);
  
      if (startDateTime.isValid() && endDateTime.isValid() && endDateTime.isAfter(startDateTime)) {
        const formattedStartTime = startDateTime.format('YYYY-MM-DD h:mm a');
        const formattedEndTime = endDateTime.format('YYYY-MM-DD h:mm a');
  
        setTimeGaps((prevTimeGaps) => [
          ...prevTimeGaps,
          {
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          },
        ]);
  
        setFormData((prevData) => ({ ...prevData, startTime: '', endTime: '' }));
      } else {
        // Handle invalid date/time input
        Swal.fire({
          title: 'Invalid Date/Time Input',
          text: 'Please make sure the start time is before the end time and both are valid.',
          icon: 'error',
        });
      }
    } else {
      // Handle missing date/time input
      Swal.fire({
        title: 'Missing Date/Time Input',
        text: 'Please enter both start time and end time.',
        icon: 'error',
      });
    }
  };
  

  const [selectedTime, setSelectedTime] = useState('12:00 AM');

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(formData,"compressor")

  const handleRemoveTimeGap = (index) => {
    setTimeGaps((prevTimeGaps) => prevTimeGaps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.compressorDate) {
      // Display an error message or handle the validation error
      Swal.fire({
        icon: 'error',
        title: 'Compressor Date',
        text: 'Compressor Date is required',
      });
      return "cancel"; // Form is not valid
    }
    console.log("HEre Compressor")

    const startDate = compressorDates.length === 0;

    const newDate = {
      workingDate: formData.compressorDate,
      typeOfDate: startDate
        ? 'Start Date'
        : isEndCompressorDate
        ? 'End Date'
        : 'Regular Date',
      status: activeCompressor ? 'Active' : isEndCompressorDate
      ? 'Compressor Was Ended': 'Non Active',
      reason: activeCompressor ? '' : nonActiveReason,
      timeGap: activeCompressor ? timeGap : [],
    };

    let allDates = compressorDates;
    allDates.push(newDate);

    console.log(allDates)
    // return

    setFormData({ compressorDate: '', startTime: '', endTime: '' });
    setActiveCompressor(false);
    setNonActiveReason('');
    setIsEndCompressorDate(false);
    setTimeGaps([]);

    
    return allDates
    
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));
  console.log(isEndCompressorDate)

  return (
    <form onSubmit={handleSubmit}>
    <Container className="mt-3">
      <Row className="d-flex justify-content-around align-items-center">
        <h4>Compressor</h4>
        <Col md={3}>
          <Form.Label  htmlFor="compressorVendorName">
            Compressor Vendor Name
          </Form.Label>
          <Form.Control
            id="compressorVendorName"
            disabled
            value={compressorVendorName}
          />
        </Col>
      </Row>
      <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>

      {compressorDates.length > 0 && (
      <Table striped bordered hover className="mt-3" style={{ border: "1px solid #000" , marginTop: "30px"}}>
      <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
        <tr>
          <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Type Of Date</th>
          <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Date</th>
          <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Status On That Date</th>
          <th colSpan={3} style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Time Gap</th>
          <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Reason For Non Active</th>
        </tr>
        <tr>
          <th colSpan={1} style={{ border: "1px solid #000", padding: "8px" }}></th>
          <th colSpan={1} style={{ border: "1px solid #000", padding: "8px" }}></th>
          <th colSpan={1} style={{ border: "1px solid #000", padding: "8px" }}></th>
          <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Start Time</th>
          <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>End Time</th>
          <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Total Time</th>
          <th colSpan={1} style={{ border: "1px solid #000", padding: "8px" }}></th>
        </tr>
      </thead>
      <tbody>
        {compressorDates.map((compressorDate, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #000", padding: "8px" }}>{compressorDate.typeOfDate}</td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>{moment(compressorDate.workingDate).format('DD/MM/YYYY')}</td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>{compressorDate.status}</td>
            <td colSpan={1} style={{ border: "1px solid #000", padding: "8px" }}>
              {compressorDate.timeGap.map((dates, idx) => (
                <div key={idx}>
                  <p>{moment(dates.startTime).format('h:mm a')}</p>
                </div>
              ))}
            </td>
            <td colSpan={1} style={{ border: "1px solid #000", padding: "8px" }}>
              {compressorDate.timeGap.map((dates, idx) => (
                <div key={idx}>
                  <p>{moment(dates.endTime).format('h:mm a')}</p>
                </div>
              ))}
            </td>
            <td colSpan={1} style={{ border: "1px solid #000", padding: "8px" }}>
  {Number(
    (
      compressorDate.timeGap.reduce(
        (total, dates) =>
          total + new Date(dates.endTime).getTime() - new Date(dates.startTime).getTime(),
        0
      ) /
      (1000 * 60 * 60)
    ).toFixed(2)
  )}{' '}
  hours
</td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              {compressorDate.status === 'Non Active'
                ? compressorDate.reason
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    

     
      )}
      </div>

      {ifLastCompressorDate && <p>Compressor Was Ended</p>}

      {!ifLastCompressorDate && compressorDates.length > 0 && (
        <>
          <Row className="mt-3">
          <Col md={3}>
  <Form.Label title="Press Button If This Is Last Day Of Compressing" >
    If End Of Compressor Press The Radio Button
  </Form.Label>
  <Form.Check
    type="radio"
    label="Compressor End Date"
    id="compressorEndDateRadio"
    checked={isEndCompressorDate}
    onClick={() => setIsEndCompressorDate(!isEndCompressorDate)}
  />
</Col>

            <Col md={3}>
              <Form.Label title="Select Date Of Compressor" htmlFor="compressorDate">Compressor Date</Form.Label>
              <Form.Control
                id="compressorDate"
                required
                type="date"
                disabled={ifLastCompressorDate}
                name="compressorDate"
                value={formData.compressorDate}
                onChange={(e) => handleChange(e, 'compressorDate')}
              />
            </Col>

            <Col md={3}>
              <MyToggleComponent
                setChecked={(check) => setActiveCompressor(check)}
                setReason={(reason) => setNonActiveReason(reason)}
              />
            </Col>
          </Row>

          
        </>
      )}


      {compressorDates.length < 1 && (
        <Row className="mt-3">
          <Col md={3}>
            <Form.Label htmlFor="compressorDate" title="Select Start Date Of Compressor">Compressor Start Date</Form.Label>
            <Form.Control
              id="compressorDate"
              type="date"
              required
              name="compressorDate"
              value={formData.compressorDate}
              onChange={(e) => handleChange(e, 'compressorDate')}
            />
          </Col>
          <Col md={3}>
            <MyToggleComponent
              setChecked={(check) => setActiveCompressor(check)}
              setReason={(reason) => setNonActiveReason(reason)}
            />
          </Col>
        </Row>
      )}

{activeCompressor && (
  <Row className="mt-3">
    <Col md={5}>
   
      <Form.Label title="Select Start Time Of Compressing" >Start Time</Form.Label>
      <div className="d-flex">
       <Clock setTimePeriod={(time) =>setFormData({...formData, startTime:time})}/>
      </div>
    </Col>
    <Col md={5}>
      <Form.Label title="Select End Time Of Compressing">End Time</Form.Label>
      <div className="d-flex">
      <Clock setTimePeriod={(time) =>setFormData({...formData, endTime:time})}/>
      </div>
    </Col>
    <Col md={2} className="d-flex align-items-end">
      <Button variant="primary" onClick={handleAddTimeGap} title="Add Time Gap Of Work In Compressor">
        Add Time Gap
      </Button>
    </Col>
  </Row>
)}
  
          {timeGap.length > 0 && (
            <Row className="mt-3">
              <Col md={6}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Total Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  
       
                    { timeGap.length > 0 && timeGap.map((gap, index) => (
                      <tr key={index}>
                         <td>{moment(new Date(gap.startTime)).add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DD h:mm a')}</td>
<td>{moment(new Date(gap.endTime)).add(5, 'hours').add(30, 'minutes').format('YYYY-MM-DD h:mm a')}</td>

<td>
  {gap.startTime && gap.endTime ? (
    (
      (new Date(gap.endTime).getTime() - new Date(gap.startTime).getTime()) /
      (1000 * 60 * 60)
    ).toFixed(2) + ' hrs'
  ) : (
    'Invalid date values'
  )}
</td>

                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveTimeGap(index)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
            </Table>
          </Col>
        </Row>
      )}
                 
                
    
    </Container>
    </form>
  );
})
export default Compressor