import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

const TimeInputComponent = () => {
  const [timeIntervals, setTimeIntervals] = useState([{ startTime: '', endTime: '' }]);
  const [cumulativeTotal, setCumulativeTotal] = useState(0);

  const handleInputChange = (index, key, value) => {
    const updatedIntervals = [...timeIntervals];
    updatedIntervals[index][key] = value;
    setTimeIntervals(updatedIntervals);
  };

  const handleAddRow = () => {
    setTimeIntervals([...timeIntervals, { startTime: '', endTime: '' }]);
  };

  const calculateCumulativeTotal = () => {
    let total = 0;
    timeIntervals.forEach((interval) => {
      const start = Date.parse(`01/01/1970 ${interval.startTime}`);
      const end = Date.parse(`01/01/1970 ${interval.endTime}`);
      if (!isNaN(start) && !isNaN(end)) {
        total += (end - start) / (60 * 60 * 1000); // Convert milliseconds to hours
      }
    });
    setCumulativeTotal(total);
  };

  return (
    <div className="container mt-4">
      <label>Enter Time Used</label>
      <Form>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {timeIntervals.map((interval, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="hh:mm AM/PM"
                    pattern="^(1[0-2]|0?[1-9]):([0-5]?[0-9])\s?(AM|PM|am|pm)?$"
                    value={interval.startTime}
                    onChange={(e) => handleInputChange(index, 'startTime', e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="hh:mm AM/PM"
                    pattern="^(1[0-2]|0?[1-9]):([0-5]?[0-9])\s?(AM|PM|am|pm)?$"
                    value={interval.endTime}
                    onChange={(e) => handleInputChange(index, 'endTime', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="primary" onClick={handleAddRow}>
          Add Row
        </Button>

        <Button variant="success" className="ml-3" onClick={calculateCumulativeTotal}>
          Calculate Cumulative Total
        </Button>

        {cumulativeTotal > 0 && (
          <p className="mt-3">Cumulative Total Time: {cumulativeTotal.toFixed(2)} hours</p>
        )}
      </Form>
    </div>
  );
};

export default TimeInputComponent;
