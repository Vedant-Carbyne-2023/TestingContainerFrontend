import React, { useState, useEffect, useRef } from "react";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import ShowMachines from "./ShowMachines";
import useCategoryData from "../../CommonUtitlites/customHooks/useGetCategory";
import useGetProductDatabase from "../../CommonUtitlites/customHooks/useGetProductsDatabase";
import useSubCategoryData from "../../CommonUtitlites/customHooks/useGetSubCategory";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import { role, userId, userName} from "../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import Loader from "../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';
import useGetAllUom from "../../CommonUtitlites/customHooks/useGetAllUom";
import AddUom from "./AddUom";
import useGetMachineDatabase from "../../CommonUtitlites/customHooks/useGetMachineDatabase";

const MachineDatabase = () => {
  const [status, setStatus] = useState("");
const [loading, setLoading] = useState(false)
let {machines } = useGetMachineDatabase(status)

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);
  const [modalOpen5, setModalOpen5] = useState(false);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    const formData = new FormData(e.target);
    let machineName = formData.get("machineName");
    let machineCode = formData.get("machineCode");
    let categoryName = formData.get("categoryName");

    // console.log(categorySearchTermId, subcategorySearchTermId);
    let result = api.post("/create-update-machineDatabase", {
      machineCode,machineName, categoryName,
      userId,
      role,
      userName,
    });

    result = await errorHandler(result);
    setStatus(result.data.data._id);
    Swal.fire(result.data.message);
    // alert(result.data.message);
  };

  const handleDeleteMachine = async (categoryId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this Category?");
    if (!confirmDelete) {
      // If the user cancels the deletion, do nothing
      return;
    }
  
    let tempdata = {};
    tempdata.categoryId = categoryId;
    tempdata.userId = userId;
    tempdata.role = role;
    tempdata.userName = userName;
    let result = await api.post('/delete-category', tempdata);
    result = await errorHandler(result);
    // setStatus(result.data.data._id);
    // console.log(result);
    Swal.fire(result.data.message);
    // alert(result.data.message);
    // console.log('want to delete this category', categoryId);
    // console.log(" Delete this category", tempdata);
  };
   
  
  return (
    <>
      <div className="title">
        <span>Machine Database</span>
        <button
          className="btn btn-sm d-flex mx-auto my-2"
          onClick={() => setModalOpen(true)}
        >
          Add Machines
        </button>
{/* 
{
  role === 'SuperUser'

  &&
  <>
        <button
        className="btn btn-sm d-flex mx-auto my-2"
        onClick={() => setModalOpen2(true)}
        >
          Delete Machine
        </button>
      
        </>
        } */}
      </div>
      <div className="container px-5 mx-4">
        <CustomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={"Add Machine"}
        >
          <div className="container">
           
            
               <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="machineCode">Machine Code</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Enter Machine Code"
                  id="machineCode"
                  name="machineCode"
                />
              
              </div>
              <div className="form-group">
                <label htmlFor="machineName">Machine Name</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Enter Machine Name"
                  id="machineName"
                  name="machineName"
                />
              
              </div>
              <div className="form-group">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Enter Category Name"
                  id="categoryName"
                  name="categoryName"
                />
                </div>

              <div class="d-grid gap-2">
                <button
                  type="submit"
                  className="btn  btn-primary  mt-4"
                  style={{
                    borderRadius: "2rem",
                    margin: "0 auto",
                    display: "flex",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>




          </div>
        </CustomModal>
        {/* <CustomModal
        isOpen={modalOpen3}
        onClose={() => setModalOpen3(false)}
        title={"Delete Category"}
        >
          <div className="container">
          {categories.map((category) => (
              <div key={category._id} className="d-flex align-items-center mb-2">
              <p className="me-2">{category.name}</p>
              <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteCategory(category._id)}>Delete</button>
              </div>
           ))}
          </div>
        </CustomModal> */}

       
      </div>
      {loading?<Loader/>:(
      <div>
      <ShowMachines data={machines ? machines : []} setStatus={(status)=>setStatus(status)} />
      </div>
      )}
    </>
  );
};

export default MachineDatabase;
