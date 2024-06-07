import React, { useState, useEffect } from 'react';
import styles from '../MaterialRequisition/EditableTable/EditableTable.module.css';

const ShowDataTable = ({data, editable}) => {
 


  let tableData=data.tableData

  return (
    <div className="container">
      <div >
      <div className={styles["table-wrapper"]}>
        <table className={`table ${styles.table_editable}`}>
          <thead>
            <tr>
            <th>S.No.</th>
              <th>Material Category</th>
              <th>Material Sub Category</th>
              <th>Material Description</th>
              <th>Quantity</th>
              <th>UOM</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.map((row, index) => (
              <tr >
                <td>{row.sNo}</td>
                <td>
                  <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.materialCategory}
                 />
                  
                </td>
                <td>
                  <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.materialSubCategory}
                 />
                  
                </td>
                <td>
                  <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.materialDescription}
                 />
                  
                </td>
                <td>
                  <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.quantity}
                  />
                </td>
                <td>
                  <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.uom}
                  />
                </td>
                <td>
                  <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.remark}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {tableData.map((row,index)=>
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
                  disabled
                    type="text"
                    className="form-control"
                    value={row.materialCategory}
                 />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-3`}>
            <label htmlFor="materialSubCategory">Material Sub Category:</label>
            <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.materialSubCategory}
                 />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-4`}>
            <label htmlFor="materialDescription">Material Description:</label>
            <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.materialDescription}
                 />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity">Quantity:</label>
            <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.quantity}
                  />
          </div>


          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="uom">UOM:</label>
            <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.uom}
                  />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-2`}>
            <label htmlFor="remark">Remark:</label>
            <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.remark}
                  />
          </div>
         </div>
      </>
      )}

        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
         
        </div>
      </div>
    </div>
  );
};

export default ShowDataTable;
