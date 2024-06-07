import React, { useState } from 'react';
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import {
  role,
  userId,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import Swal from "sweetalert2";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import SearchInputVendor from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";
import useGetVendors from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import styles from './consumedOrDisruptedInventory.module.css';


const ConsumedOrDisruptedInventory = ({ projectId, projectName, gpId, gpName, item, setData }) => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    projectName: projectName.name,
    projectId: projectId,
    gpName: gpName,
    gpId: gpId,
    materialCategory: item.materialCategory,
    materialSubCategory: item.materialSubCategory,
    materialDescription: item.materialDescription,
    uom: item.uom,
    quantity: item.quantity - item.consumedQuantity - item.disruptedQuantity - item.wastedQuantity,
    units: '', // Units for the consumption entry
    userId: userId,
    userName: userName,
    vendorId: '',
    remarks: '',
    vendorName: ''
  });

  let vendors = useGetVendors()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [quantityType, setQuantityType] = useState('consumed'); // Default to 'consumed'

  const handleQuantityTypeChange = (e) => {
    setQuantityType(e.target.value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // Set loading state to true when form is submitted

  try {
    // Handle form submission here, e.g., submit data to API
    console.log(formData);

    let result;
    if (quantityType === 'consumed') {
      result = await api.post('/create-consumed-item', formData);
    } else if(quantityType === 'wasted') {
      console.log(formData)
      // return
      result = await api.post('/create-wasted-item', formData);
    }
     else {
      result = await api.post('/create-disrupted-item', formData);
    }

    // Handle API response
    result = await errorHandler(result);

    setData(Date.now());

    // Reset form data after successful submission
    setFormData({
      units: '',
      vendorId: '',
      remarks: '',
      vendorName: ''
    });

    Swal.fire({
      icon: 'success',
      title: result.data.message,
      timer: 4000
    });
  } catch (error) {
    // Handle API call error
    console.error('Error submitting form:', error);

    Swal.fire({
      icon: 'error',
      title: 'Submission Failed',
      text: 'An error occurred while submitting the form. Please try again later.',
      timer: 4000
    });
  } finally {
    // Set loading state back to false after API call is completed or failed
    setLoading(false);
  }
};

return (
  <div className={styles.container}>
    {loading ? (
      <Loader />
    ) : (
      <form onSubmit={handleSubmit} className={styles.formcontainer}>
        <div>
        <label className={styles.formlabel}>Quantity Type:</label>
        </div>
        <div className={styles.formrowpt}>
          
          <div className={styles.radiocontainer}>
            <label className={styles.formchecklabel}>
              <input
                className={styles.formcheckinput}
                type="radio"
                name="quantityType"
                value="consumed"
                checked={quantityType === 'consumed'}
                onChange={handleQuantityTypeChange}
              />
              Consumed Quantity
            </label>
            <label className={styles.formchecklabel}>
              <input
                className={styles.formcheckinput}
                type="radio"
                name="quantityType"
                value="disrupted"
                checked={quantityType === 'disrupted'}
                onChange={handleQuantityTypeChange}
              />
              Disrupted Quantity
            </label>
            <label className={styles.formchecklabel}>
              <input
                className={styles.formcheckinput}
                type="radio"
                name="quantityType"
                value="wasted"
                checked={quantityType === 'wasted'}
                onChange={handleQuantityTypeChange}
              />
              Wasted Quantity
            </label>
          </div>
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>Project Name:</label>
          <input
            type="text"
            disabled
            className={styles.forminput}
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>GP Name:</label>
          <input
            type="text"
            disabled
            className={styles.forminput}
            name="gpName"
            value={formData.gpName}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>Material Category:</label>
          <input
            type="text"
            disabled
            className={styles.forminput}
            name="materialCategory"
            value={formData.materialCategory}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>Material SubCategory:</label>
          <input
            type="text"
            disabled
            className={styles.forminput}
            name="materialSubCategory"
            value={formData.materialSubCategory}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>Material Description:</label>
          <input
            type="text"
            disabled
            className={styles.forminput}
            name="materialDescription"
            value={formData.materialDescription}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>UOM:</label>
          <input
            type="text"
            disabled
            className={styles.forminput}
            name="uom"
            value={formData.uom}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>Quantity Remaining:</label>
          <input
            className={styles.forminput}
            type="number"
            name="quantity"
            disabled
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>Units:</label>
          <input
            className={styles.forminput}
            type="number"
            name="units"
            max={formData.quantity}
            min={1}
            required
            value={formData.units}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>Vendor Name:</label>
          <SearchInputVendor
            placeholder="Search for Vendor"
            id="vendorName"
            // title=""
            items={vendors}
            value={formData.vendorName}
            ResultOnClick={(selectedVendor) => setFormData({ ...formData, vendorName: selectedVendor.name, vendorId:selectedVendor.id })}
            required
          />
        </div>

        <div className={styles.formrow}>
          <label className={styles.formlabel}>Remarks:</label>
          <input
            type="text"
            className={styles.forminput}
            name="remarks"
            required
            value={formData.remarks}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formRowButtonContainer}>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    )}
  </div>
);

};

export default ConsumedOrDisruptedInventory;
