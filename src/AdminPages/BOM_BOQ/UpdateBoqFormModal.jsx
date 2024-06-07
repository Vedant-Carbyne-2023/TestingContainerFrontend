import React, { useState } from "react";
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import Swal from 'sweetalert2';
import {
  userId,
  role,
  userName
} from  "../../CommonUtitlites/Others/commonExportVariable";

const UpdateBoqFormModal = ({data}) => {
    const [formData, setFormData] = useState({
        boqFormId: data._id,
        serviceOrSupply: data.serviceOrSupply,
        // sorRate: data.sorRate,
        totalQuantity: data.totalQuantity,
        userId: userId,
        role: role,
        userName: userName,
        // totalAmount: data.totalAmount,
        // totalAmountLess20: data.totalAmountLess20,
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
    // console.log('tried submitting', formData);
    let result = api.post('/update-boqForm', formData);
    result = await errorHandler(result);
    if(result.data && result.data.message){
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: result.data.message,
      });
      // alert(result.data.message);
    } 
    // console.log(result.data);
  };
  return (
    <div>
      <div className="container mt-4">
        <form className="form-grid" onSubmit={handleSubmit}>
          <h6 className="text-decoration-underline">BOQ Form Details</h6>
          <div className="form-group">
          <label htmlFor="serviceOrSupply">Service/Supply:</label>
           <select
               name="serviceOrSupply"
               id="serviceOrSupply"
               value={formData.serviceOrSupply}
               onChange={handleChange}
           >
                <option value="Service">Service</option>
                <option value="Supply">Supply</option>
           </select>
          </div>
          {/* <div className="form-group">
          <label htmlFor="sorRate">SOR Rate:</label>
            <input
              type="number"
              name="sorRate"
              id="sorRate"
              value={formData.sorRate}
              onChange={handleChange}
            />
          </div> */}
          <div className="form-group">
          <label htmlFor="totalQuantity">Total Quantity:</label>
            <input
              type="number"
              name="totalQuantity"
              id="totalQuantity"
              value={formData.totalQuantity}
              onChange={handleChange}
            />
          </div>
          {/* <div className="form-group">
          <label htmlFor="totalAmount">Total Amount:</label>
            <input
              type="number"
              name="totalAmount"
              id="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
            />
          </div> */}
          {/* <div className="form-group">
          <label htmlFor="totalAmountLess20">Total Amount Less 20:</label>
            <input
              type="number"
              name="totalAmountLess20"
              id="totalAmountLess20"
              value={formData.totalAmountLess20}
              onChange={handleChange}
            />
          </div> */}
          {/* ... other fields */}
          <button className="btn" type="submit">Update</button>
        </form>
      </div>

    </div>
  );
};

export default UpdateBoqFormModal;
