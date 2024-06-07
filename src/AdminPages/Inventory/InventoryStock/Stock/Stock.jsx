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
import CustomModal from "../../../../CommonUtitlites/ModalPopUp/CustomModal";
import { format } from "date-fns";

export default function Stock({ projectId, status }) {

  const { products, loading } = useInventoryProjectWise(projectId, status);
console.log(products)

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, "inventory_data.xlsx");
  };

  const [showModal, setShowModal] = useState(false); // State to control modal visibility


  return (

    <div className="container p-0 mt-3">


      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={handleDownloadExcel}>Download Excel</button>
      </div>

      {loading ? <Loader /> : <div className="table-responsive">
        <table className="table">
          <thead className="sticky-thead">
            <tr>
              <th>Items Category</th>
              <th>Items SubCategory</th>
              <th>Items Description</th>
              <th> Balance Inventory </th>
              <th> Wasted Inventory </th>
              <th> Consumed Quantity </th>
              <th> Disputed Quantity </th>
              {/* <th> Unit Of Measurement</th> */}
              {/* <th> Return To Store Quantity</th> */}
            </tr>
          </thead>
          <tbody className="scrollable-tbody">
            {products &&
              products.map((item, key) => {
                if (item.units !== 0) {
                  return (<tr key={key}>
                    <td>{item.materialCategory}</td>
                    <td>{item.materialSubCategory}</td>
                    <td>{item.materialDescription}</td>
                    <td>{item.units}</td>
                    <td>{item.wastedQty}</td>
                    <td>{item.consumedQty}</td>
                    <td>{item.disruptedQty}</td>
                    {/* <td>{item.uom}</td> */}
                    {/* <td>{item.materialCode}</td> */}
                  </tr>)
                }
              }
              )

            }
          </tbody>
        </table>
      </div>
      }
      {showModal &&  (
        <CustomModal
        title={"Wasted Units"}
          isOpen={showModal}
          onClose={()=>setShowModal(false)}>
         
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Units Wasted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wasteItem.length>0 &&
                      wasteItem.wastedEntries &&
                      wasteItem.wastedEntries.map((waste, index) => (
                        <tr key={index}>
                          <td>{format(new Date(waste.date), "MMMM dd, yyyy")}</td>
                          <td>{waste.units}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
          </CustomModal>
        
      )}
    </div>
  );
}
