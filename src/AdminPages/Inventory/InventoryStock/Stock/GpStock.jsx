import React, { useEffect, useState } from "react";
import {
  role,
  userId,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import SearchInput from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import useGetUserProject from "../../../../CommonUtitlites/customHooks/useGetUserProject";
import useGetAllInventoryProducts from "../../../../CommonUtitlites/customHooks/useInventoryProducts";
import Loader from "../../../../CommonUtitlites/Loader/Loader";
import useInventoryProjectWise from "../../../../CommonUtitlites/customHooks/useInventoryProjectWise";
import * as XLSX from 'xlsx'; 

export default function GpWiseStock({ projectId, status }) {
  const [loading, setLoading] = useState(false);
  const [gps, setGps] = useState([]);
  const [selectedGp, setSelectedGp] = useState({});
  const [products, setProducts] = useState([]);

  const handleDownloadExcel = () => {
    // Filter products based on selected GP
    const filteredProducts = products.filter(item => item.gpId === selectedGp.id);

    const ws = XLSX.utils.json_to_sheet(filteredProducts); // Convert data to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Inventory"); // Add worksheet to workbook
    XLSX.writeFile(wb, "inventory_data.xlsx"); // Save workbook as Excel file
  };

  useEffect(() => {
    const getProject = async () => {
      if (projectId !== "false" && projectId !== 'Select Project') {
        let result = api.post(`/single-project?id=${projectId}`, { userId, role, userName, projectId });
        result = await errorHandler(result);
        setGps(result.data.data.project.gpName);
      }
    };

    if (projectId && projectId !== 'false' && projectId !== 'Select Project') {
      getProject();
    } else if (projectId === 'Select Project') {
      setGps([]);
      setSelectedGp({});
      setProducts([]);
    }
  }, [projectId]);

  const handleGetInventoryForGP = async (data) => {
    setLoading(true);
    setProducts([]);
    let result = api.post('/get-all-items', { userId, role, userName, projectId, gpId: data.id });
    result = await errorHandler(result);
    setProducts(result.data.data);  
    setLoading(false);
  };

  return (
    <div className="container p-0 mt-3">
      <div className="container">
        {gps.length > 0 &&
          <SearchInput
            id={"gp"}
            items={gps}
            placeholder={"Select Gp"}
            ResultOnClick={(data) => {
              setSelectedGp(data);
              handleGetInventoryForGP(data);
            }}
          />
        }
      </div>

      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={handleDownloadExcel}>Download Excel</button>
      </div>

      {loading ? <Loader /> :
        <div className="table-responsive mt-4">
          <table className="table">
            <thead className="sticky-thead">
              <tr>
                <th>Items Category</th>
                <th>Items SubCategory</th>
                <th>Items Description</th>
                <th> Boq Inventory </th>
                <th> Recieved Inventory </th>
              <th> Wasted Quantity </th>
              <th> Consumed Quantity </th>
              <th> Disputed Quantity </th>
              <th> Remaining Quantity </th>
              </tr>
            </thead>
            <tbody className="scrollable-tbody">
              {products &&
                products.map((item, key) => {
                  if (item.boqQty !== 0) {
                    return (
                      <tr key={key}>
                        <td>{item.materialCategory}</td>
                        <td>{item.materialSubCategory}</td>
                        <td>{item.materialDescription}</td>
                        <td>{item.boqQty}</td>
                        <td>{item.quantity}</td>
                        <td>{item.wastedQuantity}</td>
                        <td>{item.consumedQuantity}</td>
                        <td>{item.disruptedQuantity}</td>
                        <td>{item.quantity - item.disruptedQuantity - item.consumedQuantity -item.wastedQuantity}</td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

