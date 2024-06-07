import React, { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Table from '@editorjs/table';
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import styles from '../../MaterialRequisition/MaterialRequisition/EditableTable/EditableTable.module.css';

const MaterialReceiptNoteEditableTable = (props) => {
// console.log(props)
  
  const [tableData, setTableData] = useState([
    { sNo: 1,  materialName: '', materialDescription: '', uom: '', quantity: '', balance_quantity:"",   quantity_received: '', remark:'' },
  ]);

  useEffect(() => {
    setTableData(props.tableData)
  }, [props])
  
  const [show, setShow] = useState(false)

  const handleAddRow = () => {
    const newRow = {
      sNo: tableData.length + 1,
      materialDescription: '',
      uom: '',
      balance_quantity:"",
      quantity: '',
      quantity_received: '',
      remark: '',
    };

    setTableData([...tableData, newRow]);
  };

  const handleCellChange = (event, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = event.target.value;
    setTableData(newData);
  };

  const handleCollectData = () => {
    setShow(true)
    props.tableData(tableData)
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
      <div className={styles["table-wrapper"]}>
      <table className={`table ${styles.table_editable}`}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Material Category</th>
              <th>Material Subcategory</th>
              <th>Material Description</th>
              <th>UOM</th>
              <th>Quantity in Purchase Order</th>
              <th>Quantity Recieved</th>
              <th>Balance Quantity</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                <input 
                   type="text"
                   className="form-control"
                   value={row.materialCategory}
                       disabled
                   onChange={(e) =>
                     handleCellChange(e, index, 'materialCategory')}
                  />
                </td>
                <td>
                <input 
                   type="text"
                   className="form-control"
                   value={row.materialSubCategory}
                   disabled
                   onChange={(e) =>
                     handleCellChange(e, index, 'materialSubCategory')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.materialDescription}
                    disabled
                    onChange={(e) =>
                      handleCellChange(e, index, 'materialDescription')
                    }
                  >
                  </input>
                  </td>
                  <td>
                  <input 
                   type="text"
                   className="form-control"
                   value={row.uom}
                   disabled
                   onChange={(e) =>
                     handleCellChange(e, index, 'uom')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                     min={1}
                     disabled
                    className="form-control"
                    value={row.quantity}
                    onChange={(e) => handleCellChange(e, index, 'quantity')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    required
                    disabled
                    min={1}
                    max={row.balance_quantity?row.balance_quantity:row.quantity}
                    value={row.quantity_received}
                    onChange={(e) => handleCellChange(e, index, 'quantity_received')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min={1}
                     disabled
                    className="form-control"
                    value={row.balance_quantity !== undefined && row.balance_quantity !== null || row.balance_quantity === 0
                      ? row.balance_quantity
                      : row.quantity}
                    onChange={(e) => handleCellChange(e, index, 'balance_quantity')}
                  />
                </td>
              
               
                <td>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={row.remark}
                    onChange={(e) => handleCellChange(e, index, 'remark')}
                  />
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {tableData.map((row, index) => 
      <>
         <div className={styles["row-wise-layout"]}>
          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            S.No.
            <input
              type="number"
              className="form-control"
              value={index+1}
            />
         </div>
         <div className={`${styles["column-name"]} col-12 col-md-3`}>
            <label htmlFor="materialCategory">Material Category:</label>
            <input 
                   type="text"
                   disabled
                   className="form-control"
                   value={row.materialCategory}
                   onChange={(e) =>
                     handleCellChange(e, index, 'materialCategory')}
                  />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-3`}>
            <label htmlFor="materialSubCategory">Material Sub Category:</label>
            <input 
                   type="text"
                   disabled
                   className="form-control"
                   value={row.materialSubCategory}
                   onChange={(e) =>
                     handleCellChange(e, index, 'materialSubCategory')}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-4`}>
            <label htmlFor="materialDescription">Material Description:</label>
            <input 
                   type="text"
                   disabled
                   className="form-control"
                   value={row.materialDescription}
                   onChange={(e) =>
                     handleCellChange(e, index, 'materialDescription')}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="uom">UOM:</label>
            <input 
                   type="text"
                   disabled
                   className="form-control"
                   value={row.uom}
                   onChange={(e) =>
                     handleCellChange(e, index, 'uom')}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity">Quantity in Purchase Order:</label>
            <input
                    type="number"
                     min={1}
                     disabled
                    className="form-control"
                    value={row.quantity}
                    onChange={(e) => handleCellChange(e, index, 'quantity')}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="balance_quantity">Balance Quantity:</label>
            <input
                    type="number"
                     min={0}
                     disabled
                    className="form-control"
                    value={row.balance_quantity !== undefined && row.balance_quantity !== null || row.balance_quantity === 0
                      ? row.balance_quantity
                      : row.quantity}
                    onChange={(e) => handleCellChange(e, index, 'balance_quantity')}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity_received">Quantity Recieved:</label>
            <input
                    type="number"
                    className="form-control"
                    required
                    disabled
                    min={1}
                    max={row.balance_quantity?row.balance_quantity:row.quantity}
                    value={row.quantity_received}
                    onChange={(e) => handleCellChange(e, index, 'quantity_received')}
                  />
          </div>




          <div className={`${styles["column-name"]} col-12 col-md-2`}>
            <label htmlFor="remark">Remark:</label>
            <input
                    type="text"
                    disabled
                    className="form-control"
                    value={row.remark}
                    onChange={(e) => handleCellChange(e, index, 'remark')}
                  />
          </div>
          </div>
      </>
      )}

        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {/* <button type="button" className="btn btn-primary" onClick={handleAddRow}>
            Add Row
          </button> */}
     
          {/* <button type="button" className="btn btn-success" onClick={handleCollectData}>
           Submit Data
          </button> */}
        </div>
      </div>

      
    </div>
  );
};

export default MaterialReceiptNoteEditableTable;
