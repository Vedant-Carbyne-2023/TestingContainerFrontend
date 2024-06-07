import React, { useState, useEffect } from "react";
import styles from "../PurchaseRequisition/EditableTablePR/EditableTable.module.css";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";


const EditableTableForQuotationShow = (props) => {

  
  

  const [grandTotal, setGrandTotal] = useState(0);
  const [gstGrandTotal, setGstGrandTotal] = useState(0);

  const [tableData, setTableData] = useState(props.tableData
    ? props.tableData.map((row) => ({
      ...row,
      gst: row.gst || "0.0",
      quantity_balance:row.quantity_balance?row.quantity_balance:row.quantity,
      gstAmount: row.gstAmount || 0,
    }))
    
    
    :[
    {
      sNo: 1,
      materialCategory: "",
      materialSubCategory: "",
      materialDescription: "",
      uom: "",
      quantity: "",
      quantity_balance: "",
      rate: "",
      amount: "",
      gst: "",
      gstAmount: "",
      remark: "",
      isSelected: false,
    },
  ]);
  console.log(tableData)
  // const handleAddRow = () => {
  //   const newRow = {
  //     sNo: tableData.length + 1,
  //     materialCategory: "",
  //     materialSubCategory: "",
  //     materialDescription: "",
  //     uom: "",
  //     quantity: "",
  //     rate: "",
  //     amount: "",
  //     gst: "",
  //     gstAmount: "",
  //     remark: "",
  //   };

  //   setTableData([...tableData, newRow]);
  // };


  useEffect(() => {
    handleCollectData()
    // props.setTableData(tableData)
  }, [tableData])
  



  const handleCellChange = (event, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = event.target.value;
    
    // Calculate the amount when quantity or rate changes
    if (columnName === "quantity")
    {newData[rowIndex]["quantity_balance"] = event.target.value}

    if (columnName === "quantity" || columnName === "rate") {
      const quantity = parseFloat(newData[rowIndex].quantity_balance?newData[rowIndex].quantity_balance:newData[rowIndex].quantity);
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
    const selectedRows = tableData.filter((row) => row.isSelected);
    console.log(selectedRows);
    props.setTableData(selectedRows);
  };

 
  const handleRowSelect = (index) => {
    const newData = [...tableData];
    newData[index].isSelected = !newData[index].isSelected;
    setTableData(newData);
  };

  

  return (
    <div className="container p-0">
      <div >
      <div className={styles["table-wrapper"]}>
        <table className={`table ${styles.table_editable}`}>
          <thead>
            <tr>
              <th>Select </th>
                            <th>S.No.</th>
              <th>Material Category</th>
              <th>Material SubCategory</th>
              <th>Material Description</th>
              <th>UOM</th>
              <th>Quantity</th>
              <th>Quantity Balance</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>GST</th>  
              <th>GST Amount</th>
            </tr>
          </thead>
          <tbody>
            {
          
            tableData.map((row, index) => (
              <tr key={index}>
                 <td>
        <input
          type="checkbox"
          checked={row.isSelected}
          onChange={() => handleRowSelect(index)}
        />
      </td>
                <td>
                  <span>{row.sNo}</span>
                </td>
               
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.materialCategory}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "materialCategory")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.materialSubCategory}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "materialSubCategory")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.materialDescription}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "materialDescription")}
                  />
                </td>
                <td>
                    <select
                      name="unit"
                      id="unit"
                      required
                      className="form-control"
                      readOnly
                      value={row.uom}
                      onChange={(e) => handleCellChange(e, index, "uom")}
                    >
                      <option value="bags">Bags</option>
                      <option value="nos">Nos</option>
                      <option value="kg">Kilograms</option>
                      <option value="mtr">Meters</option>
                      <option value="tons">Tons</option>
                      <option value="metric tons">Metric Tons</option>
                    </select>
                  </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.quantity}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "quantity")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.quantity_balance?row.quantity_balance:row.quantity}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "quantity_balance")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    style={{width:'fit-content'}}
                    value={row.rate}
                    onChange={(e) => handleCellChange(e, index, "rate")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    style={{width:'fit-content'}}
                    value={row.amount}
                  />
                </td>
                <td>
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
        </div>

        {tableData.map((row,index)=>
      <>
        <div className={styles["row-wise-layout"]}>
        <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="select"> Select:</label>
            <input
              type="checkbox"
              checked={row.isSelected}
              onChange={() => handleRowSelect(index)}
            />
         </div>
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
                    className="form-control"
                    value={row.materialCategory}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "materialCategory")}
                  />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-3`}>
            <label htmlFor="materialSubCategory">Material Sub Category:</label>
            <input
                    type="text"
                    className="form-control"
                    value={row.materialSubCategory}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "materialSubCategory")}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-4`}>
            <label htmlFor="materialDescription">Material Description:</label>
            <input
                    type="text"
                    className="form-control"
                    value={row.materialDescription}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "materialDescription")}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="uom">UOM:</label>
            <select
                      name="unit"
                      id="unit"
                      required
                      className="form-control"
                      readOnly
                      value={row.uom}
                      onChange={(e) => handleCellChange(e, index, "uom")}
                    >
                      <option value="bags">Bags</option>
                      <option value="nos">Nos</option>
                      <option value="kg">Kilograms</option>
                      <option value="mtr">Meters</option>
                      <option value="tons">Tons</option>
                      <option value="metric tons">Metric Tons</option>
                    </select>
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity">Quantity:</label>
            <input
                    type="text"
                    className="form-control"
                    value={row.quantity}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "quantity")}
                  />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity_balance">Quantity Balance:</label>
            <input
                    type="text"
                    className="form-control"
                    value={row.quantity_balance?row.quantity_balance:row.quantity}
                    disabled
                    onChange={(e) => handleCellChange(e, index, "quantity_balance")}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="rate">Rate:</label>
            <input
                    type="text"
                    className="form-control"
                    style={{width:'fit-content'}}
                    value={row.rate}
                    onChange={(e) => handleCellChange(e, index, "rate")}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="amount">Amount:</label>
            <input
                    type="text"
                    className="form-control"
                    readOnly
                    style={{width:'fit-content'}}
                    value={row.amount}
                  />
          </div>

 
          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="gst">GST:</label>
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
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-2`}>
            <label htmlFor="remark">GST Amount:</label>
            <input
                    type="text"
                    className="form-control"
                    value={row.gstAmount}
                    readOnly
                    onChange={(e) => handleCellChange(e, index, "gstAmount")}
                  />
          </div>
         </div>
      </>
      )}

        {/* <div
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
        </div> */}
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

export default EditableTableForQuotationShow;


