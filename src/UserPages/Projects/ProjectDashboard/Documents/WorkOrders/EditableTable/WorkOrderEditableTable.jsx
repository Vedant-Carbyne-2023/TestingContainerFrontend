import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import styles from "./WorkOrderEditableTable.module.css"; // Import the CSS module

const WorkOrderEditableTable = (props) => {
 
  const [Edit, setEdit] = useState(props.styling)
    const totalSum = props.table.reduce((sum, item) => sum + item.total, 0);
  console.log('calculated total', totalSum);
  const [totalAmount, setTotalAmount] = useState(totalSum);
  useEffect(() => {
   setEdit(props.styling)
  }, [props.styling])
  
  const [tableData, setTableData] = useState(
    props.table?props.table:
    [
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


const handleCellChange = (data, rowIndex, columnName) => {
  const newData = [...tableData];
  newData[rowIndex][columnName] = data.target.value;

  if (columnName === "quantity" || columnName === "unit_rate") {
    newData[rowIndex]["total"] =
      newData[rowIndex]["quantity"] * newData[rowIndex]["unit_rate"];
  }
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
  console.log('grand total', grandTotal)
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
          disabled={Edit?true:false}
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
          disabled={Edit?true:false}
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
        disabled={Edit?true:false}
        className="form-control"
        value={row.total}
        onChange={(e) => handleCellChange(e, index, "total")}
      />
      );
    } else {
      return (
       
        <input
        type="number"
        disabled={Edit?true:false}
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
              </tr>
            </thead>
            <tbody>
              {props.table  &&  props.table.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <textarea
                    disabled={Edit?true:false}
                      type="text"
                      className="form-control"
                      value={row.particulars}
                      onChange={(e) => handleCellChange(e, index, "particulars")}
                    />
                  </td>

                  <td>
                    <select
                      name="unit"
                      id="unit"
                      required
                      disabled={Edit?true:false}
                      className="form-control"
                      value={row.unit || ""}
                      onChange={(e) => handleUnitChange(e, index)}
                    >
                      <option value="">Select Option</option>
                      <option value="bags">Bags</option>
                      <option value="nos">Nos</option>
                      <option value="kg">Kilograms</option>
                      <option value="mtr">Meters</option>
                      <option value="tons">Tons</option>
                      <option value="metric tons">Metric Tons</option>
                      <option value="custom">Text Input</option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="number"
                      disabled={Edit?true:false}
                      min={1}
                      className="form-control"
                      value={row.quantity}
                      onChange={(e) => handleCellChange(e, index, "quantity")}
                    />
                  </td>
                  <td>{renderRatePerUOMInput(row, index)}</td>
                  <td>{renderAmountInput(row, index)}</td>
                  
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5">
                  <strong>Grand Total Amount</strong>
                </td>
                <td>
                  <strong>{totalAmount}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* <div className={styles["row-wise-layout"]}>
          <h6 className="pt-1">Add Particulars</h6>
        </div> */}

        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className={`btn btn-primary ${styles["add-row-button"]}`}
            onClick={handleAddRow}
            disabled={disableAddRow}
          >
            Add Particulars
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default WorkOrderEditableTable;
