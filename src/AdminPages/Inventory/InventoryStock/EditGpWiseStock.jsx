import React, { useEffect, useState } from "react";
import {
  role,
  userId,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import SearchInput from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import useGetUserProject from "../../../CommonUtitlites/customHooks/useGetUserProject";
import useGetAllInventoryProducts from "../../../CommonUtitlites/customHooks/useInventoryProducts";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import useInventoryProjectWise from "../../../CommonUtitlites/customHooks/useInventoryProjectWise";
import * as XLSX from 'xlsx'; 
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import ConsumedOrDisruptedInventory from "./ConsumedOrDisruptedInventory";

export default function EditGpWiseStock() {
  const [loading, setLoading] = useState(false);
  const [gps, setGps] = useState([]);
  const [selectedGp, setSelectedGp] = useState({});
  const [products, setProducts] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [toggle, setToggle] = useState('')

 

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
  }, [projectId,toggle]);
  // useEffect(() => {
  //   let getResult = async()=>
  //   {let result = api.post('/get-all-inventories-by-gp-including-consumed-disrupted', { userId, role, userName, projectId, gpId: data.id });
  //   result = await errorHandler(result);
  // console.log(
  //   result
  // )
  // }
  //   getResult()
  // }, [])
  

  const handleGetInventoryForGP = async (data) => {
    setLoading(true);
    setProducts([]);
    let result = api.post('/get-all-inventories-by-gp-including-consumed-disrupted', { userId, role, userName, projectId, gpId: data.id });
    result = await errorHandler(result);
    console.log(result)
    setProducts(result.data.data);  
    setLoading(false);
  };

  let projects = useGetAllProjectsForAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [item, setItem] = useState('')

  const handleQuantity = (item) =>{
    setItem(item)
    setIsModalOpen(true)

  }

  const handleDownloadExcel = () => {
    // Iterate over products and calculate remaining quantity for each item
    const productsWithRemainingQty = products.map(item => ({
      ...item,
      remainingQuantity: item.quantity - item.consumedQuantity - item.disruptedQuantity
    }));
  
    // Convert products with added remaining quantity to worksheet
    const ws = XLSX.utils.json_to_sheet(productsWithRemainingQty);
  
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Add worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Inventory Data");
  
    // Generate and download the Excel file
    XLSX.writeFile(wb, 'inventory_data.xlsx');
  };
  

  return (
    <div className="container p-0 mt-3">
      <div className="container">

      <label>Select Project</label>
        <select
          placeholder="Please Select Project First"
          id="projectName"
          className="form-control mb-3"
          onChange ={(e)=>setProjectId(e.target.value)}
        >
          <option className="form-control">Select Project</option>
      {
        projects && projects.map(project => 
          <option value={project.id} className="form-control">{project.name}</option>
          )
      }
        </select>


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
                <th>Received Quantity</th>
                <th>Wasted Quantity</th>
                <th>Consumed Quantity</th>
                <th>Disputed Quantity</th>
                <th>Remaining At Gp Quantity</th>
                <th>Add Consumed Or Wasted Or Disrupted Quantity</th>
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
                        <td>{item.quantity}</td>
                        <td>{item.wastedQuantity}</td>
                        <td>{item.consumedQuantity}</td>
                        <td>{item.disruptedQuantity}</td>
                        <td>{item.quantity-item.consumedQuantity-item.disruptedQuantity-item.wastedQuantity}</td>
                        <td><button className="btn" onClick={()=>handleQuantity(item)}>Add Consumed Or Wasted Or Disrupted Quantity</button></td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      }

<CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size={"large"}
          title={"Add Consumed Or Wasted Or Disrupted Quantity"}
        >
         <ConsumedOrDisruptedInventory setData={(data)=>setToggle(data)} item={item} projectId={projectId} projectName={projects.filter(project=>project.id==projectId)[0]} gpId={selectedGp.id} gpName={selectedGp.name}/>
        </CustomModal>
    </div>
  );
}

