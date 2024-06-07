import React, { useState } from "react";
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import { role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import Swal from 'sweetalert2';

const UpdateBoqFormForProject = ({data, onCloseModal}) => {

    const [formData, setFormData] = useState({
        boqFormId: data._id,
        serviceOrSupply: data.serviceOrSupply,
        totalQuantity: data.totalQuantity,
        projectId:data.projectId,
        productCode:data.productCode,
        userId:userId,
        role:role,
        userName:userName,

      });

  // console.log('in custom modal', data);
  // console.log('also', formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    // onUpdate(formData); // Call the onUpdate function with the updated data
    // Close the modal first
    onCloseModal();
    // console.log('tried submitting', formData);
    let result = api.post('/update-boqForm', formData);
    result = await errorHandler(result);
    if(result&&result.data && result.data.message){ 
        Swal.fire(result.data.message);
    }
    // console.log(result.data);
  };
  return (
    <div>
      <div className="container mt-4">
        <form className="form-grid" onSubmit={handleSubmit}>
          <h6 className="text-decoration-underline">BOQ Form Details</h6>
          <div className="form-group">
          <label htmlFor="totalQuantity">Product Code:</label>
            <input
              type="text"
              name="productCode"
              id="productCode"
              className="form-control"
              disabled
              value={formData.productCode}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
          <label htmlFor="serviceOrSupply">Service/Supply:</label>
           <select
           className="form-control"
               name="serviceOrSupply"
               id="serviceOrSupply"
               value={formData.serviceOrSupply}
               onChange={handleChange}
           >
                <option value="Service">Service</option>
                <option value="Supply">Supply</option>
           </select>
          </div>
     
          <div className="form-group">
          <label htmlFor="totalQuantity">Total Quantity:</label>
            <input
              type="number"
              className="form-control"
              min={0}
              name="totalQuantity"
              id="totalQuantity"
              value={formData.totalQuantity}
              onChange={handleChange}
            />
          </div>
       
          <button className="btn" type="submit">Update</button>
        </form>
      </div>

    </div>
  );
};

export default UpdateBoqFormForProject;
