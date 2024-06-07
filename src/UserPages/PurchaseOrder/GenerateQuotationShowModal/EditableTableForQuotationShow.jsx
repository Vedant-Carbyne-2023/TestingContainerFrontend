import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import useGetAllUom from "../../../CommonUtitlites/customHooks/useGetAllUom";


const EditableTableForQuotationShow = (props) => {

  
  


  const [tableData, setTableData] = useState(props.tableData?props.tableData:[
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

  const [totalAmt, setTotalAmt] = useState("")
  const [totalGst, setTotalGst] = useState("")
  const [grandTotal, setGrandTotal] = useState("")
  
console.log(tableData)
  useEffect(() => {
    let totalAmount = 0;
    let totalGstAmount = 0;
    let totalAmountWithGst = 0;


    props.tableData.forEach((quotation) => {
        const amount = parseFloat(quotation.amount);
        if (!isNaN(amount)) {
          totalAmount += amount;
        }
    
        const gstAmount = parseFloat(quotation.gstAmount);
        if (!isNaN(gstAmount)) {
          totalGstAmount += gstAmount;
        }
    
        if (!isNaN(amount) && !isNaN(gstAmount)) {
          totalAmountWithGst += amount + gstAmount;
        }
      });
      setTotalGst(totalGstAmount)
      setTotalAmt(totalAmount)
      setGrandTotal(totalAmountWithGst)
   
  }, [])
  




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

  const unitOfMeasurement = useGetAllUom();

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
            {
          
            tableData.map((row, index) => (
              <tr key={index}>
                <td>
                  <span>{index+1}</span>
                </td>
               
                <td>
                  <input
                    type="text"
                    className="form-control" style={{width:'fit-content'}}
                    value={row.materialCategory}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.materialSubCategory}
                    disabled
                    style={{width:'fit-content'}}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    style={{width:'fit-content'}}
                    className="form-control"
                    value={row.materialDescription}
                    disabled
                  />
                </td>
                <td>
                    <select
                      name="unit"
                      id="unit" style={{width:'fit-content'}}
                      required
                      className="form-control"
                      readOnly
                      value={row.uom}
                    >
                          {unitOfMeasurement &&
                    unitOfMeasurement.map((uom) => (
                      <option value={uom.name.toLowerCase()}>{uom.name}</option>
                    ))}
                    </select>
                  </td>
                <td>
                  <input
                    type="text"
                    style={{width:'fit-content'}}
                    className="form-control"
                    value={row.quantity}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    style={{width:'fit-content'}}
                    value={row.rate}
                    disabled
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
                    disabled
                    value={row.gst}
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
                    style={{width:'fit-content'}}
                    value={row.gstAmount}
                    disabled
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              value={totalAmt}
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
              value={totalGst}
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
              value={grandTotal}
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
