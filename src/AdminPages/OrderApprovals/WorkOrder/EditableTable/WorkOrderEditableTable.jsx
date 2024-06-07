import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import styles from "./WorkOrderEditableTable.module.css"; // Import the CSS module

const WorkOrderEditableTable = (props) => {
  const [tableData, setTableData] = useState(
    props.table || [
      {
        sNo: 1,
        particulars: "",
        unit: "",
        quantity: "",
        showRatePerUOM: false,
        unit_rate: "",
        total: ""
      },
      // Add more rows as needed...
    ]
  );



  const [disableAddRow, setDisableAddRow] = useState(true);

  useEffect(() => {
    const lastRow = tableData[tableData.length - 1];
    const isLastRowEmpty = Object.values(lastRow).some((value) => value === "");
    setDisableAddRow(isLastRowEmpty);
  }, [tableData]);

  const handleAddRow = () => {
    const newRow = {
      srNo: tableData.length + 1,
      particulars: "",
      unit: "",
      quantity: "",
      showRatePerUOM: false,
      unit_rate: "",
      total: "",
    };
    setTableData((prevRows) => [...prevRows, newRow]);
  };

  const [totalAmount, setTotalAmount] = useState("");

const handleCellChange = (data, rowIndex, columnName) => {
  const newData = [...tableData];
  newData[rowIndex][columnName] = data.target.value;

 
  const total = newData.reduce((acc, row) => {
    const parsedTotal = parseFloat(row.total);
    if (!Number.isNaN(parsedTotal)) {
      if (Number.isInteger(parsedTotal)) {
        // If it's an integer
        acc.intTotal += parsedTotal;
      } else {
        // If it's a float
        acc.floatTotal += parsedTotal;
      }
    }
    return acc;
  }, { intTotal: 0, floatTotal: 0 });

  // Calculate the grand total
  const grandTotal = total.intTotal + total.floatTotal;

  setTotalAmount(grandTotal);
  setTableData(newData);



  };

  const handleUnitChange = (data, rowIndex) => {
    const newData = [...tableData];
    newData[rowIndex].unit = data.target.value;
    newData[rowIndex].showRatePerUOM = data.target.value === "custom";
    setTableData(newData);
  };

  useEffect(() => {
    props.tableData(tableData);
  }, [tableData]);

  return (
    <div className={styles.container}>
      <div >
        <div className={styles["table-wrapper"]}>
          <table className={`table ${styles.table_editable}`}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Particulars</th>
                <th>Unit</th>
                <th>Qty</th>
                <th>Rate Per UOM</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <textarea
                      type="text"
                      className="form-control"
                      value={row.particulars}
                      onChange={(e) => handleCellChange(e, index, "particulars")}
                    />
                  </td>

                  <td>
                    <textarea 
                      name="unit"
                      id="unit"
                      required
                      className="form-control"
                      value={row.unit || ""}
                      onChange={(e) => handleUnitChange(e, index)}
                    />
                
                  </td>

                  <td>
                    <textarea
                      type="number"
                      min={1}
                      className="form-control"
                      value={row.quantity}
                      onChange={(e) => handleCellChange(e, index, "quantity")}
                    />
                  </td>
                  <td>

                  <textarea
                      type="text"
                      className="form-control"
                      value={row.unit_rate}
                      onChange={(e) => handleCellChange(e, index, "unit_rate")}
                    />
                  
                  </td>
                  <td> <textarea
                      type="text"
                      className="form-control"
                      value={row.total}
                      onChange={(e) => handleCellChange(e, index, "total")}
                    />
                    </td>
                  
                </tr>
              ))}
            </tbody>
            <tfoot>
              {/* <tr>
                <td colSpan="5">
                  <strong>Grand Total Amount</strong>
                </td>
                <td>
                  <strong>{totalAmount}</strong>
                </td>
              </tr> */}
            </tfoot>
          </table>
        </div>

        <div className={styles["row-wise-layout"]}>
          <button
            type="button"
            className={`btn btn-primary ${styles["add-row-button"]}`}
            onClick={handleAddRow}
            disabled={disableAddRow}
          >
            Add Particulars
          </button>
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
            <label htmlFor="particulars">Particulars:</label>
            <textarea
                      type="text"
                      className="form-control"
                      value={row.particulars}
                      onChange={(e) => handleCellChange(e, index, "particulars")}
                    />
          </div>


          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="unit">Unit:</label>
            <textarea 
                      name="unit"
                      id="unit"
                      required
                      className="form-control"
                      value={row.unit || ""}
                      onChange={(e) => handleUnitChange(e, index)}
                    />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity">Quantity:</label>
            <textarea
                      type="number"
                      min={1}
                      className="form-control"
                      value={row.quantity}
                      onChange={(e) => handleCellChange(e, index, "quantity")}
                    />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="unit_rate">Rate Per UOM:</label>
            <textarea
                      type="text"
                      className="form-control"
                      value={row.unit_rate}
                      onChange={(e) => handleCellChange(e, index, "unit_rate")}
                    />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="total">Total Amount:</label>
            <textarea
                      type="text"
                      className="form-control"
                      value={row.total}
                      onChange={(e) => handleCellChange(e, index, "total")}
                    />
          </div>

          
          </div>
      </>
      )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className={`btn btn-primary ${styles["add-row-button"]}`}
            onClick={handleAddRow}
            disabled={disableAddRow}
          >
            Add Particulars
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkOrderEditableTable;
