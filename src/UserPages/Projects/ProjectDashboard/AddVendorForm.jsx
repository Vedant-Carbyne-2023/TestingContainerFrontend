import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetAllVendorsInDatabase from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import {userId, role} from '../../../CommonUtitlites/Others/commonExportVariable'
import styles from '../Projects/AddMemberInProject/CheckboxDropdown.module.css'

export default function AddVendorForm({ id, assigedVendor, setStatus }) {
  let vendors = useGetAllVendorsInDatabase();
  console.log('all vendors', vendors);
 
 const [submit, setSubmit] = useState(false)

  const [selectedVendors, setSelectedVendors] = useState(
    assigedVendor ? assigedVendor : []
  );
  console.log('first', selectedVendors);
  const handleVendorSelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedVendors((prevSelectedVendors) => [
        ...prevSelectedVendors,
        value,
      ]);
    } else {
      setSelectedVendors((prevSelectedVendors) =>
        prevSelectedVendors.filter((vendorId) => vendorId !== value)
      );
    }
  };

  const handleAddVendors = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectId = formData.get("projectId");
    try {
        console.log('calling the api', selectedVendors, projectId, userId, role);
      let result = await api.patch("/add-vendors", {
        newVendors: selectedVendors,
        id: projectId,
        userId,
        role,
      });
  
      result = await errorHandler(result);
      if(result&&result.data){
        alert(result.data.message);
      }
      setStatus(!submit);
      setSubmit(!submit);
    } catch (error) {
      // Handle error and display error message to user
      alert("An error occurred while adding contractors.");
      console.error(error);
    }
    
  };

  return (
    <div>
      <form onSubmit={handleAddVendors}>
        {" "}
        <div className="m-3 p-2">
          <div>
            {vendors.map((vendor) => (
              

<label key={vendor._id} className={styles.dropdownItem}>
<div className='row'>
                <div className='col-md-5'>
              {vendor.vendorName}
              </div>
              <div className='col-md-5'>
              {vendor.category}
              </div>
              <div className='col-md-2'>
              <input
               type="checkbox"
               id={vendor._id}
               value={vendor._id}
               checked={selectedVendors.includes(vendor._id)}
               onChange={handleVendorSelection}
               style={{ marginRight: "8px" }}
              />
              </div>
              </div>



            </label>
            ))}
          </div>
        </div>
        <input name="projectId" id="projectId" type="hidden" value={id} />
        <button
          type="submit"
          className="btn btn-secondary"
          style={{ display: "flex", margin: "0 auto" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
