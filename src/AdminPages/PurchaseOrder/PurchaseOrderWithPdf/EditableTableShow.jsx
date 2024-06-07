import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import useGetProductData from "../../../CommonUtitlites/customHooks/useGetProducts";
import styles from "../../MaterialRequisition/MaterialRequisition/EditableTable/EditableTable.module.css";

const EditableTableShow = (props) => {
  


  const [quotationData, setQuotationData] = useState([])
const [vendorId, setVendorId] = useState("")
const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    setQuotationData( props.quotationData)
    setVendorId(props.vendorId)

    let items =[]
    props.quotationData.map(item =>
      items.push(item.name)
      )
    setSelectedItems(items)    

  }, [props.quotationData, props.vendorId])
  


  const [grandTotal, setGrandTotal] = useState(0);

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
      sgst: "",
      sgstamount: "",
      cgst: "",
      cgstamount: "",
      igst: "",
      igstamount: "",
      remark: "",
    },
  ]);

  
 

  useEffect(() => {
    // Function to update the tableData based on selected items and vendors
    const updateTableData = () => {
      let serialNumber = 1;
      const newTableData = selectedItems
      .map((item, index) => {
        const quotations = quotationData.find((where) => where.name === item).quotations;
        const vendorQuotes = quotations.find((quote) => quote.vendorId === props.vendorId);
  
        if (vendorQuotes !== undefined) {
          const data = {
            sNo: serialNumber,
            materialCategory: quotations[0].materialCategory,
            materialSubCategory: quotations[0].materialSubCategory,
            materialDescription: quotations[0].materialDescription,
            materialCode: quotations[0].materialCode,
            quantity: quotations[0].quantity,
            uom: quotations[0].uom,
            rate: vendorQuotes.rate ? vendorQuotes.rate : 0,
            amount: quotations[0].quantity * (vendorQuotes.rate ? vendorQuotes.rate : 0),
            sgst: "",
            sgstamount: "",
            cgst: "",
            cgstamount: "",
            igst: "",
            igstamount: "",
            remark: "",
          };
          
          serialNumber++; // Increment serial number for the next item
          return data;
        }
      })
      .filter((item) => item !== undefined);

      props.setTableData(newTableData);
      setTableData(newTableData);
    };

    updateTableData();
  }, [selectedItems, quotationData]);






  

  const handleCellChange = (event, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = event.target.value;
  
    // Calculate the amount when quantity or rate changes
    if (columnName === 'quantity' || columnName === 'rate') {
      const quantity = parseFloat(newData[rowIndex].quantity);
      const rate = parseFloat(newData[rowIndex].rate);
      newData[rowIndex].amount = isNaN(quantity) || isNaN(rate) ? '' : (quantity * rate).toFixed(2);
    }
  
    // Calculate the SGST amount, CGST amount, and IGST amount
    if (columnName === 'sgst' || columnName === 'cgst' || columnName === 'igst') {
      const amount = parseFloat(newData[rowIndex].amount);
      const sgstPercentage = parseFloat(newData[rowIndex].sgst);
      const cgstPercentage = parseFloat(newData[rowIndex].cgst);
      const igstPercentage = parseFloat(newData[rowIndex].igst);
  
      newData[rowIndex].sgstamount = isNaN(amount) || isNaN(sgstPercentage) ? '' : (amount * sgstPercentage).toFixed(2);
      newData[rowIndex].cgstamount = isNaN(amount) || isNaN(cgstPercentage) ? '' : (amount * cgstPercentage).toFixed(2);
      newData[rowIndex].igstamount = isNaN(amount) || isNaN(igstPercentage) ? '' : (amount * igstPercentage).toFixed(2);
    }
  
    setTableData(newData);
    props.setTableData(newData)
    calculateGrandTotal(newData);
  };
  
  // Function to calculate the total of all amounts
  const calculateTotalAmount = () => {
    return tableData.reduce((total, row) => {
      const rowAmount = parseFloat(row.amount);
      return isNaN(rowAmount) ? total : total + rowAmount;
    }, 0).toFixed(2);
  };

  // Function to calculate the total of all SGST amounts
  const calculateTotalSgstAmount = () => {
    return tableData.reduce((total, row) => {
      const sgstAmount = parseFloat(row.sgstamount);
      return isNaN(sgstAmount) ? total : total + sgstAmount;
    }, 0).toFixed(2);
  };

  // Function to calculate the total of all CGST amounts
  const calculateTotalCgstAmount = () => {
    return tableData.reduce((total, row) => {
      const cgstAmount = parseFloat(row.cgstamount);
      return isNaN(cgstAmount) ? total : total + cgstAmount;
    }, 0).toFixed(2);
  };

  // Function to calculate the total of all IGST amounts
  const calculateTotalIgstAmount = () => {
    return tableData.reduce((total, row) => {
      const igstAmount = parseFloat(row.igstamount);
      return isNaN(igstAmount) ? total : total + igstAmount;
    }, 0).toFixed(2);
  };

  // Function to calculate the grand total
  // props.setTableData(tableData)
  const calculateGrandTotal = () => {
    const totalAmount = parseFloat(calculateTotalAmount());
    const totalSgstAmount = parseFloat(calculateTotalSgstAmount());
    const totalCgstAmount = parseFloat(calculateTotalCgstAmount());
    const totalIgstAmount = parseFloat(calculateTotalIgstAmount());

    return (totalAmount + totalSgstAmount + totalCgstAmount + totalIgstAmount).toFixed(2);
  };

 
   


  

  // useEffect(() => {
  //   new EditorJS({
  //     holder: "editorjs",
  //     tools: {
  //       table: {
  //         class: Table,
  //         inlineToolbar: true,
  //         config: {
  //           rows: 1, // Set the initial number of rows
  //           cols: 3, // Set the initial number of columns
  //           enableAddColumn: false, // Disable adding columns
  //           addRowButton: false, // Disable adding columns
  //         },
  //       },
  //     },
  //     data: {},
  //     minHeight: 0,
  //   });
  // }, []);

