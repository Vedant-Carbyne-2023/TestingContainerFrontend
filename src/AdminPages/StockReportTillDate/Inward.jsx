import React, { useEffect, useState } from "react";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import {
  userId,
  role,
  userName,
} from "../../CommonUtitlites/Others/commonExportVariable";
import { formatDate } from "../../CommonUtitlites/Others/formattingDateAndName";
import * as XLSX from "xlsx";

export default function Inward({ projectId, itemSelected,}) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      let result = api.post("/stock-inward-projectWise&itemWiseTillDate", {
        userId,
        role,
        userName,
        projectId: projectId,
        itemSelected: itemSelected,
        
      });
      result = await errorHandler(result);
      console.log(result.data);
      // alert(result.data.message)
      setData(result.data.data);
    };
    getData();
  }, [projectId, itemSelected]);

  const tableStyle = {
    border: "1px solid black",
    borderCollapse: "collapse",
    width: "100%",
  };
  const cellStyle = {
    border: "1px solid black",

    padding: "8px",
    textAlign: "center",
  };
  const totalMrnQuantity = data.reduce(
    (total, item) => total + parseInt(item.mrnQuantity),
    0
  );

  const downloadExcel = () => {
    const excelData = [
      ["S. No.", "MRN No.", "Quantity Received", "Material Rate", "Material Amount", "Vendor Name", "Date Inward"],
      ...data.map((item, index) => [
        index + 1,
        item.mrnsId,
        item.mrnQuantity,
        item.mrnRate,
        item.mrnAmount,
        item.vendorName,
        formatDate(new Date(item.createdAt))
      ]),
      ["", "", "", "", "", "Total:", totalMrnQuantity],
    ];

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inward Data");
    XLSX.writeFile(wb, "inward_data.xlsx");
  };

  return (
    <>
      <div className="container mt-4" style={{ maxWidth: "100%" }}>
        <div className="mt-2">
        <button onClick={downloadExcel} className="btn btn-primary mb-2">
            Download Excel
          </button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={cellStyle}>
                  S. No.
                </th>
                <th scope="col" style={cellStyle}>
                  MRN No.
                </th>
                {/* <th scope="col" style={cellStyle}>Material Description</th> */}
                {/* <th scope="col" style={cellStyle}>UOM</th> */}
                <th scope="col" style={cellStyle}>
                  Quantity Received
                </th>
                <th scope="col" style={cellStyle}>
                  Material Rate
                </th>
                <th scope="col" style={cellStyle}>
                  Material Amount
                </th>
                <th scope="col" style={cellStyle}>
                  Vendor Name
                </th>
                <th scope="col" style={cellStyle}>
                  Date Inward
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr key={item._id}>
                    <td scope="col" style={cellStyle}>
                      {index + 1}
                    </td>
                    <td scope="col" style={cellStyle}>
                      {item.mrnsId}
                    </td>
                    {/* <th scope="col" style={cellStyle}>{item.materialCategory}{"/"}{item.materialSubCategory}{"/"}{item.materialDescription}</th> */}
                    {/* <th scope="col" style={cellStyle}>{data.uom}</th> */}
                    <td scope="col" style={cellStyle}>
                      {item.mrnQuantity}
                    </td>
                    <td scope="col" style={cellStyle}>
                      {item.mrnRate}
                    </td>
                    <td scope="col" style={cellStyle}>
                      {item.mrnAmount}
                    </td>
                    <td scope="col" style={cellStyle}>
                      {item.vendorName}
                    </td>
                    <td scope="col" style={cellStyle}>
                      {formatDate(new Date(item.createdAt))}
                    </td>
                  </tr>
                ))}
              <tr>
                <td></td>
                <td></td>
                {/* <td></td> */}
                {/* <td></td> */}
                <th>Total:</th>

                <td>{totalMrnQuantity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
