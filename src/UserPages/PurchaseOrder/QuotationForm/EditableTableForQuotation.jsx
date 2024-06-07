import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import useGetProductData from "../../../CommonUtitlites/customHooks/useGetProducts";

const EditableTableForQuotation = (props) => {

  let products = useGetProductData()

  const [grandTotal, setGrandTotal] = useState(0);
  const [gstGrandTotal, setGstGrandTotal] = useState(0);

  const [tableData, setTableData] = useState([
    {
      sNo: 1,
      materialCategory: "",
      materialSubCategory: "",
      materialDescription: "",
      uom: "",
      quantity: "",
      rate: "",
      amount: "",
      gst: "",
      gstAmount: "",
      remark: "",
    },
  ]);

  const handleAddRow = () => {
    const newRow = {
      sNo: tableData.length + 1,
      materialCategory: "",
      materialSubCategory: "",
      materialDescription: "",
      uom: "",
      quantity: "",
      rate: "",
      amount: "",
      gst: "",
      gstAmount: "",
      remark: "",
    };

    setTableData([...tableData, newRow]);
  };


  useEffect(() => {
    props.setTableData(tableData)
  }, [tableData])
  



  const handleCellChange = (event, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = event.target.value;

    // Calculate the amount when quantity or rate changes
    if (columnName === "quantity" || columnName === "rate") {
      const quantity = parseFloat(newData[rowIndex].quantity);
      const rate = parseFloat(newData[rowIndex].rate);
      newData[rowIndex].amount = isNaN(quantity) || isNaN(rate) ? "" : (quantity * rate).toFixed(2);
    }

    // Update GST amount based on the selected GST percentage
    if (columnName === "gst") {
      const gst = parseFloat(event.target.value);
      const amount = parseFloat(newData[rowIndex].amount);
      newData[rowIndex].gstAmount = isNaN(gst) || isNaN(amount) ? "" : (amount * gst).toFixed(2);
    }

    setTableData(newData);
    calculateGrandTotal(newData);
    calculateGstGrandTotal(newData);
  };

  const calculateGrandTotal = (data) => {
    const total = data.reduce((acc, row) => {
      const amount = parseFloat(row.amount);
      return isNaN(amount) ? acc : acc + amount;
    }, 0);

    setGrandTotal(total);
  };

  const calculateGstGrandTotal = (data) => {
    const total = data.reduce((acc, row) => {
      const amount = parseFloat(row.gstAmount);
      return isNaN(amount) ? acc : acc + amount;
    }, 0);

    setGstGrandTotal(total);
  };

  const [show, setShow] = useState(false);
  const handleCollectData = () => {
    setShow(true);
    console.log(tableData);
    props.tableData(tableData);
  };

  useEffect(() => {
    new EditorJS({
      holder: "editorjs",
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
      <div id="editorjs">
        <table className="table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Material Category</th>
              <th>Material SubCategory</th>
              <th>Material Description</th>
              <th>UOM</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>GST</th>
              <th>GST Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <span className="column-name">S.No.</span>
                  <span>{row.sNo}</span>
                </td>
               
                <td>
                  <span className="column-name">Material Category</span>
                  <input
                    type="text"
                    className="form-control"
                    value={row.materialCategory}
                    onChange={(e) => handleCellChange(e, index, "materialCategory")}
                  />
                </td>
                <td>
                  <span className="column-name">Material SubCategory</span>
                  <input
                    type="text"
                    className="form-control"
                    value={row.materialSubCategory}
                    onChange={(e) => handleCellChange(e, index, "materialSubCategory")}
                  />
                </td>
                <td>
                  <span className="column-name">Material Description</span>
                  <input
                    type="text"
                    className="form-control"
                    value={row.materialDescription}
                    onChange={(e) => handleCellChange(e, index, "materialDescription")}
                  />
                </td>
                <td>
                  <span className="column-name">UOM</span>
                  <input
                    type="text"
                    className="form-control"
                    value={row.uom}
                    onChange={(e) => handleCellChange(e, index, "uom")}
                  />
                </td>
                <td>
                  <span className="column-name">Quantity</span>
                  <input
                    type="text"
                    className="form-control"
                    value={row.quantity}
                    onChange={(e) => handleCellChange(e, index, "quantity")}
                  />
                </td>
                <td>
                  <span className="column-name">Rate</span>
                  <input
                    type="text"
                    className="form-control"
                    value={row.rate}
                    onChange={(e) => handleCellChange(e, index, "rate")}
                  />
                </td>
                <td>
                  <span className="column-name">Amount</span>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={row.amount}
                  />
                </td>
                <td>
                  <span className="column-name">GST</span>
                  <select
                    className="form-control"
                    style={{ width: "4rem", padding: "0.2rem" }}
                    value={row.gst}
                    onChange={(e) => handleCellChange(e, index, "gst")}
                  >
                    <option value={0.0}>0%</option>
                    <option value={0.05}>5%</option>
                    <option value={0.12}>12%</option>
                    <option value={0.18}>18%</option>
                    <option value={0.28}>28%</option>
                  </select>
                </td>
                <td>
                  <span className="column-name">GST Amount</span>
                  <input
                    type="text"
                    className="form-control"
                    value={row.gstAmount}
                    readOnly
                    onChange={(e) => handleCellChange(e, index, "gstAmount")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddRow}
          >
            Add Row
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <label htmlFor="totalAmount">Total Amount</label>
            <input
              type="text"
              className="form-control"
              name="totalAmount"
              id="totalAmount"
              placeholder="Total Amount"
              value={grandTotal}
              required
            />
          </div>
          <div>
            <label htmlFor="totalgstAmount">Total GST Amount</label>
            <input
              type="text"
              className="form-control"
              name="totalgstAmount"
              id="totalgstAmount"
              placeholder="Total GST Amount"
              value={gstGrandTotal}
              required
            />
          </div>
          <div>
            <label htmlFor="grandAmount">Grand Total Amount</label>
            <input
              type="text"
              className="form-control"
              name="grandAmount"
              id="grandAmount"
              placeholder="Grand Total Amount"
              value={grandTotal + gstGrandTotal}
              required
            />
          </div>
        </div>
      
      </div>

      <div>
        </div>
    </div>
  );
};

export default EditableTableForQuotation;
