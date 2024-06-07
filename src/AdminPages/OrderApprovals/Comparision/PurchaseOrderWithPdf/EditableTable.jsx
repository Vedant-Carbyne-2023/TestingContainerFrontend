import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import useGetProductData from "../../../../CommonUtitlites/customHooks/useGetProducts";

const EditableTable = (props) => {
  
  const {products} = useGetProductData()


  const [quotationData, setQuotationData] = useState([])
const [vendorId, setVendorId] = useState("")

  useEffect(() => {
    setQuotationData( props.quotationData)
    setVendorId(props.vendorId)
  }, [props])
  



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
      sgst: "",
      sgstamount: "",
      cgst: "",
      cgstamount: "",
      igst: "",
      igstamount: "",
      remark: "",
    };

    setTableData([...tableData, newRow]);
  };

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
    calculateGrandTotal(newData);
  };
  
  const calculateGrandTotal = (data) => {
    const total = data.reduce((acc, row) => {
      const amount = parseFloat(row.amount);
      return isNaN(amount) ? acc : acc + amount;
    }, 0);
  
    setGrandTotal(total);
  };
  const [show, setshow] = useState(false)
  const handleCollectData = () => {
    setshow(true)
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

  const [sgstPercentage, setSgstPercentage] = useState(0);
const [cgstPercentage, setCgstPercentage] = useState(0);
const [igstPercentage, setIgstPercentage] = useState(0);
console.log(sgstPercentage)
  return (
    <div className="container p-0">
      <div id="editorjs">
        <table className="table" style={{overflow:'scroll'}}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Item Description</th>
              <th>UOM</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Sgst</th>
              <th>Sgst Amount</th>
              <th>Cgst</th>
              <th>Cgst Amount</th>
              <th>Igst</th>
              <th>Igst Amount</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.sNo}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.itemsDescription}
                    onChange={(e) =>
                      handleCellChange(e, index, "itemsDescription")
                    }
                  />
                    
                </td>
               
                <td>  <input
                    type="text"
                    className="form-control"
                    value={row.uom}
                    onChange={(e) =>
                      handleCellChange(e, index, "uom")
                    }
                  /></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.quantity}
                    onChange={(e) => handleCellChange(e, index, "quantity")}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.rate}
                    onChange={(e) => handleCellChange(e, index, "rate")}
                  />
                </td>
                <td>
                   <input
                    type="text"
                    className="form-control"
                    value={row.amount}
                  />
                  </td>
                  <td>
                  <select
                    className="form-control"
                    style={{ width: "4rem", padding: "0.2rem" }}
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
                    type="text"
                    className="form-control"
                    value={row.sgstamount}
                  />
                  </td>
                  <td>
                  <select
                    className="form-control"
                    style={{ width: "4rem", padding: "0.2rem" }}
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
                    type="text"
                    className="form-control"
                    value={row.cgstamount}
                  />
                  </td>
                  <td>
                  <select
                    className="form-control"
                    style={{ width: "4rem", padding: "0.2rem" }}
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
                    className="form-control"
                    value={row.igstamount}
                  />
                  </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.remark}
                    onChange={(e) => handleCellChange(e, index, "remark")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddRow}
          >
            Add Row
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={handleCollectData}
          >
            Submit Data
          </button>
        </div>
        
  {/* <table cellSpacing={0} border={0}>
          <colgroup width={94} />
          <colgroup width={124} />
          <colgroup span={8} width={94} />
          <tbody>
            <tr>
              <td
                colSpan={5}
                height={29}
                align="left"
                valign="middle"
              >
                <b>
            Other Terms &amp; Condition:
                </b>
              </td>
              <td
                colSpan={2}
                align="left"
                valign="middle"
              >
                <b>
                  <font color="#000000">Total Amount</font>
                </b>
              </td>
              <td    colSpan={6}
                align="right"
                valign="middle">
                <input className="form-control text-right" style={{fontWeight:"bold"}} value={grandTotal} />
              </td>
            </tr>
            <tr>
              <td
             
                colSpan={2}
                height={29}
                align="left"
                valign="middle"
              >
                Transportation
              </td>
              <td
              
                colSpan={2}
                align="left"
                valign="middle"
              >
                <font color="#000000">
                  <select className="form-control">
                    <option value={0.0}>Exclusive</option>
                    <option value="0.25">Inclusive</option>
                  </select>
                </font>
              </td>
              <td
              colSpan={1}
                align="left"
                valign="middle"
              >
                <font color="#000000">SGST</font>
              </td>
              <td
              colSpan={2}
                align="right"
                valign="middle"
              >
                <font color="#000000">
                  <select
                  style={{fontSize:"small", padding:"8px", paddingTop:"5px"}}
                    id="sgstPercent"
                    className="form-control"
                    onChange={(e) => setSgstPercentage(e.target.value)}
                  >
                    <option value="0">0%</option>
                    <option value="0.05">5%</option>
                    <option value="0.12">12%</option>
                    <option value="0.18">18%</option>
                    <option value="0.28">28%</option>
                  </select>
                </font>
              </td>
              <td
               
                align="right"
                valign="middle"
                colSpan={5}
                id="sgstAmt"
              >
                
                <h6>{grandTotal*sgstPercentage}</h6>
              </td>
            </tr>
            <tr>
              <td
                
                colSpan={2}
                height={29}
                align="left"
                valign="middle"
              >
                <font color="#000000">Loading</font>
              </td>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef"
                }}
                colSpan={2}
                align="left"
                valign="middle"
              >
                <font color="#000000">
                  <select className="form-control">
                    <option value={0.0}>Exclusive</option>
                    <option value="0.25">Inclusive</option>
                  </select>
                </font>
              </td>
              <td
              colSpan={1}
                
                align="left"
                valign="middle"
              >
                <font color="#000000">CGST</font>
              </td>
              <td
                 colSpan={2}
                align="right"
                valign="middle"
              >
                <font color="#000000">
                  <select
                  style={{fontSize:"small", padding:"8px", paddingTop:"5px"}}
                    id="cgstPercent"
                    className="form-control"
                    onChange={(e)=>setCgstPercentage(e.target.value)}
                  >
                    <option value={0.0}>0%</option>
                    <option value="0.25">2.5%</option>
                    <option value="0.06">6%</option>
                    <option value="0.09">9%</option>
                    <option value="0.14">14%</option>
                  </select>
                </font>
              </td>
              <td
                colSpan={5}
                align="right"
                valign="middle"
                id="cgstAmt"
              >
                <h6>{grandTotal*cgstPercentage}</h6>
              </td>
            </tr>
            <tr>
              <td
               
                colSpan={2}
                height={29}
                align="left"
                valign="middle"
              >
                <font color="#000000">Unloading</font>
              </td>
              <td
               
                colSpan={5}
                align="left"
                valign="middle"
              >
                <font color="#000000">
                  <select className="form-control">
                    <option value={0.0}>Exclusive</option>
                    <option value="0.25">Inclusive</option>
                  </select>
                </font>
              </td>
              <td
                align="left"
                valign="middle"
              >
                <font color="#000000">IGST</font>
              </td>
              <td
              
                align="right"
                valign="middle"
              >
                <font color="#000000">
                  <select
                   style={{fontSize:"small", padding:"8px", paddingTop:"5px"}}
                    id="igstPercent"
                    className="form-control"
                    onChange={()=>setIGST()}
                  >
                    <option value={0.0}>0%</option>
                    <option value="0.25">2.5%</option>
                    <option value="0.06">6%</option>
                    <option value="0.09">9%</option>
                    <option value="0.14">14%</option>
                  </select>
                </font>
              </td>
              <td
               
                align="right"
                valign="middle"
                id="igstAmt"
              >
                <font color="#000000">
                  <font />
                </font>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef",
                  borderRight: "1px solid #efefef"
                }}
                height={29}
                colSpan={2}
                align="left"
                valign="middle"
              >
                <font color="#000000">GST &amp; Other Govt Tax</font>
              </td>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef"
                }}
                colSpan={2}
                align="left"
                valign="middle"
              >
                <font color="#000000">Extra, If Applicable</font>
              </td>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderRight: "1px solid #efefef"
                }}
                colSpan={3}
                align="left"
                valign="middle"
              >
                <font color="#000000">
                  <br />
                </font>
              </td>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef",
                  borderRight: "1px solid #efefef"
                }}
                align="left"
                valign="middle"
              >
                <font color="#000000">Extra (If)</font>
              </td>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef",
                  borderRight: "1px solid #efefef"
                }}
                align="left"
                valign="middle"
                id="otherPercent"
              >
                <font color="#000000">
                  <br />
                </font>
              </td>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef",
                  borderRight: "1px solid #efefef"
                }}
                align="right"
                valign="middle"
                id="otherAmount"
              >
                <font color="#000000">
                  <input className="form-control" />
                </font>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef",
                  borderRight: "1px solid #efefef"
                }}
                colSpan={2}
                height={29}
                align="left"
                valign="middle"
              >
                <b>
                  <font color="#000000">Amount In Words</font>
                </b>
              </td>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef"
                }}
                colSpan={5}
                align="left"
                valign="middle"
              >
                <b>
                  <font color="#000000">
                    <input className="form-control" />
                  </font>
                </b>
              </td>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef",
                  borderRight: "1px solid #efefef"
                }}
                colSpan={2}
                align="left"
                valign="middle"
              >
                <b>
                  <font color="#000000">Total Landed Amount</font>
                </b>
              </td>
              <td
                style={{
                  borderTop: "1px solid #efefef",
                  borderBottom: "1px solid #efefef",
                  borderLeft: "1px solid #efefef",
                  borderRight: "1px solid #efefef"
                }}
                align="right"
                valign="middle"
                sdval="1054687.44"
                sdnum="1033;0;#,##0"
              >
                <font color="#000000">
                  <input id="totalLandedAmount" className="form-control" />
                </font>
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>

      <div>
      {
show &&
<div>
<table className="table">
<thead>
  <tr>
  <th>S.No.</th>
              <th>Material Description</th>
              <th>Make / Grade</th>
              <th>UOM</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Remark</th>
  </tr>
</thead>
<tbody>
  {tableData.map((row, index) => (
    <tr key={index}>
      <td>{row.sNo}</td>
       <td>
             <input 
         type="text"
         readOnly
         className="form-control"
         value={row.materialDescription}/>
        
      </td>
      <td>
        <input
          type="text"
          readOnly
          className="form-control"
          value={row.make_grade} />
      </td>
      <td>
        <input
          type="text"
          readOnly
          className="form-control"
          value={row.uom} />
      </td>
      <td>
        <input
          type="text"
          readOnly
          className="form-control"
          value={row.quantity}/>
          
      </td>
      <td>
        <input
          type="text"
          readOnly
          className="form-control"
          value={row.rate}/>
          
      </td>
      <td>
        <input
          type="text"
          readOnly
          className="form-control"
          value={row.amount}/>
          
      </td>
     
      <td>
        <input
          type="text"
          readOnly
          className="form-control"
          value={row.remark}
        />
      </td>
    </tr>
  ))}
</tbody>
</table>
      
  
</div>
}
</div>
    </div>
  );
};

export default EditableTable;
