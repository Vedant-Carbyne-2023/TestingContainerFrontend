import React, { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Table from '@editorjs/table';
import styles from '../../../MaterialRequisition/MaterialRequisition/EditableTable/EditableTable.module.css'

const MaterialIssueFormShowEditableTable = ({setTable, data}) => {

// console.log("Data",data)
  const initialTableData = data
  ? data.map((item, index) => ({
      sNo: index + 1,
      materialCategory: item.materialCategory,
      materialSubCategory: item.materialSubCategory,
      materialDescription: item.materialDescription,
      uom: item.uom,
      quantity_requested: item.indentQuantity,
      quantity_balance: item.balanceIndent,
      quantity_issued: item.indentQuantity-item.balanceIndent,
      remark: '',
    }))
  : [
      {
        sNo: 1,
        materialCategory: '',
        materialSubCategory: '',
        materialDescription: '',
        uom: '',
        quantity_requested: '',
        quantity_balance: '',
        quantity_issued: '',
        remark: '',
      },
    ];

const [tableData, setTableData] = useState([]);

useEffect(() => {
 if(data)
 {
  setTableData(initialTableData)
 }
}, [data])

  
// console.log(tableData)

  const handleCellChange = (event, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = event.target.value;
    setTableData(newData);
  };

  

  useEffect(() => {
    setTable(tableData)
  }, [tableData])
  

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
              <th>Material SubCategory</th>
              <th>Material Description</th>
              <th>UOM</th>
              <th>Quantity Requested</th>
              <th>Quantity Balance</th>
              <th>Quantity Issued</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            { 
          
            data &&
            tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.sNo}</td>


                <td>
                <input 
                   type="text"
                   disabled
                   className="form-control"
                   value={row.materialCategory}
                   onChange={(e) =>
                     handleCellChange(e, index, 'materialCategory')}
                  />
                </td>


                <td>
                <input 
                   type="text"
                   disabled
                   className="form-control"
                   value={row.materialSubCategory}
                   onChange={(e) =>
                     handleCellChange(e, index, 'materialSubCategory')}
                  />
                </td>


                <td>
                <input 
                   type="text"
                   disabled
                   className="form-control"
                   value={row.materialDescription}
                   onChange={(e) =>
                     handleCellChange(e, index, 'materialDescription')}
                  />
                </td>


                <td>
                    <input 
                   type="text"
                   disabled
                   className="form-control"
                   value={row.uom}
                   onChange={(e) =>
                     handleCellChange(e, index, 'uom')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    disabled
                     min={1}
                    className="form-control"
                    value={row.quantity_requested}
                    onChange={(e) => handleCellChange(e, index, 'quantity_requested')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    disabled
                     min={1}
                    className="form-control"
                    value={ row.quantity_balance?row.quantity_balance:row.quantity_requested}
                    onChange={(e) => handleCellChange(e, index, 'balanceIndent')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    required
                    disabled
                    value={row.quantity_issued}
                    onChange={(e) => handleCellChange(e, index, 'quantity_issued')}
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
              value={row.sNo}
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
            <label htmlFor="quantity_requested">Quantity Requested:</label>
            <input
                    type="number"
                    disabled
                     min={1}
                    className="form-control"
                    value={ row.quantity?row.quantity:row.quantity_requested}
                    onChange={(e) => handleCellChange(e, index, 'quantity_requested')}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity_balance">Quantity Balance:</label>
            <input
                    type="number"
                    disabled
                     min={1}
                    className="form-control"
                    value={ row.quantity_balance?row.quantity_balance:row.quantity_requested}
                    onChange={(e) => handleCellChange(e, index, 'balanceIndent')}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity_issued">Quantity Issued:</label>
            <input
                    type="text"
                    className="form-control"
                    required
                    disabled
                    value={row.quantity_issued}
                    onChange={(e) => handleCellChange(e, index, 'quantity_issued')}
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
        {/* <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <button type="button" className="btn btn-primary" onClick={handleAddRow}>
            Add Row
          </button>
    
        </div> */}
      </div>

    
    </div>
  );
};

export default MaterialIssueFormShowEditableTable;
