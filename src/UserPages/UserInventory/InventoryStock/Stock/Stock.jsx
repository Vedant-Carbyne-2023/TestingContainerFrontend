import React, { useEffect, useState } from "react";
import {
  role,
  userId,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import SearchInput from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import useGetUserProject from "../../../../CommonUtitlites/customHooks/useGetUserProject";
import useGetAllInventoryProducts from "../../../../CommonUtitlites/customHooks/useInventoryProducts";
import Loader from "../../../../CommonUtitlites/Loader/Loader";
import useInventoryProjectWise from "../../../../CommonUtitlites/customHooks/useInventoryProjectWise";
import CustomModal from "../../../../CommonUtitlites/ModalPopUp/CustomModal";

export default function Stock({projectId, status}) {

const {products,loading} = useInventoryProjectWise(projectId, status);


// console.log('check: ',products,loading);

const calculateWaste = (item)=>{
  let totalWastedUnits = item.wastedQty?item.wastedQty.wastedEntries.reduce((total, entry) => total + entry.units, 0):0;
  return totalWastedUnits?totalWastedUnits:0
}
const [showModal, setShowModal] = useState(false); // State to control modal visibility


// console.log('check: ',products,loading);

const [wasteItem, setWasteItem] = useState([])

const handleWasteInventory = (item) =>{
  console.log(item)
  setWasteItem(item.wastedQty)
  setShowModal(true)
}
console.log(wasteItem)

  return (

    <div className="container p-0 mt-3">

    
    { loading?<Loader/>:<div className="table-responsive">
    <table className="table table-bordered table-hover ">
  <thead className="table table-bordered table-hover "style={{ backgroundColor: "#cedfe5" }}>
    <tr>
      <th style={{ borderColor: "black" }}>Items Category</th>
      <th style={{ borderColor: "black" }}>Items SubCategory</th>
      <th style={{ borderColor: "black" }}>Items Description</th>
      <th style={{ borderColor: "black" }}>Balance Inventory</th>
      <th style={{ borderColor: "black" }}>Wasted Inventory</th>
      <th style={{ borderColor: "black" }}>Consumed Inventory</th>
      <th style={{ borderColor: "black" }}>Disputed Inventory</th>
      
      {/* <th>Unit Of Measurement</th> */}
      {/* <th>Return To Store Quantity</th> */}
    </tr>
  </thead>
  <tbody className="scrollable-tbody">
    {products &&
      products.map((item, key) => {
        if (item.units !== 0) {
          return (
            <tr key={key}>
              <td style={{ borderColor: "black" }}>{item.materialCategory}</td>
              <td style={{ borderColor: "black" }}>{item.materialSubCategory}</td>
              <td style={{ borderColor: "black" }}>{item.materialDescription}</td>
              <td style={{ borderColor: "black" }}>{item.units}</td>
              <td style={{ borderColor: "black" }}>{item.wastedQty}</td>
                    <td style={{ borderColor: "black" }}>{item.consumedQty}</td>
                    <td style={{ borderColor: "black" }}>{item.disruptedQty}</td>
              {/* <td>{item.uom}</td> */}
              {/* <td>{item.materialCode}</td> */}
            </tr>
          );
        }
        return null;
      })}
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
