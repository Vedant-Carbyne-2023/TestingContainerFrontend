import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import styles from "./WorkOrderEditableTable.module.css"; // Import the CSS module
import Swal from "sweetalert2";

const WorkOrderEditableTable = (props) => {
  const [tableData, setTableData] = useState([
    {
      srNo: 1,
      particulars: "",
      unit: "",
      quantity: "",
      showRatePerUOM: false,
      unit_rate: "",
      total: ""
    },
    // Add more rows as needed...
  ]);

  useEffect(() => {
    new EditorJS({
      holder: "editorjs",
      tools: {
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 1,
            cols: 3,
            enableAddColumn: false,
            addRowButton: false,
          },
        },
      },
      data: {},
      minHeight: 0,
    });
  }, []);

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


  const handleDeleteRow = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this row.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, proceed with deleting the row
        let data = tableData.filter((data) => data.srNo !== index);
        console.log(data);
        if (data.length === 0) {
          // If no rows left after deletion, set a default row
          data = [{
            srNo: 1,
            particulars: "",
            unit: "",
            quantity: "",
            showRatePerUOM: false,
            unit_rate: "",
            total: ""
          }];
        }
        setTableData(data);
        Swal.fire(
          'Deleted!',
          'The row has been deleted.',
          'success'
        );
      }
    });
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

  const renderRatePerUOMInput = (row, index) => {
    if (row.showRatePerUOM) {
      return (
        <textarea
          type="text"
          className="form-control"
          value={row.unit_rate}
          onChange={(e) => handleCellChange(e, index, "unit_rate")}
        />
           );
    } else {
      return (
        <input
          type="number"
          min={1}
          required
          className="form-control"
          value={row.unit_rate}
          onChange={(e) => handleCellChange(e, index, "unit_rate")}
        />
     
      );
    }
  };
  const renderAmountInput = (row, index) => {
    if (row.showRatePerUOM) {
      return (
     
        <textarea
        type="text"
        className="form-control"
        value={row.total}
        onChange={(e) => handleCellChange(e, index, "total")}
      />
      );
    } else {
      return (
       
        <input
        type="number"
        className="form-control"
        value={row.total}
        onChange={(e) => handleCellChange(e, index, "total")}
      />
      );
    }
  };

  useEffect(() => {
    props.tableData(tableData);
  }, [tableData]);

  return (
    <div className={styles.container}>
      <div id="editorjs">
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
                <th>Delete Row Item</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
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
                  <td style={{cursor:'pointer'}} > 
                  <i class="fa fa-trash" onClick={()=>handleDeleteRow(row.srNo)}></i>

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
          <h6 className="pt-1">Add Particulars</h6>
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
