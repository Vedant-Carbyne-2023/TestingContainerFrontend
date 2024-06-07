import React, { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Table from '@editorjs/table';
import { propTypes } from 'react-bootstrap/esm/Image';
import styles from '../../MaterialRequisition/MaterialRequisition/EditableTable/EditableTable.module.css';

const MaterialReceiptNoteEditableTable = (props) => {

  const [tableData, setTableData] = useState(() => {
    if (props.tableData) {
      return props.tableData.map(row => {
        if (!row.hasOwnProperty('balance_quantity')) {
          return { ...row, balance_quantity: row.quantity };
        }
        return row;
      });
    } else {
      return [
        { sNo: 1, materialCategory: '', materialSubCategory: '', materialDescription: '', uom: '', balance_quantity: "", quantity: '', quantity_received: '', remark: '' }
      ];
    }
  });



  const handleCellChange = (event, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = event.target.value;
    setTableData(newData);
  };

  useEffect(() => {
    // console.log("er")
    props.settingTable(tableData)
  }, [tableData])




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
                <th>Balance Quantity</th>
                <th>Quantity Recieved</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
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
                      name="quantity"
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
                      name="balance_quantity"
                      min={0}
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
                      name="qtyre"
                      type="number"
                      className="form-control"
                      // required
                      min={0}
                      max={row.balance_quantity !== undefined && row.balance_quantity !== null || row.balance_quantity === 0
                        ? row.balance_quantity
                        : row.quantity}

                      onChange={(e) => handleCellChange(e, index, 'quantity_received')}
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
        </div>

        {tableData.map((row, index) =>
          <>
            <div className={styles["row-wise-layout"]}>
              <div className={`${styles["column-name"]} col-12 col-md-1`}>
                S.No.
                <input
                  type="number"
                  className="form-control"
                  value={index + 1}
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
                  name="qtyre"
                  className="form-control"
                  // required
                  min={0}
                  max={row.balance_quantity !== undefined && row.balance_quantity !== null || row.balance_quantity === 0
                    ? row.balance_quantity
                    : row.quantity}

                  onChange={(e) => handleCellChange(e, index, 'quantity_received')}
                />
              </div>




              <div className={`${styles["column-name"]} col-12 col-md-2`}>
                <label htmlFor="remark">Remark:</label>
                <input
                  type="text"
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
          </button> */}

        {/* <button type="button" className="btn btn-success" onClick={handleCollectData}>
           Submit Data
          </button> */}
        {/* </div> */}
      </div>


    </div>
  );
};

export default MaterialReceiptNoteEditableTable;
