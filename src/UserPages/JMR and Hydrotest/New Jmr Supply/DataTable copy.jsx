import React, { useEffect, useState } from 'react';
import styles from './Data_Table.module.css'; // Import the CSS module
import Swal from 'sweetalert2';

const DataTable = ({table,setTableDataInForm, boqDetails}) => {
  const [boqData, setBoqData] = useState([])
  const [tableData, setTableData] = useState(
    table
      ? table.map((item) => (
        console.log("here5"),
        {
          
        ...item,
          
          boqDetails:{
            
            ...item.boqDetails,
            totalAmount:item.boqDetails.quantity*item.boqDetails.unitRate
          },
          quantities: {
            ...item.quantities,
            previous: item.quantities.cumulative,
            thisBill: 0,
            
            cumulative: item.quantities.thisBill + item.quantities.previous,
          },
          amount: {
            ...item.amount,
            previous: item.amount.cumulative,
            cumulative:
              item.quantities.thisBill * item.boqDetails.unitRate +
              item.amount.previous,
            thisBill: item.quantities.thisBill * item.boqDetails.unitRate,
          },
        }))
      : []
  );
  console.log("here3")

  
useEffect(() => {
  // If you need to update the tableData when the 'table' prop changes
  if (table) {
    setTableData(
      table.map((item) => ({
        ...item,
        quantities: {
          ...item.quantities,
          previous: item.quantities.cumulative,
          thisBill: 0,
          cumulative: item.quantities.thisBill + item.quantities.previous,
        },
        amount: {
          ...item.amount,
          previous: item.amount.cumulative,
          cumulative:
            item.quantities.thisBill * item.boqDetails.unitRate +
            item.amount.previous,
          thisBill: item.quantities.thisBill * item.boqDetails.unitRate,
        },
      }))
    );
  }
  if (boqDetails) {
    console.log(boqDetails)
    setTableData(
      table.map((item) => ({
        ...item,
        boqDetails:{
          ...item.boqDetails,
          description:boqDetails.description
        }
      }))
    );
  setBoqData(boqDetails) 
  }

}, [table, boqDetails]);
 

  const addRow = () => {
    const newRow = {
      itemNo: tableData.length + 1,
      description: '',
      boqDetails: {
        wtd: 0,
        description: '',
        uom: '',
        quantity: 0,
        unitRate: 0,
        totalAmount: 0,
      },
      quantities: {
        previous: 0,
        thisBill: 0,
        cumulative: 0,
      },
      amount: {
        previous: 0,
        thisBill: 0,
        cumulative: 0,
      },
      remarks: '',
    };

    setTableData((prevData) => [...prevData, newRow]);
  };

  const handleInputChange = (e, itemNo, property) => {
    const { value } = e.target;
  
    setTableData((prevData) =>
      prevData.map((item) => {
        if (item.itemNo === itemNo) {
          let updatedItem = { ...item };
  
          // Determine the nested property
          let nestedProperty;
          if (property.includes('boqDetails')) {
            nestedProperty = 'boqDetails';
          } else if (property.includes('quantities')) {
            nestedProperty = 'quantities';
          } else if (property.includes('amount')) {
            nestedProperty = 'amount';
          }
  
          // Update the nested property only if it matches
          if (nestedProperty) {
            updatedItem = {
              ...item,
              [nestedProperty]: {
                ...item[nestedProperty],
                [property.split('.')[1]]: value,
              },
            };
  
            // Calculate totalAmount if it's boqDetails.quantity or boqDetails.unitRate
            if (property === 'boqDetails.quantity' || property === 'boqDetails.unitRate') {
              updatedItem = {
                ...updatedItem,
                boqDetails: {
                  ...updatedItem.boqDetails,
                  totalAmount: updatedItem.boqDetails.quantity * updatedItem.boqDetails.unitRate,
                },
              };
            }
  
            // Calculate amount.thisBill if it's quantities.thisBill or boqDetails.unitRate
            if (property === 'quantities.thisBill' || property === 'boqDetails.unitRate') {
              // if (updatedItem.quantities.cumulative > updatedItem.boqDetails.quantity) {
              //   Swal.fire({
              //     title: "Quantity Cannot Be Greater Than BOQ's Quantity",
              //     icon: "warning",
              //   });
              //   // updatedItem.quantities.thisBill = updatedItem.boqDetails.quantity;
              // } else {
                updatedItem = {
                  ...updatedItem,
                  quantities: {
                    ...updatedItem.quantities,
                    cumulative:
                    (parseFloat(updatedItem.quantities.thisBill) + parseFloat(updatedItem.quantities.previous)) * 1,
                  },
                  amount: {
                    ...updatedItem.amount,
                    cumulative:
                    parseFloat(parseFloat(updatedItem.quantities.thisBill )* parseFloat(updatedItem.boqDetails.unitRate) +
                    parseFloat( updatedItem.amount.previous)),
                    thisBill: parseFloat(parseFloat(updatedItem.quantities.thisBill) * parseFloat(updatedItem.boqDetails.unitRate)),
                  },
                // };
              }
            }
          } else {
            // Update the main property if it's not a nested property
            updatedItem = {
              ...item,
              [property]: value,
            };
          }
  
          return updatedItem;
        }
  
        return item;
      })
    );
  };

  console.log(table, tableData)
  // useEffect(() => {
  //   if (table && tableData) {
  //     setTableDataInForm(tableData);
  //   }
  // }, [tableData]);


  return (
    <div className="container mt-5 mb-4">
      <h2 className="text-center mb-4">Data Table</h2>

      <button onClick={addRow}>Add Row</button>
      <div className="col-md-12" style={{overflow:'scroll', width:'100%'}}>

      <table className={styles.table}>
        <thead>
          <tr>
            <th> Boq Item No.</th>
            <th>Description</th>
            <th colSpan="5">Boq Details</th>
            <th colSpan="3">Quantities</th>
            <th colSpan="3">Amount</th>
            <th rowSpan="2">Remarks</th>
          </tr>
          <tr>
            <th colSpan="2">Main Abstract</th>
            <th>WTD%</th>
            <th>UOM</th>
            <th>Quantity</th>
            <th>Unit Rate</th>
            <th>Total Amount</th>
            <th>Previous</th>
            <th>This Bill</th>
            <th>Cummulative</th>
            <th>Previous</th>
            <th>This Bill</th>
            <th>Cummulative</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.itemNo}>
              <td>{item.itemNo}</td>
              <td>
                <input
                  type="text"
                  className='form-control'
                  value={item.description}
                  onChange={(e) => handleInputChange(e, item.itemNo, 'description')}
                />
              </td>
              <td>
                <input
                  type="number"
                  className='form-control'
                  value={item.boqDetails.wtd}
                  onChange={(e) => handleInputChange(e, item.itemNo, 'boqDetails.wtd')}
                />
              </td>
              {/* Add more input fields for other properties */}
              <td>
                <input
                  type="text"
                  value={item.boqDetails.uom}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'boqDetails.uom')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.boqDetails.quantity}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'boqDetails.quantity')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.boqDetails.unitRate}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'boqDetails.unitRate')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.boqDetails.totalAmount}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'boqDetails.totalAmount')}
                />
              </td>
              <td>
                <input
                  type="number"
                  disabled
                  value={item.quantities.previous}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'quantities.previous')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantities.thisBill}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'quantities.thisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantities.cumulative}
                  disabled
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'quantities.cumulative')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.amount.previous}
                  className='form-control'
                  disabled
                  onChange={(e) => handleInputChange(e, item.itemNo, 'amount.previous')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.amount.thisBill}
                  className='form-control'
                  disabled
                  onChange={(e) => handleInputChange(e, item.itemNo, 'amount.thisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  disabled
                  value={item.amount.cumulative}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'amount.cumulative')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.remarks}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'remarks')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default DataTable;
