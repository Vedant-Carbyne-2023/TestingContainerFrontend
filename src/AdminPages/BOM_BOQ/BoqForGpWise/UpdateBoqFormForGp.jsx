import React, { useState } from "react";
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import { role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import Swal from 'sweetalert2';

const UpdateBoqFormForGp = ({data, setStatus}) => {

  const [submit, setSubmit] = useState(false)

    const [formData, setFormData] = useState({
        boqFormId: data._id,
        serviceOrSupply: data.serviceOrSupply,
        quantity: data.quantity,
        gpId:data.gpId,
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
    // console.log('tried submitting', formData);
    // let result = api.post('/update-boqForm-gpWise', formData);
    // result = await errorHandler(result);
    // if(result && result.data && result.data.message){
    //   console.log('in',result.data.code);
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Success',
    //     text: result.data.message,
    //   });
    // }
    // console.log('out',result);
    try {
      // Call the API to update BOQ Form GP Wise
      let result = api.post('/update-boqForm-gpWise', formData);
      result = await errorHandler(result);
      // console.log('tried',result);
      if (result && result.data && result.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: result.data.message,
        });
        setSubmit(!submit)
        // console.log(submit)
        setStatus(submit)
      }
    } catch (error) {
      // console.log('got error', error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'An error occurred';
        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
       
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred',
        });
      }
    }
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
          <label htmlFor="totalQuantity">Total Quantity:</label>
            <input
              type="number"
              className="form-control"
              min={0}
              name="quantity"
              id="totalQuantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
       
          <button className="btn" type="submit">Update</button>
        </form>
      </div>

    </div>
  );
};

export default UpdateBoqFormForGp;
