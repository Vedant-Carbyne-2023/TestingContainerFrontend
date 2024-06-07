import React, { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Table from '@editorjs/table';
import {userId, role} from '../../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';


const MRPOEditableTable = (props) => {

  const [tableData, setTableData] = useState([
    { sNo: 1,   materialDescription: '', uom: '', quantity_in_po: '',   quantity_recieved: '', quantity_balance:'',remark:'' },
  ]);
  const [show, setShow] = useState(false)

  const handleAddRow = () => {
    const newRow = {
      sNo: tableData.length + 1,
      materialDescription: '', uom: '', quantity_in_po: '',   quantity_recieved: '',  quantity_balance: '', remark:''
    };

    setTableData([...tableData, newRow]);
  };

  const handleCellChange = (event, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = event.target.value;
    setTableData(newData);
  };



  useEffect(() => {
    new EditorJS({
      holder: 'editorjs',
      tools: {
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 1, // Set the initial number of rows
            cols: 3, // Set the initial number of columns
            enableAddColumn: false, // Disable adding columns
            addRowButton: false, // Disable adding columns
          },
        },
      },
      data: {},
      minHeight: 0,
    });
  }, []);

  return (
    <div className="container p-0">
      <div id="editorjs" >
        <table className="table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Material Description</th>
              <th>UOM</th>
              <th>Quantity In PO</th>
              <th>Quantity Received</th>
              <th>Quantity Balance</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.sNo}</td>
                <td>
                <input 
                   type="text"
                   className="form-control"
                   value={row.materialDescription}
                   onChange={(e) =>
                     handleCellChange(e, index, 'materialDescription')}
                  />
                </td>
                <td>
               
                  <input 
                   type="text"
                   className="form-control"
                   value={row.uom}
                   onChange={(e) =>
                     handleCellChange(e, index, 'uom')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                     min={1}
                    className="form-control"
                    value={row.quantity_in_po}
                    onChange={(e) => handleCellChange(e, index, 'quantity_requested')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.quantity_recieved}
                    onChange={(e) => handleCellChange(e, index, 'quantity_issued')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.quantity_balance}
                    onChange={(e) => handleCellChange(e, index, 'quantity_balance')}
                  />
                </td>
               
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.remark}
                    onChange={(e) => handleCellChange(e, index, 'remark')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <button type="button" className="btn btn-primary" onClick={handleAddRow}>
            Add Row
          </button>
     
          {/* <button type="button" className="btn btn-success" onClick={handleCollectData}>
           Submit Data
          </button> */}
        </div>
      </div>

      
    </div>
  );
};

export default MRPOEditableTable;