// console.log(sgstPercentage)
  return (
    <div className="container-fluid p-0">
      <div >
      <div className={styles["table-wrapper"]}>
        <table className={`table ${styles.table_editable}`}>
          <thead>
            <tr>
            <th style={{ width: "150px" }}>S.No.</th>
              <th style={{ width: "15rem" }}>Material Category</th>
              <th style={{ width: "150px" }}>Material Sub Category</th>
              <th style={{ width: "150px" }}>Material Description</th>
              <th style={{ width: "150px" }}>UOM</th>
              <th style={{ width: "150px" }}>Quantity</th>
              <th style={{ width: "150px" }}>Rate</th>
              <th style={{ width: "150px" }}>Amount</th>
              <th style={{ width: "150px" }}>Sgst</th>
              <th style={{ width: "150px" }}>Sgst Amount</th>
              <th style={{ width: "150px" }}>Cgst</th>
              <th style={{ width: "150px" }}>Cgst Amount</th>
              <th style={{ width: "150px" }}>Igst</th>
              <th style={{ width: "150px" }}>Igst Amount</th>
              <th style={{ width: "150px" }}>Remark</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.sNo}</td>
                <td>
                  <input
                  style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.materialCategory}
                    readOnly
                    onChange={(e) =>
                      handleCellChange(e, index, "materialCategory")
                    }
                  />
                    
                </td>
                <td>
                  <input
                  style={{width:"fit-content"}}
                    type="text"
                    readOnly
                    className="form-control"
                    value={row.materialSubCategory}
                    onChange={(e) =>
                      handleCellChange(e, index, "materialSubCategory")
                    }
                  />
                    
                </td>
                <td>
                  <input
                  style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.materialDescription}
                    onChange={(e) =>
                      handleCellChange(e, index, "materialDescription")
                    }
                  />
                    
                </td>
               
                <td>  <input
                style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.uom}
                    onChange={(e) =>
                      handleCellChange(e, index, "uom")
                    }
                  /></td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    style={{width:"fit-content"}}
                    max={row.quantity}
                    value={row.quantity}
                    onChange={(e) => handleCellChange(e, index, "quantity")}
                  />
                </td>
                <td>
                  <input
                  style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.rate}
                    onChange={(e) => handleCellChange(e, index, "rate")}
                  />
                </td>
                <td>
                   <input
                    type="text"
                    style={{width:"fit-content"}} 
                    className="form-control"
                    value={row.amount}
                  />
                  </td>
                  <td>
                  <select
                    className="form-control"
                    style={{ width:"fit-content", padding: "0.2rem" }}
                    value={row.sgst}
                    onChange={(e) => handleCellChange(e, index, "sgst")}
                  >
                    <option value={0.0}>0%</option>
                    <option value={0.025}>2.5%</option>
                    <option value={0.06}>6%</option>
                    <option value={0.09}>9%</option>
                    <option value={0.14}>14%</option>
                  </select>
                </td>
                <td>
                   <input
                   style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.sgstamount}
                  />
                  </td>
                  <td>
                  <select
                    className="form-control"
                    style={{ width:"fit-content", padding: "0.2rem" }}
                    value={row.cgst}
                    onChange={(e) => handleCellChange(e, index, "cgst")}
                  >
                    <option value={0.0}>0%</option>
                    <option value={0.025}>2.5%</option>
                    <option value={0.06}>6%</option>
                    <option value={0.09}>9%</option>
                    <option value={0.14}>14%</option>
                  </select>
                </td>
                <td>
                   <input
                   style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.cgstamount}
                  />
                  </td>
                  <td>
                  <select
                    className="form-control"
                    style={{ width: "fit-content", padding: "0.2rem" }}
                    value={row.igst}
                    onChange={(e) => handleCellChange(e, index, "igst")}
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
                    style={{width:"fit-content"}}
                    className="form-control"
                    value={row.igstamount}
                  />
                  </td>
                <td>
                  <input
                    type="text"
                    style={{width:"fit-content"}}
                    className="form-control"
                    value={row.remark}
                    onChange={(e) => handleCellChange(e, index, "remark")}
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
                  style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.materialCategory}
                    readOnly
                    onChange={(e) =>
                      handleCellChange(e, index, "materialCategory")
                    }
                  />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-3`}>
            <label htmlFor="materialSubCategory">Material Sub Category:</label>
            <input
                  style={{width:"fit-content"}}
                    type="text"
                    readOnly
                    className="form-control"
                    value={row.materialSubCategory}
                    onChange={(e) =>
                      handleCellChange(e, index, "materialSubCategory")
                    }
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-4`}>
            <label htmlFor="materialDescription">Material Description:</label>
            <input
                  style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.materialDescription}
                    onChange={(e) =>
                      handleCellChange(e, index, "materialDescription")
                    }
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="uom">UOM:</label>
            <input
                style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.uom}
                    onChange={(e) =>
                      handleCellChange(e, index, "uom")
                    }
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity">Quantity:</label>
            <input
                    type="number"
                    className="form-control"
                    style={{width:"fit-content"}}
                    max={row.quantity}
                    value={row.quantity}
                    onChange={(e) => handleCellChange(e, index, "quantity")}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="rate">Rate:</label>
            <input
                  style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.rate}
                    onChange={(e) => handleCellChange(e, index, "rate")}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="amount">Amount:</label>
            <input
                    type="text"
                    style={{width:"fit-content"}} 
                    className="form-control"
                    value={row.amount}
                  />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="sgst">Sgst:</label>
            <select
                    className="form-control"
                    style={{ width:"fit-content", padding: "0.2rem" }}
                    value={row.sgst}
                    onChange={(e) => handleCellChange(e, index, "sgst")}
                  >
                    <option value={0.0}>0%</option>
                    <option value={0.025}>2.5%</option>
                    <option value={0.06}>6%</option>
                    <option value={0.09}>9%</option>
                    <option value={0.14}>14%</option>
                  </select>
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="sgstamount">Sgst Amount:</label>
            <input
                   style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.sgstamount}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="cgst">Cgst:</label>
            <select
                    className="form-control"
                    style={{ width:"fit-content", padding: "0.2rem" }}
                    value={row.cgst}
                    onChange={(e) => handleCellChange(e, index, "cgst")}
                  >
                    <option value={0.0}>0%</option>
                    <option value={0.025}>2.5%</option>
                    <option value={0.06}>6%</option>
                    <option value={0.09}>9%</option>
                    <option value={0.14}>14%</option>
                  </select>
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="cgstamount">Cgst Amount:</label>
            <input
                   style={{width:"fit-content"}}
                    type="text"
                    className="form-control"
                    value={row.cgstamount}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="igst">Igst:</label>
            <select
                    className="form-control"
                    style={{ width: "fit-content", padding: "0.2rem" }}
                    value={row.igst}
                    onChange={(e) => handleCellChange(e, index, "igst")}
                  >
                    <option value={0.0}>0%</option>
                    <option value={0.05}>5%</option>
                    <option value={0.12}>12%</option>
                    <option value={0.18}>18%</option>
                    <option value={0.28}>28%</option>
                  </select>
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="igstamount">Igst Amount:</label>
            <input
                    type="text"
                    style={{width:"fit-content"}}
                    className="form-control"
                    value={row.igstamount}
                  />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-2`}>
            <label htmlFor="remark">Remark:</label>
            <input
                    type="text"
                    style={{width:"fit-content"}}
                    className="form-control"
                    value={row.remark}
                    onChange={(e) => handleCellChange(e, index, "remark")}
                  />
          </div>
          </div>
      </>
      )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
   

      
        </div>
        
        <div>
        <strong>Total Amount: </strong> {calculateTotalAmount()} <br />
        <strong>Total SGST: </strong> {calculateTotalSgstAmount()} <br />
        <strong>Total CGST: </strong> {calculateTotalCgstAmount()} <br />
        <strong>Total IGST: </strong> {calculateTotalIgstAmount()} <br />
        <strong>Grand Total: </strong> {calculateGrandTotal()} <br />
      </div>
      </div>

      <div>
  
</div>
    </div>
  );
};

export default EditableTableShow;
