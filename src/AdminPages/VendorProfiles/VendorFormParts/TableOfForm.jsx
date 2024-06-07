import React, { useEffect, useState } from 'react';

export default function TableOfForm(props) {
  // State to manage the table data

  const [tableData, setTableData] = useState([
    {  customerName: '', projectValue: '', contactPerson: '', contactNumber: '', email: '' },
    // Add more rows if needed
  ]);

  // Function to handle changes in table data
  const handleInputChange = (index, field, value) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value;
    setTableData(updatedData);

    // Call the updateTableData prop to pass the updated data to the parent component
  };

  useEffect(() => {
 props.setTableData(tableData)
  }, [tableData])
  
  const addRow = () => {
    setTableData([...tableData, {  customerName: '', projectValue: '', contactPerson: '', contactNumber: '', email: '' }]);
  };
  return (
    <div className='mt-2'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sr. No</th>
            <th scope="col">Customer's Name</th>
            <th scope="col">Project Value</th>
            <th scope="col">Contact Person</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Email ID</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={index+1}
                  // onChange={(e) => handleInputChange(index, 'srNo', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.customerName}
                  onChange={(e) => handleInputChange(index, 'customerName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.projectValue}
                  onChange={(e) => handleInputChange(index, 'projectValue', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.contactPerson}
                  onChange={(e) => handleInputChange(index, 'contactPerson', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={row.contactNumber}
                  onChange={(e) => handleInputChange(index, 'contactNumber', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  className="form-control"
                  value={row.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mt-2" type='button' onClick={addRow}>
        Add Row
      </button>
    </div>
  );
}
