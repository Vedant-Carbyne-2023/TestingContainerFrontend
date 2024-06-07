import React, { useState, useEffect } from "react";
import useGetVendors from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import CheckboxDropdownForVendors from "../MultipleItemSelectForQuotation/CheckboxDropdownForVendor";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import { userId, role,userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import Swal from "sweetalert2";
import { formatIndianNumber } from "../../../CommonUtitlites/Others/formattingDateAndName";



const ComparisionByQuotationIdApproval = (props) => {
  const totalVendors = useGetVendors();

  const [vendors, setVendors] = useState([]);

  const [prId, setPrId] = useState("");

  const [project, setProject] = useState({ projectId: "", projectName: "" });
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedVendorsIds, setSelectedVendorsIds] = useState([]);

  const [remarks, setRemarks] = useState("")
  const [comparisionId, setComparisionId] = useState("")

  const [tableData, setTableData] = useState([]);

 

  useEffect(() => {
    if (props) {
      setProject({
        projectName: props.projectName,
        projectId: props.projectId,
      });

      setData(props.data);
      setPrId(props.prId);
      setComparisionId(props.comparisionId)
      // Extract and set unique vendors whenever data changes
      if (props.data && props.data.length > 0) {
        const selectedVendors = totalVendors.filter((vendor) =>
        props.vendors.includes(vendor._id)
        );
        setVendors(selectedVendors);
        setSelectedVendors(selectedVendors)

        const items = props.data.map((item) => item.name);
        setSelectedItems(items);
      }
    }
  }, [props.data, props.projectName, props.projectId, props.prId, totalVendors]);


  useEffect(() => {
    // Function to update the tableData based on selected items and vendors
    const updateTableData = () => {
      const newTableData = selectedItems.map((item, index) => {
        const quotations = data.find((where) => where.name === item).quotations;

        const vendorsData = selectedVendors.map((vendor) => {
          const vendorQuote = quotations.find(
            (quote) => quote.vendorId === vendor._id
          );

          if (vendorQuote) {
            return { vendorName: vendor.vendorName, rate: vendorQuote.rate };
          } else {
            return { vendorName: vendor.vendorName, rate: 0 };
          }
        });

        return {
          sNo: index + 1,
          materialCategory: quotations[0].materialCategory,
          materialSubCategory: quotations[0].materialSubCategory,
          materialDescription: quotations[0].materialDescription,
          materialCode: quotations[0].materialCode,
          quantity: quotations[0].quantity, // Set default quantity as empty (can be updated later by user)
          uom: quotations[0].uom,
          vendors: vendorsData,
        };
      });

      setTableData(newTableData);
    };

    updateTableData();
  }, [selectedItems, selectedVendors, data]);





  const handleQuantityChange = (sNo, quantity) => {
    setTableData((prevData) =>
      prevData.map((row) => (row.sNo === sNo ? { ...row, quantity } : row))
    );
  };

  const calculateAmount = (rate, quantity) => {
    console.log(rate);
    const parsedRate = parseFloat(rate);
    const parsedQuantity = parseFloat(quantity);

    if (isNaN(parsedRate) || isNaN(parsedQuantity)) {
      return 0;
    }

    return parsedRate * parsedQuantity;
  };
  

  const calculateVendorTotal = (vendorIndex) => {
    let total = 0;
    tableData.forEach((row) => {
      if (row.vendors.length > vendorIndex) {
        // Check if the vendor index exists
        const vendorData = row.vendors[vendorIndex];
        const rate = parseFloat(vendorData.rate || 0);
        const quantity = parseFloat(row.quantity);
        total += calculateAmount(rate, quantity);
      }
    });
    return total;
  };
  // console.log(selectedVendors)
  //

  const getLowestAmountVendorNames = () => {
    const vendorTotals = selectedVendors.map((vendor, index) => {
      return {
        index,
        name: vendor.vendorName,
        total: calculateVendorTotal(index),
      };
    });

    // Sort vendors in ascending order based on the total amount
    vendorTotals.sort((a, b) => a.total - b.total);

    const lowestAmount = vendorTotals[0]?.total || 0;
    const vendorNamesInOrder = vendorTotals.map((vendor) => vendor.name);

    return { lowestAmount, vendorNamesInOrder };
  };

  const [toggle, setToggle] = useState(false);

  const handleOpenModal = (id) => {
    // props.setVendorId(id);
    setToggle(!toggle);
    props.toggle(toggle);
  };

  const handleApprove = async() =>{
    console.log(remarks)
    if(!remarks || remarks==""){
      Swal.fire({
        title:"You Have Not Give Any Remark. Please Provide Any Remark",
        timer:3000,
        icon:"warning"

      })
      return;
    }

      let result = api.post("/edit-comparision-by-id", {userId, role,userName, comparisionId, remarks, isApproved:true})
    result = await errorHandler(result)
    
    Swal.fire({
      timer:2000,
      titleText:result.data.message
    })
  }



  return (
    <div>
      <div>
        <div
          className="row mb-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="col-md-3">
            <label>Project</label>
            <input className="form-control" value={project.projectName} />
          </div>
          <div className="col-md-3">
            <label>Comparision Id</label>
            <input className="form-control" value={props.comparisionId} />
          </div>

          {/* <div className="col-md-3">
            <label>Select Vendor For Comparison</label>
            <CheckboxDropdownForVendors
              options={vendors}
              onChange={(selected) => handleSetVendors(selected)}
            />
          </div> */}
        </div>

        <table
          className="table"
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ verticalAlign: "middle" }}>S.No</th>
              <th style={{ verticalAlign: "middle" }}>Material Category</th>
              <th style={{ verticalAlign: "middle" }}>Material SubCategory</th>
              <th style={{ verticalAlign: "middle" }}>Material Description</th>
              <th style={{ verticalAlign: "middle" }}>Quantity</th>
              <th style={{ verticalAlign: "middle" }}>UOM</th>
              {selectedVendors.map((selected, vendorIndex) => (
                <React.Fragment key={vendorIndex}>
                  <th
                    colSpan={2}
                    style={{ verticalAlign: "middle", width: "150px" }}
                  >
                    <h6 className="text-center">{selected.vendorName}</h6>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <th colSpan={1}>Rate/UOM</th>
                      <th colSpan={1}>Amount</th>
                    </div>
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td style={{ verticalAlign: "middle" }}>{row.sNo}</td>
                <td style={{ verticalAlign: "middle" }}>
                  {row.materialCategory}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {row.materialSubCategory}
                </td>
                <td style={{ verticalAlign: "middle" }}>{row.materialCode}</td>
                <td style={{ verticalAlign: "middle" }}>
                  {/* Input field for quantity */}
                  <input
                    type="number"
                    className="form-control"
                    value={row.quantity}
                    readOnly
                    min={1}
                    onChange={(e) =>
                      handleQuantityChange(row.sNo, e.target.value)
                    }
                  />
                </td>
                <td style={{ verticalAlign: "middle" }}>{row.uom}</td>
                {row.vendors.map((vendor, vendorIndex) => (
                  <React.Fragment key={vendorIndex}>
                    <td
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      {vendor.rate} {/* Use the singular rate directly */}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {calculateAmount(
                        vendor.rate, // Use the singular rate directly
                        row.quantity
                      )}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={6} style={{ textAlign: "right" }}>
                <strong>Total</strong>
              </td>
              {selectedVendors.map((selected, vendorIndex) => (
                <td
                  colSpan={2}
                  key={vendorIndex}
                  style={{ textAlign: "right", paddingRight: "3rem" }}
                >
                  <strong>{formatIndianNumber(calculateVendorTotal(vendorIndex))}</strong>
                </td>
              ))}
            </tr>
            <tr>
              <td colSpan={6} style={{ textAlign: "right" }}>
                <strong>Lowest Amount</strong>
              </td>
              {selectedVendors.length !== 0 && (
                <td
                  colSpan={2}
                  style={{ textAlign: "right", paddingRight: "3rem" }}
                >
                  <strong>{formatIndianNumber(getLowestAmountVendorNames().lowestAmount)}</strong>
                </td>
              )}
            </tr>
            <tr>
              <td colSpan={6} style={{ textAlign: "right" }}>
                <strong>Vendor Names (Ascending Order)</strong>
              </td>
              {selectedVendors.length !== 0 && (
                <td
                  colSpan={2}
                  style={{ textAlign: "left", paddingLeft: "1rem" }}
                >
                  <strong>
                    {getLowestAmountVendorNames().vendorNamesInOrder.join(", ")}
                  </strong>
                </td>
              )}
            </tr>
            <tr>
              <td colSpan={6} style={{ textAlign: "right" }}>
                {/* <strong>Click To Create Purchase Order</strong> */}
              </td>
              {selectedVendors.length !== 0 && (
                <td
                  
                  style={{ textAlign: "left", paddingLeft: "1rem" }}
                >
                  {selectedVendors.map((vendor) => (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleOpenModal(vendor._id)}
                    >
                      {vendor.vendorName}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          </tfoot>
        </table>
        <div className="col d-flex">
                      <button className="btn" type="button" onClick={()=>handleApprove()}>Click To Approve</button>
                      <textarea className="form-control" onChange={(e)=>setRemarks(e.target.value)} value={remarks}>Add Remarks </textarea>
                      </div>
      </div>
    </div>
  );
};

export default ComparisionByQuotationIdApproval;
