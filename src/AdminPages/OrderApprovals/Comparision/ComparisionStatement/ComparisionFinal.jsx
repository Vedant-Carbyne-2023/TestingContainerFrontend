import React, { useState, useEffect } from "react";
import useGetAllProjectsForAdmin from "../../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import {
  userId,
  role,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import SearchInputPostgres from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue";
import CheckboxDropdown from "../MultipleItemSelectForQuotation/CheckboxDropdown";
import useGetVendors from "../../../../CommonUtitlites/customHooks/useGetAllVendors";
import CheckboxDropdownForVendors from "../MultipleItemSelectForQuotation/CheckboxDropdownForVendor";
import { formatIndianNumber } from "../../../../CommonUtitlites/Others/formattingDateAndName";

const EditableTableForQuotationFinal = () => {
  const projects = useGetAllProjectsForAdmin();
  const vendors = useGetVendors();

  const [project, setProject] = useState("");
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [selectedVendorsIds, setSelectedVendorsIds] = useState([]);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch data for selected project and set it in the 'data' state
    const handleResponse = async () => {
      let result = api.post("/get-quotations", {
        projectId: project.id,
        userId,
        role,
        userName,
      });
      result = await errorHandler(result);
      setData(result.data.data);
    };

    if (project.id) {
      handleResponse();
    }
  }, [project]);

  useEffect(() => {
    // Function to update the tableData based on selected items and vendors
    const updateTableData = () => {
      const newTableData = selectedItems.map((item, index) => {
        const quotations = data.find((where) => where.name === item).quotations;

        const vendorsData = selectedVendors.map((vendor) => {
          const vendorQuotes = quotations.filter((quote) => quote.vendorId === vendor._id);

          if (vendorQuotes.length > 0) {
            return { vendorName: vendor.vendorName, rates: vendorQuotes.map((quote) => quote.rate) };
          } else {
            return { vendorName: vendor.vendorName, rates: [0] };
          }
        });

        return {
          sNo: index + 1,
          materialCategory: quotations[0].materialCategory,
          materialSubCategory: quotations[0].materialSubCategory,
          materialDescription: quotations[0].materialDescription,
          materialCode: quotations[0].materialCode,
          quantity: "", // Set default quantity as empty (can be updated later by user)
          uom: quotations[0].uom,
          vendors: vendorsData,
        };
      });

      setTableData(newTableData);
    };

    updateTableData();
  }, [selectedItems, selectedVendors, data]);

  const handleSetVendors = (vendorsId) => {
    setSelectedVendorsIds(vendorsId);
    const arrayData = vendors.filter((vendor) => vendorsId.includes(vendor._id));
    setSelectedVendors(arrayData);
  };

  const handleQuantityChange = (sNo, quantity) => {
    setTableData((prevData) =>
      prevData.map((row) => (row.sNo === sNo ? { ...row, quantity } : row))
    );
  };

  const calculateAmount = (rate, quantity) => {
    console.log(rate)
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
     if(row.vendors.length>0){
      console.log(row.vendors)
      const vendorData = row.vendors[vendorIndex];
      let selectedRate = ""
      if(vendorData!=undefined){
        selectedRate = parseFloat(vendorData.selectedRate?vendorData.selectedRate:0 || vendorData.rates[0]);
      }
      else{
        selectedRate=parseFloat(0);
      }
      const quantity = parseFloat(row.quantity);
      total += calculateAmount(selectedRate, quantity);}
       else{
        return 0;
       }
    });
    return total;
  };


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



  return (
    <div>
      <div>
        <div className="row mb-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="col-md-3">
            <SearchInputPostgres
              title={"Project"}
              placeholder={"Select Project"}
              items={projects}
              ResultOnClick={(data) => setProject(data)}
            />
          </div>
          <div className="col-md-3">
            <label>Select Item For Comparison</label>
            <CheckboxDropdown options={data} onChange={(selected) => setSelectedItems(selected)} />
          </div>
          <div className="col-md-3">
            <label>Select Vendor For Comparison</label>
            <CheckboxDropdownForVendors options={vendors} onChange={(selected) => handleSetVendors(selected)} />
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th style={{ verticalAlign: "middle", width: "5px" }}>S.No</th>
              <th style={{ verticalAlign: "middle", width: "50px" }}>Material Category</th>
              <th style={{ verticalAlign: "middle", width: "50px" }}>Material SubCategory</th>
              <th style={{ verticalAlign: "middle", width: "50px" }}>Material Description</th>
              <th style={{ verticalAlign: "middle", width: "150px" }}>Quantity</th>
              <th style={{ verticalAlign: "middle", width: "50px" }}>UOM</th>
              {selectedVendors.map((selected, vendorIndex) => (
                <React.Fragment key={vendorIndex}>
                  <th colSpan={2} style={{ verticalAlign: "middle", width: "150px" }}>
                    <h6 className="text-center">{selected.vendorName}</h6>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                      <th colSpan={1}>Rate/UOM</th>
                      <th  colSpan={1}>Amount</th>
                    </div>
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
  {tableData.map((row, index) => (
    <tr key={index}>
      <td  style={{verticalAlign:"middle"}}>{row.sNo}</td>
      <td  style={{verticalAlign:"middle"}}>{row.materialCategory}</td>
      <td  style={{verticalAlign:"middle"}}>{row.materialSubCategory}</td>
      <td  style={{verticalAlign:"middle"}}>{row.materialCode}</td>
      <td  style={{verticalAlign:"middle"}}>
        {/* Input field for quantity */}
        <input
          type="number"
          className="form-control"
          value={row.quantity}
          min={1}
          onChange={(e) => handleQuantityChange(row.sNo, e.target.value)}
        />
      </td>
      <td  style={{verticalAlign:"middle"}}>{row.uom}</td>
      {row.vendors.map((vendor, vendorIndex) => (
        <React.Fragment key={vendorIndex}>
          <td
          style={{verticalAlign:"middle", textAlign:'center'}}>
            <select
              className="form-control"
              id={`selectedRow-${vendorIndex}`}
              onChange={(e) =>
                setTableData((prevData) =>
                  prevData.map((prevRow, prevRowIndex) =>
                    prevRowIndex === index
                      ? {
                          ...prevRow,
                          vendors: prevRow.vendors.map((prevVendor, prevVendorIndex) =>
                            prevVendorIndex === vendorIndex
                              ? { ...prevVendor, selectedRate: e.target.value }
                              : prevVendor
                          ),
                        }
                      : prevRow
                  )
                )
              }
            >
              {vendor.rates.map((rate, rateIndex) => (
                <option key={rateIndex} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </td>
          <td style={{verticalAlign:"middle"}}>
            {formatIndianNumber(calculateAmount(
              vendor.selectedRate || vendor.rates[0], // Use the selected rate if available, otherwise use the first rate
              row.quantity
            ))}
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
                <td colSpan={2} key={vendorIndex} style={{ textAlign: "right", paddingRight:"3rem" }}>
                  <strong>{formatIndianNumber(calculateVendorTotal(vendorIndex))}</strong>
                </td>
              ))}
            </tr>
            <tr>
          <td colSpan={6} style={{ textAlign: "right" }}>
            <strong>Lowest Amount</strong>
          </td>
          <td colSpan={2} style={{ textAlign: "right", paddingRight: "3rem" }}>
            <strong>{formatIndianNumber(getLowestAmountVendorNames().lowestAmount)}</strong>
          </td>
        </tr>
        <tr>
          <td colSpan={6} style={{ textAlign: "right" }}>
            <strong>Vendor Names (Ascending Order)</strong>
          </td>
          <td colSpan={2} style={{ textAlign: "left", paddingLeft: "1rem" }}>
            <strong>{getLowestAmountVendorNames().vendorNamesInOrder.join(", ")}</strong>
          </td>
        </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default EditableTableForQuotationFinal;
